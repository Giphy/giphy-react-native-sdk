import { execSync } from 'child_process'

import { wait } from '../utils'

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
  try {
    execSync('source ./scripts/avd.defaults.sh && ./scripts/avd.demo-mode.sh')
  } catch (error) {
    console.warn('Warning: Failed to set Android emulator demo mode.')
    console.warn('Tests will continue without demo mode settings.')
  }
}

function setSIMDemoMode() {
  try {
    execSync('source ./scripts/sim.defaults.sh && ./scripts/sim.demo-mode.sh')
  } catch (error) {
    console.warn('Warning: Failed to set iOS simulator demo mode.')
    console.warn('Tests will continue without demo mode settings.')
  }
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
