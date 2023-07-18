import NativeGiphySDK from './specs/NativeGiphySDK'

export interface GiphySDKConfig {
  apiKey: string
  verificationMode?: boolean
  videoCacheMaxBytes?: number
}

export class GiphySDK {
  static configure(options: GiphySDKConfig) {
    const { apiKey, videoCacheMaxBytes, verificationMode } = options
    NativeGiphySDK.configure(apiKey, verificationMode, videoCacheMaxBytes)
  }
}
