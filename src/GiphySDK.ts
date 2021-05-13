import { NativeModules } from 'react-native'

interface IRNGiphySDK {
  configure(apiKey: string): void
}

export type GiphySDKConfig = {
  apiKey: string
}

const RNGiphySDK: IRNGiphySDK = NativeModules.GiphyReactNativeSDK

export class GiphySDK {
  static configure(options: GiphySDKConfig) {
    RNGiphySDK.configure(options.apiKey)
  }
}
