package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class GiphySdkModuleSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {

  abstract fun configure(apiKey: String?, verificationMode: Boolean?, videoCacheMaxBytes: Double?)
}
