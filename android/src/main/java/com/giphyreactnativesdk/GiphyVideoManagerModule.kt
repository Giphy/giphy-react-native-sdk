package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class GiphyVideoManagerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "GiphyReactNativeVideoManager"
  }

  @Suppress("unused")
  @ReactMethod
  fun muteAll() {
    SharedVideoPlayer.mute()
  }

  @Suppress("unused")
  @ReactMethod
  fun pauseAll() {
    SharedVideoPlayer.pause()
  }

  @Suppress("unused")
  @ReactMethod
  fun resume() {
    SharedVideoPlayer.resume()
  }
}
