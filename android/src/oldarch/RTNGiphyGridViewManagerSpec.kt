package com.giphyreactnativesdk

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager

abstract class RTNGiphyGridViewManagerSpec<T : View> : SimpleViewManager<T>() {
  @Suppress("unused")
  abstract fun setCellPadding(view: T?, value: Int)

  @Suppress("unused")
  abstract fun setClipsPreviewRenditionType(view: T?, value: String?)

  @Suppress("unused")
  abstract fun setContent(view: T?, value: String?)

  @Suppress("unused")
  abstract fun setDisableEmojiVariations(view: T?, value: Boolean)

  @Suppress("unused")
  abstract fun setFixedSizeCells(view: T?, value: Boolean)

  @Suppress("unused")
  abstract fun setOrientation(view: T?, value: String?)

  @Suppress("unused")
  abstract fun setRenditionType(view: T?, value: String?)

  @Suppress("unused")
  abstract fun setShowCheckeredBackground(view: T?, value: Boolean)

  @Suppress("unused")
  abstract fun setSpanCount(view: T?, value: Int)

  @Suppress("unused")
  abstract fun setTheme(view: T?, value: String?)
}
