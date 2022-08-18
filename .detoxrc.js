const { execSync } = require('child_process')
const { env } = require('@react-native-community/eslint-config')

execSync('source ./scripts/avd.defaults.sh')
execSync('source ./scripts/sim.defaults.sh')

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
