package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class GiphyVideoManagerModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {
  override fun getName(): String {
    return "GiphyReactNativeVideoManager"
  }

  @ReactMethod
  fun muteAll() {
    SharedVideoPlayer.mute()
  }

  @ReactMethod
  fun pauseAll() {
    SharedVideoPlayer.pause()
  }
}
