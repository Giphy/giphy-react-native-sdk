#!/usr/bin/env node
const assert = require('assert')
const fs = require('fs')
const https = require('https')
const path = require('path')
const { execSync } = require('child_process')

const plist = require('plist')
const spdxCorrect = require('spdx-correct')
const spdxSatisfies = require('spdx-satisfies')

const UNKNOWN_LICENSE = 'UNKNOWN'
const LICENSE_CATEGORIES_LOCATION = process.env.LICENSE_CATEGORIES_LOCATION
const LICENSE_PROJECT_LOCATION = process.env.LICENSE_PROJECT_LOCATION

const DEPENDENCIES = {
  rootJS: path.posix.resolve(__dirname, '..'),
  exampleAppJS: path.posix.resolve(__dirname, '../example'),
  exampleAppAndroid: path.posix.resolve(__dirname, '../example/android/build/licenses/index.json'),
  exampleAppIOS: path.posix.resolve(__dirname, '../example/ios/Resources/Settings.bundle/Acknowledgements.plist'),
}

async function fetchJSON(url) {
  return new Promise((resolve, reject) => {
    return https
      .get(url, (resp) => {
        if (resp.statusCode >= 400) {
          const lastSegment = url.substring(url.lastIndexOf('/') + 1)
          return reject(`[${resp.statusCode}] ${resp.statusMessage} ${lastSegment}`)
        }

        let data = ''
        resp.on('data', (chunk) => {
          data += chunk
        })
        resp.on('end', () => {
          resolve(JSON.parse(data))
        })
      })
      .on('error', reject)
  })
}

async function fetchCategoryLicenses(categories) {
  let result = []
  for (const category of categories) {
    const ctgLicenses = await fetchJSON(`${LICENSE_CATEGORIES_LOCATION}/${category}.json`)
    const flatCtgLicenses = Object.entries(ctgLicenses).flatMap(([licenseName, license]) => [
      licenseName,
      ...license.aliases,
    ])
    result = [...result, ...flatCtgLicenses]
  }
  return result
}

function toSemicolonList(list) {
  if (list == null) {
    return ''
  }
  return list.join(';')
}

function normalizeModuleName(name) {
  return (name ?? '').trim().toLowerCase()
}

/*
 * Read and normalize licenses from the output of the dependency-license-report plugin
 */
async function getExampleAppAndroidDeps(filePath) {
  const bytes = await fs.promises.readFile(filePath)
  const data = JSON.parse(bytes.toString())
  return data.dependencies.map(({ moduleName, moduleLicense }) => ({
    moduleName: normalizeModuleName(moduleName),
    moduleLicense: moduleLicense || UNKNOWN_LICENSE,
  }))
}

/*
 * Read and normalize licenses from the acknowledgments plist
 */
async function getExampleAppIOSDeps(filePath) {
  const columnTitle = 'Acknowledgements'
  const bytes = await fs.promises.readFile(filePath)
  const data = plist.parse(bytes.toString())
  return data.PreferenceSpecifiers.filter(({ Title }) => Title && Title !== columnTitle).map(
    ({ Title, License = '' }) => ({
      moduleName: normalizeModuleName(Title),
      moduleLicense: License || UNKNOWN_LICENSE,
    })
  )
}

function checkModules(modules, options = {}) {
  const { allowedLicenses = [], ignoredModules: rawIgnoredModules = [] } = options
  const ignoredModules = rawIgnoredModules.map(normalizeModuleName)
  const isModuleIgnored = (m) => ignoredModules.includes(normalizeModuleName(m))
  const spdxIsValid = (spdx) => spdxCorrect(spdx) === spdx
  const spdxIsInvalid = (spdx) => !spdxIsValid(spdx)
  const validSPDXLicenses = allowedLicenses.filter(spdxIsValid)
  const invalidSPDXLicenses = allowedLicenses.filter(spdxIsInvalid).map((l) => l.toLowerCase())
  const spdxExcluder = '( ' + validSPDXLicenses.join(' OR ') + ' )'
  const allowedLicensesRepr = JSON.stringify(allowedLicenses)

  const isLicenseAllowed = (l) => {
    if (l.indexOf(UNKNOWN_LICENSE) >= 0) {
      return false
    }
    return (
      invalidSPDXLicenses.indexOf(l.toLowerCase()) >= 0 ||
      (spdxCorrect(l) && spdxSatisfies(spdxCorrect(l), spdxExcluder))
    )
  }

  modules.forEach((m) => {
    assert(
      isModuleIgnored(m.moduleName) || isLicenseAllowed(m.moduleLicense),
      `Module "${m.moduleName}" with "${m.moduleLicense}" license is not allowed. Allowed licenses: ${allowedLicensesRepr}`
    )
  })
}

async function main() {
  const projCfg = await fetchJSON(LICENSE_PROJECT_LOCATION)
  const allowedLicenses = await fetchCategoryLicenses(projCfg.license_categories)
  const allowedLicensesStr = toSemicolonList(allowedLicenses).replace(/,/g, '')
  const giphySDKPkg = require(path.posix.resolve(DEPENDENCIES.rootJS, 'package.json'))
  const exampleAppPkg = require(path.posix.resolve(DEPENDENCIES.exampleAppJS, 'package.json'))
  const giphySDKName = `${giphySDKPkg.name}@${giphySDKPkg.version}`
  const exampleAppName = `${exampleAppPkg.name}@${exampleAppPkg.version}`
  const excludedPackages = [giphySDKName, exampleAppName, ...projCfg.package_ignore]

  try {
    console.log(`\x1b[33mChecking JS dependencies in ${DEPENDENCIES.rootJS}\x1b[0m`)
    execSync(`npx license-checker \
            --start '${DEPENDENCIES.rootJS}' \
            --excludePackages='${toSemicolonList(excludedPackages)}' \
            --onlyAllow="${allowedLicensesStr}"`)

    console.log(`\x1b[33mChecking JS dependencies in ${DEPENDENCIES.exampleAppJS}\x1b[0m`)
    execSync(`npx license-checker \
            --start '${DEPENDENCIES.exampleAppJS}' \
            --excludePackages='${toSemicolonList(excludedPackages)}' \
            --onlyAllow="${allowedLicensesStr}"`)
  } catch (e) {
    throw new Error(e.message)
  }

  console.log(`\x1b[33mChecking Android dependencies in ${DEPENDENCIES.exampleAppAndroid}\x1b[0m`)
  const exampleAppAndroidDeps = await getExampleAppAndroidDeps(DEPENDENCIES.exampleAppAndroid)
  checkModules(exampleAppAndroidDeps, {
    allowedLicenses,
    ignoredModules: excludedPackages,
  })

  console.log(`\x1b[33mChecking iOS dependencies in ${DEPENDENCIES.exampleAppIOS}\x1b[0m`)
  const exampleAppIOSDeps = await getExampleAppIOSDeps(DEPENDENCIES.exampleAppIOS)
  checkModules(exampleAppIOSDeps, {
    allowedLicenses,
    ignoredModules: excludedPackages,
  })

  console.log('\x1b[32mAll licenses are valid.\x1b[0m')
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
