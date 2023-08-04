#!/usr/bin/env node

const PACKAGE_TAG_REGEX = /^.*-([a-z]*)(\.)?([0-9]*)?$/i

function getPkgTag() {
  const { version } = require('../package.json')
  return version.match(PACKAGE_TAG_REGEX) ? version.replace(PACKAGE_TAG_REGEX, '$1') : 'latest'
}

if (require.main === module) {
  console.log(getPkgTag())
}
