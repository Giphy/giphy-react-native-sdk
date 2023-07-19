package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.giphy.sdk.ui.Giphy
import com.giphyreactnativesdk.utils.getVideoPlayerFactory
import com.giphyreactnativesdk.utils.initializeVideoCache

class RTNGiphySDKModule internal constructor(context: ReactApplicationContext) :
  RTNGiphySdkModuleSpec(context) {
  override fun getName() = NAME

  @ReactMethod
  override fun configure(
    apiKey: String, verificationMode: Boolean, videoCacheMaxBytes: Double
  ) {
    initializeVideoCache(
      reactApplicationContext, videoCacheMaxBytes.toLong()
    )
    Giphy.videoPlayer = getVideoPlayerFactory()

    val appInfo = RTNGiphySdkInfo(reactApplicationContext)
    Giphy.configureRNSDK(
      reactApplicationContext,
      apiKey,
      verificationMode,
      metadata = hashMapOf(appInfo.name to appInfo.version),
      frescoImageRequestHandler = RTNGiphyFrescoImageRequestHandler()
    )
  }

  companion object {
    const val NAME = "RTNGiphySDKModule"
  }
}
