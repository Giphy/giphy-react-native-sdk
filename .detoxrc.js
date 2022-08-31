const { execSync } = require('child_process')
const STD_OUT_MAX_BUFFER = 1024 * 1024 * 4

execSync('source ./scripts/avd.defaults.sh', { maxBuffer: STD_OUT_MAX_BUFFER })
execSync('source ./scripts/sim.defaults.sh', { maxBuffer: STD_OUT_MAX_BUFFER })

module.exports = {
  testRunner: 'jest',
  runnerConfig: 'e2e/config.json',
  skipLegacyWorkersInjection: true,
  apps: {
    ios: {
      name: 'ExampleApp',
      type: 'ios.app',
      binaryPath:
        'example/ios/build/Build/Products/Release-iphonesimulator/GiphyReactNativeSdkExample.app',
      build: 'yarn --cwd example build:ios',
    },
    android: {
      type: 'android.apk',
      binaryPath:
        'example/android/app/build/outputs/apk/release/app-release.apk',
      build: 'yarn --cwd example build:android',
    },
  },
  devices: {
    simulator: {
      type: 'ios.simulator',
      device: {
        type: process.env.SIM_DEVICE_NAME,
      },
    },
    emulator: {
      type: 'android.emulator',
      device: {
        avdName: process.env.AVD_NAME,
      },
    },
  },
  configurations: {
    ios: {
      device: 'simulator',
      app: 'ios',
    },
    android: {
      device: 'emulator',
      app: 'android',
    },
  },
}
