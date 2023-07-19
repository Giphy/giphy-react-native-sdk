import NativeGiphySDK from './specs/NativeGiphySDK'

export interface GiphySDKConfig {
  apiKey: string
  verificationMode?: boolean
  videoCacheMaxBytes?: number
}

const DEFAULT_VIDEO_CACHE_MAX_BYTES = 100 * 1024 * 1024

export class GiphySDK {
  static configure(options: GiphySDKConfig) {
    const { apiKey, videoCacheMaxBytes = DEFAULT_VIDEO_CACHE_MAX_BYTES, verificationMode = false } = options
    NativeGiphySDK.configure(apiKey, verificationMode, videoCacheMaxBytes)
  }
}
