package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod

class RTNGiphyVideoManager internal constructor(context: ReactApplicationContext) :
  RTNGiphyVideoManagerSpec(context) {
  override fun getName() = NAME

  @ReactMethod
  override fun muteAll() {
    SharedVideoPlayer.mute()
  }

  @ReactMethod
  override fun pauseAll() {
    SharedVideoPlayer.pause()
  }

  @ReactMethod
  override fun resume() {
    SharedVideoPlayer.resume()
  }

  companion object {
    const val NAME = "RTNGiphyVideoManager"
  }
}
