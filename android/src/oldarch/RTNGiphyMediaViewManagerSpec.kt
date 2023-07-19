package com.giphyreactnativesdk

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager

abstract class RTNGiphyMediaViewManagerSpec<T : View> : SimpleViewManager<T>() {
  @Suppress("unused")
  abstract fun setAutoPlay(view: T?, value: Boolean)

  @Suppress("unused")
  abstract fun setMediaId(view: T?, value: String?)

  @Suppress("unused")
  abstract fun setRenditionType(view: T?, value: String?)

  @Suppress("unused")
  abstract fun setResizeMode(view: T?, value: String?)

  @Suppress("unused")
  abstract fun setShowCheckeredBackground(view: T?, value: Boolean)

  @Suppress("unused")
  abstract fun pause(view: T?)

  @Suppress("unused")
  abstract fun resume(view: T?)
}
