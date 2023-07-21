package com.giphyreactnativesdk

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager

abstract class RTNGiphyVideoViewManagerSpec<T : View> : SimpleViewManager<T>() {
  @Suppress("unused")
  abstract fun setAutoPlay(view: T, value: Boolean)

  @Suppress("unused")
  abstract fun setMediaId(view: T, value: String?)

  @Suppress("unused")
  abstract fun setMuted(view: T, value: Boolean)
}
