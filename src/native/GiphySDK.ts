import { NativeModules } from 'react-native'

export type NativeGiphySDKConfig = {
  apiKey: string
}

export interface INativeGiphySDK {
  configure(options: NativeGiphySDKConfig): void
}

export const NativeGiphySDK: INativeGiphySDK = NativeModules.GiphyReactNativeSDK
