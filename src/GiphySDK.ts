import { NGiphySDK, NGiphySDKConfig } from './native'

export type GiphySDKConfig = NGiphySDKConfig

export class GiphySDK {
  static configure(options: GiphySDKConfig) {
    NGiphySDK.configure(options)
  }
}
