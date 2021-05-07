import { NativeModules } from 'react-native'

const { GiphyReactNativeSDK } = NativeModules

class GiphySDK {
  static configure(apiKey: String) {
    GiphyReactNativeSDK.configure(apiKey)
  }
}

export default GiphySDK
