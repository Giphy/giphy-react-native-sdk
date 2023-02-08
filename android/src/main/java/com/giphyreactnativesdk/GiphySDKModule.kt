package com.giphyreactnativesdk

import com.facebook.react.bridge.*
import com.giphy.sdk.ui.Giphy
import com.giphyreactnativesdk.utils.RNSDKInfo
import com.giphyreactnativesdk.utils.getVideoPlayerFactory
import com.giphyreactnativesdk.utils.initializeVideoCache

object GiphySDKConstants {
  const val VERIFICATION_MODE_KEY = "verificationMode"
  const val VIDEO_CACHE_MAX_BYTES_KEY = "videoCacheMaxBytes"
  const val DEFAULT_VIDEO_CACHE_MAX_BYTES: Long = (100 * 1024 * 1024).toLong()
}

class GiphySDKModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "GiphyReactNativeSDK"
  }

  @Suppress("unused")
  @ReactMethod
  fun configure(settings: ReadableMap) {
    val apiKey = settings.getString("apiKey")

    var verificationMode = false
    if (settings.hasKey(GiphySDKConstants.VERIFICATION_MODE_KEY)) {
      verificationMode = settings.getBoolean(GiphySDKConstants.VERIFICATION_MODE_KEY)
    }

    var videoCacheMaxBytes: Long = GiphySDKConstants.DEFAULT_VIDEO_CACHE_MAX_BYTES
    if (settings.hasKey(GiphySDKConstants.VIDEO_CACHE_MAX_BYTES_KEY)) {
      videoCacheMaxBytes = settings.getInt(GiphySDKConstants.VIDEO_CACHE_MAX_BYTES_KEY).toLong()
    }
    initializeVideoCache(reactApplicationContext, videoCacheMaxBytes)
    Giphy.videoPlayer = getVideoPlayerFactory()

    if (apiKey != null) {
      val appInfo = RNSDKInfo(reactApplicationContext)
      Giphy.configureRNSDK(
        reactApplicationContext,
        apiKey,
        verificationMode,
        metadata = hashMapOf(appInfo.name to appInfo.version),
        frescoImageRequestHandler = GiphyRNFrescoImageRequestHandler()
      )
    }
  }
}
