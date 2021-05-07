package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class GiphySDKModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "GiphyReactNativeSDK"
  }

  @ReactMethod
  fun configure(apiKey: String) {
//    TODO: Configure module here
  }
}
