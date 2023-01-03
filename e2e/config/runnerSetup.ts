import { execSync } from 'child_process'

const TEST_BUTLER_LOCAL_PATH = './.temp/test-butler-app-2.2.1.apk'
const TEST_BUTLER_SOURCE =
  'https://repo1.maven.org/maven2/com/linkedin/testbutler/test-butler-app/2.2.1/test-butler-app-2.2.1.apk'

function downloadTestButler() {
  execSync(`curl --create-dirs -f -o ${TEST_BUTLER_LOCAL_PATH} ${TEST_BUTLER_SOURCE}`)
}

module.exports = async function () {
  await require('detox/runners/jest/index').globalSetup()
  switch (process.env.DETOX_CONFIGURATION) {
    case 'android': {
      downloadTestButler()
      return
    }
    case 'ios': {
      return
    }
    default:
      throw new Error('Unknown DETOX_CONFIGURATION')
  }
}
