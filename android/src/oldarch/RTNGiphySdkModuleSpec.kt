package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class RTNGiphySdkModuleSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  @Suppress("unused")
  abstract fun configure(apiKey: String, verificationMode: Boolean, videoCacheMaxBytes: Double)
}
