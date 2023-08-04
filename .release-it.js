const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const handlebars = require('handlebars')

const SCRIPTS_DIR = path.posix.resolve(__dirname, 'scripts')
const COMMITS_GROUP_ORDERING = [
  'Features',
  'Bug Fixes',
  'Performance Improvements',
  'Reverts',
  'Documentation',
  'Build System',
  'Continuous Integration',
]

function commitsGroupComparator(a, b) {
  const aTitle = a.title || ''
  const bTitle = b.title || ''
  const aIndex = COMMITS_GROUP_ORDERING.indexOf(aTitle)
  const bIndex = COMMITS_GROUP_ORDERING.indexOf(bTitle)

  if (aIndex === bIndex) {
    return aTitle.localeCompare(bTitle, 'en')
  } else if (aIndex === -1) {
    return 1
  } else if (bIndex === -1) {
    return -1
  }
  return aIndex - bIndex
}

function readTemplateSync(name) {
  return fs.readFileSync(path.join(__dirname, `templates/${name}.hbs`), 'utf-8')
}

function conventionalChangelogTransform(commit, context) {
  /*
   * Based on https://github.com/conventional-changelog/conventional-changelog/blob/master/packages/conventional-changelog-angular/writer-opts.js
   */
  let discard = true
  const issues = []

  commit.notes.forEach((note) => {
    note.title = 'BREAKING CHANGES'
    discard = false
  })

  if (commit.type === 'feat') {
    commit.type = 'Features'
  } else if (commit.type === 'fix') {
    commit.type = 'Bug Fixes'
  } else if (commit.type === 'perf') {
    commit.type = 'Performance Improvements'
  } else if (commit.type === 'revert' || commit.revert) {
    commit.type = 'Reverts'
  } else if (commit.type === 'docs') {
    commit.type = 'Documentation'
  } else if (commit.type === 'build') {
    commit.type = 'Build System'
  } else if (commit.type === 'ci') {
    commit.type = 'Continuous Integration'
  } else if (discard) {
    return
  } else if (commit.type === 'style') {
    commit.type = 'Styles'
  } else if (commit.type === 'refactor') {
    commit.type = 'Code Refactoring'
  } else if (commit.type === 'test') {
    commit.type = 'Tests'
  }

  if (commit.scope === '*') {
    commit.scope = ''
  }

  if (typeof commit.hash === 'string') {
    commit.shortHash = commit.hash.substring(0, 7)
  }

  if (typeof commit.subject === 'string') {
    let url = context.repository
      ? `${context.host}/${context.owner}/${context.repository}`
      : context.repoUrl
    if (url) {
      url = `${url}/issues/`
      // Issue URLs.
      commit.subject = commit.subject.replace(/#([0-9]+)/g, (_, issue) => {
        issues.push(issue)
        return `[#${issue}](${url}${issue})`
      })
    }
    if (context.host) {
      // User URLs.
      commit.subject = commit.subject.replace(
        /\B@([a-z0-9](?:-?[a-z0-9/]){0,38})/g,
        (_, username) => {
          if (username.includes('/')) {
            return `@${username}`
          }

          return `[@${username}](${context.host}/${username})`
        }
      )
    }
  }

  // remove references that already appear in the subject
  commit.references = commit.references.filter((reference) => {
    return issues.indexOf(reference.issue) === -1
  })

  return commit
}

handlebars.registerHelper('capitalize', (v) =>
  v ? v.charAt(0).toUpperCase() + v.slice(1) : ''
)

handlebars.registerHelper('androidSDKVersionByHash', (hash = 'HEAD') => {
  return execSync(`${SCRIPTS_DIR}/sdk.version-by-hash.android.sh ${hash}`)
    .toString('utf-8')
    .trim()
})

handlebars.registerHelper('iOSSDKVersionByHash', (hash = 'HEAD') => {
  return execSync(`${SCRIPTS_DIR}/sdk.version-by-hash.ios.sh ${hash}`)
    .toString('utf-8')
    .trim()
})

module.exports = {
  git: {
    commitMessage: 'chore: release ${version}',
    tag: true,
    tagName: 'v${version}',
    requireBranch: ['main', 'next', 'release/*'],
  },
  npm: {
    publish: false,
  },
  github: {
    release: true,
    releaseName: 'v${version}',
    draft: true,
    web: true,
  },
  plugins: {
    '@release-it/conventional-changelog': {
      infile: 'CHANGELOG.md',
      writerOpts: {
        commitPartial: readTemplateSync('changelog-commit'),
        footerPartial: readTemplateSync('changelog-footer'),
        headerPartial: readTemplateSync('changelog-header'),
        mainTemplate: readTemplateSync('changelog'),
        commitGroupsSort: commitsGroupComparator,
        commitsSort: 'header',
        transform: conventionalChangelogTransform,
        partials: {
          nativeSDK: readTemplateSync('changelog-native-sdk'),
        },
      },
      preset: {
        name: 'angular',
      },
    },
  },
  hooks: {
    'after:bump': 'yarn bootstrap',
  },
}
