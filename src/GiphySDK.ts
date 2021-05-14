import { NativeGiphySDK, NativeGiphySDKConfig } from './native/GiphySDK'

export type GiphySDKConfig = NativeGiphySDKConfig

export class GiphySDK {
  static configure(options: GiphySDKConfig) {
    NativeGiphySDK.configure(options)
  }
}
