import { execSync } from 'child_process'

const TEST_BUTLER_LOCAL_PATH = './.temp/test-butler-app-2.2.1.apk'
const TEST_BUTLER_SOURCE =
  'https://repo1.maven.org/maven2/com/linkedin/testbutler/test-butler-app/2.2.1/test-butler-app-2.2.1.apk'

function downloadTestButler() {
  execSync(`curl --create-dirs -f -o ${TEST_BUTLER_LOCAL_PATH} ${TEST_BUTLER_SOURCE}`)
}

function clearImageSnapshotsDiff() {
  execSync('rm -rf ./e2e/__image_snapshots__/__diff_output__')
}

module.exports = async function () {
  await require('detox/runners/jest/index').globalSetup()
  console.log('Clear __image_snapshots__/__diff_output__')
  clearImageSnapshotsDiff()

  switch (process.env.DETOX_CONFIGURATION) {
    case 'android': {
      console.log('Download TestButler')
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
