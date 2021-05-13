import { NativeModules } from 'react-native'

export type NGiphySDKConfig = {
  apiKey: string
}

export interface INGiphySDK {
  configure(options: NGiphySDKConfig): void
}

export const NGiphySDK: INGiphySDK = NativeModules.GiphyReactNativeSDK
