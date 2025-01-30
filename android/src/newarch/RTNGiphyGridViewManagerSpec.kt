package com.giphyreactnativesdk

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RTNGiphyGridViewManagerDelegate
import com.facebook.react.viewmanagers.RTNGiphyGridViewManagerInterface
import com.facebook.soloader.SoLoader

abstract class RTNGiphyGridViewManagerSpec<T : View> : SimpleViewManager<T>(),
  RTNGiphyGridViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = RTNGiphyGridViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }

}
