package com.giphyreactnativesdk

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp


class GiphyMediaViewManager() : SimpleViewManager<GiphyRNMediaView>() {
  val REACT_CLASS = "GiphyReactNativeMediaView"

  companion object {
    val TAG = GiphyMediaViewManager::class.java.simpleName
  }

  @ReactProp(name = "media")
  fun setMedia(gifView: GiphyRNMediaView, rnMedia: ReadableMap?) {
    gifView.setMedia(rnMedia)
  }

  @ReactProp(name = "renditionType")
  fun setRenditionType(gifView: GiphyRNMediaView, renditionName: String?) {
    gifView.setRenditionType(renditionName)
  }

  override fun getName(): String {
    return "GiphyReactNativeMediaView"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): GiphyRNMediaView {
    return GiphyRNMediaView(reactContext)
  }
}
