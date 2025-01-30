package com.giphyreactnativesdk

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RTNGiphyMediaViewManagerDelegate
import com.facebook.react.viewmanagers.RTNGiphyMediaViewManagerInterface
import com.facebook.soloader.SoLoader

abstract class RTNGiphyMediaViewManagerSpec<T : View> : SimpleViewManager<T>(),
  RTNGiphyMediaViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = RTNGiphyMediaViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }

}
