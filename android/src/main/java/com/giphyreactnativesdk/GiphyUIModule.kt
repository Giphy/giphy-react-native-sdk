package com.giphyreactnativesdk

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class GiphyUIModule(reactContext: ReactApplicationContext): ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "GiphyUIReactNative"
  }

  @ReactMethod
  fun configure(apiKey: String) {
    Log.d("TEST", "configuring giphy")
  }

}
