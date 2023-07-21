package com.giphyreactnativesdk

import android.view.View
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ViewManagerDelegate
import com.facebook.react.viewmanagers.RTNGiphyVideoViewManagerDelegate
import com.facebook.react.viewmanagers.RTNGiphyVideoViewManagerInterface
import com.facebook.soloader.SoLoader

abstract class RTNGiphyVideoViewManagerSpec<T : View> : SimpleViewManager<T>(),
  RTNGiphyVideoViewManagerInterface<T> {
  private val mDelegate: ViewManagerDelegate<T>

  init {
    mDelegate = RTNGiphyVideoViewManagerDelegate(this)
  }

  override fun getDelegate(): ViewManagerDelegate<T>? {
    return mDelegate
  }

  companion object {
    init {
      if (BuildConfig.CODEGEN_MODULE_REGISTRATION != null) {
        SoLoader.loadLibrary(BuildConfig.CODEGEN_MODULE_REGISTRATION)
      }
    }
  }
}
