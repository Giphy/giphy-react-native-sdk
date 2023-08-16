package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule

abstract class RTNGiphyVideoManagerSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  @Suppress("unused")
  abstract fun muteAll()

  @Suppress("unused")
  abstract fun pauseAll()

  @Suppress("unused")
  abstract fun resume()
}
