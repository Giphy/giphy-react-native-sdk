package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReadableMap

abstract class RTNGiphyDialogModuleSpec internal constructor(context: ReactApplicationContext) :
  ReactContextBaseJavaModule(context) {
  @Suppress("unused")
  abstract fun configure(options: ReadableMap?)

  @Suppress("unused")
  abstract fun show()

  @Suppress("unused")
  abstract fun hide()

  @Suppress("unused")
  abstract fun addListener(eventName: String?)

  @Suppress("unused")
  abstract fun removeListeners(count: Double)
}
