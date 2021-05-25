package com.giphyreactnativesdk

import android.util.Log
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.ReadableNativeMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.views.GPHMediaView
import timber.log.Timber



class GiphyMediaViewManager(): SimpleViewManager<GPHMediaView>() {
  val REACT_CLASS = "GiphyReactNativeMediaView"
  val DEFAULT_RENDITION_TYPE = RenditionType.fixedWidth

  private var media: Media? = null
  private var renditionType = DEFAULT_RENDITION_TYPE
  private var aspectRatio: Float? = null

  companion object {
    val TAG = GiphyMediaViewManager::class.java.simpleName
  }

  private fun setMedia(view: GPHMediaView) {
    if (media != null) {
      view.setMedia(media, renditionType)
    }
    if (aspectRatio != null) {
      view.aspectRatio = aspectRatio as Float
    }

  }

  @ReactProp(name="media")
  fun setMedia(gifView: GPHMediaView, rnMedia: ReadableMap){
    val mediaId = rnMedia.getString("id")
    aspectRatio = rnMedia.getDouble("aspectRatio").toFloat()

    if (mediaId != null) {
      GPHCore.gifById(mediaId) { result, e ->
        media = result?.data
        if (media != null) {
          setMedia(gifView)
        }
        e?.let {
          Timber.d("Error while fetching GIF: %s", e.localizedMessage)
        }
      }
    }
  }

  @ReactProp(name="renditionType")
  fun setRenditionType(gifView: GPHMediaView, renditionName: String) {
    renditionType = RenditionType.values().firstOrNull {
      it.name == snakeToCamel(renditionName)
    } ?: DEFAULT_RENDITION_TYPE
    setMedia(gifView)
  }

  override fun getName(): String {
    return "GiphyReactNativeMediaView"
  }

  override fun createViewInstance(reactContext: ThemedReactContext): GPHMediaView {
    return GPHMediaView(reactContext)
  }
}
