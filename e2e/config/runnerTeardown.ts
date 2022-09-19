import { execSync } from 'child_process'

module.exports = async function () {
  try {
    if (process.env.DETOX_CONFIGURATION === 'android') {
      // Fix an issue when, after tests, the example app doesn't work from Android Studio
      execSync('"${ANDROID_HOME}/platform-tools"/adb reverse tcp:8081 tcp:8081')
    }
  } catch (e: any) {
    console.warn(e?.message ?? e)
  }
}
