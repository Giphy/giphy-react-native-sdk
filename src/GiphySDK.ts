import { NativeGiphySDK, NativeGiphySDKConfig } from './native'

export type GiphySDKConfig = NativeGiphySDKConfig

export class GiphySDK {
  static configure(options: GiphySDKConfig) {
    NativeGiphySDK.configure(options)
  }
}
