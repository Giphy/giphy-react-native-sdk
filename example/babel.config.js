const path = require('path')
const pak = require('../package.json')

module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        alias: {
          [pak.name]: path.join(__dirname, '..', pak.source),
        },
      },
    ],
    [
      'module:react-native-dotenv',
      {
        moduleName: 'react-native-dotenv',
        safe: true,
        whitelist: ['ANDROID_GIPHY_API_KEY', 'IOS_GIPHY_API_KEY'],
      },
    ],
  ],
}
