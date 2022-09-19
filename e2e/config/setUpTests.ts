import { wait } from '../utils'
import { execSync } from 'child_process'

function patchDeviceScreenshot() {
  const takeScreenshot = device.takeScreenshot
  device.takeScreenshot = async (name: string) => {
    /*
     * Fix visual drifting when network requests are triggered
     * a bit later after actions that broke the Detox synchronization
     */
    await wait(1500)
    return takeScreenshot(name)
  }
}

function setAVDDemoMode() {
  execSync('source ./scripts/avd.defaults.sh && ./scripts/avd.demo-mode.sh')
}

function setSIMDemoMode() {
  execSync('source ./scripts/sim.defaults.sh && ./scripts/sim.demo-mode.sh')
}

function showSimulator() {
  execSync('open -a simulator')
}

beforeAll(() => {
  patchDeviceScreenshot()
  switch (device.getPlatform()) {
    case 'android': {
      setAVDDemoMode()
      return
    }
    case 'ios': {
      showSimulator()
      setSIMDemoMode()
      return
    }
    default:
      throw new Error('Unknown Detox Platform')
  }
})
