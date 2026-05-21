#!/usr/bin/env node

const fs = require('fs')

const getPkgTag = require('./pkg.get-tag')
const { version } = require('../package.json')

const outputPath = process.env.GITHUB_OUTPUT
const refName = process.env.GITHUB_REF_NAME
const expectedTag = `v${version}`

if (!outputPath) {
  throw new Error('GITHUB_OUTPUT is required')
}

if (refName !== expectedTag) {
  throw new Error(`Release tag ${refName || '<unset>'} does not match package version ${expectedTag}`)
}

const npmTag = getPkgTag()
if (!/^[a-z][a-z0-9-]*$/i.test(npmTag)) {
  throw new Error(`Invalid npm tag ${npmTag}`)
}

fs.appendFileSync(outputPath, [`package-version=${version}`, `tag=${expectedTag}`, `npm-tag=${npmTag}`, ''].join('\n'))
