package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.giphy.sdk.ui.Giphy
import com.giphyreactnativesdk.utils.getVideoPlayerFactory
import com.giphyreactnativesdk.utils.initializeVideoCache


class GiphySDKModule internal constructor(context: ReactApplicationContext) :
  GiphySdkModuleSpec(context) {


  override fun getName() = NAME

  @ReactMethod
  override fun configure(
    apiKey: String?, verificationMode: Boolean?, videoCacheMaxBytes: Double?
  ) {
    initializeVideoCache(
      reactApplicationContext, videoCacheMaxBytes?.toLong() ?: DEFAULT_VIDEO_CACHE_MAX_BYTES
    )

    Giphy.videoPlayer = getVideoPlayerFactory()

    if (apiKey != null) {
      val appInfo = RNSDKInfo(reactApplicationContext)
      Giphy.configureRNSDK(
        reactApplicationContext,
        apiKey,
        verificationMode ?: false,
        metadata = hashMapOf(appInfo.name to appInfo.version),
        frescoImageRequestHandler = RNGiphyFrescoImageRequestHandler()
      )
    }
  }

  companion object {
    const val NAME = "GiphySDKModule"
    const val DEFAULT_VIDEO_CACHE_MAX_BYTES: Long = (100 * 1024 * 1024).toLong()
  }
}
