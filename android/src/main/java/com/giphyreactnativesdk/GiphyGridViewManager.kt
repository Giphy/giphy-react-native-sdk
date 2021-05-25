package com.giphyreactnativesdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.MediaType
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.GPHRequestType
import com.giphy.sdk.ui.pagination.GPHContent
import com.giphy.sdk.ui.utils.aspectRatio
import com.giphy.sdk.ui.views.GPHGridCallback
import com.giphy.sdk.ui.views.GPHSearchGridCallback
import com.giphy.sdk.ui.views.GifView
import com.giphy.sdk.ui.views.GiphyGridView


class GiphyGridViewManager(): SimpleViewManager<GiphyGridView>() {
  val REACT_CLASS = "GiphyReactNativeGridView"

  override fun getName(): String {
    return REACT_CLASS
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
    return MapBuilder.builder<String, Any>()
      .put(
        "onContentUpdate",
        MapBuilder.of("registrationName", "onContentUpdate")
      )
      .put(
        "onMediaSelect",
        MapBuilder.of("registrationName", "onMediaSelect")
      )
      .put(
        "onScroll",
        MapBuilder.of("registrationName", "onScroll")
      )
      .build()
  }

  fun emitEvent(context: ReactContext, view: GiphyGridView, name: String, params: WritableMap) {
    context.getJSModule(RCTEventEmitter::class.java).receiveEvent(
      view.id,
      name,
      params
    )
  }

  private fun getGridCallback(view: GiphyGridView, reactContext: ThemedReactContext): GPHGridCallback? {
    return object: GPHGridCallback {
      override fun contentDidUpdate(resultCount: Int) {
        val params = Arguments.createMap()
        params.putInt("resultCount", resultCount)
        emitEvent(reactContext, view, "onContentUpdate", params)
      }

      override fun didSelectMedia(media: Media) {
        val mediaMap = Arguments.createMap()
        mediaMap.putString("id", media.id)
        mediaMap.putString("url", getGifURL(media, RenditionType.downsized))
        mediaMap.putDouble("aspectRatio", media.aspectRatio.toDouble())

        val params = Arguments.createMap()
        params.putMap("media", mediaMap)

        emitEvent(reactContext, view, "onMediaSelect", params)
      }
    }
  }

  fun getSearchGridCallback(view: GiphyGridView, reactContext: ThemedReactContext): GPHSearchGridCallback? {
    return object: GPHSearchGridCallback {
      override fun didTapUsername(username: String) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
      }

      override fun didLongPressCell(cell: GifView) {
        TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
      }

      override fun didScroll(dx: Int, dy: Int) {
        val params = Arguments.createMap()
        params.putDouble("offset", dy.toDouble())
        emitEvent(reactContext, view, "onScroll", params)
      }
    }
  }

  @ReactProp(name="content")
  fun setContent(view: GiphyGridView, value: ReadableMap) {
    val content = GPHContent()
    val query = value.getString("searchQuery")
    val requestType = value.getString("requestType")
    val mediaType = value.getString("mediaType")

    if (query != null) {
      content.searchQuery = query
    }

    if (requestType != null) {
      content.requestType = GPHRequestType.values().firstOrNull {it.name == requestType}
        ?: GPHRequestType.search
    }

    if (mediaType != null){
      content.mediaType = MediaType.values().firstOrNull {it.name == mediaType} ?: MediaType.gif
    }

    view.content = content
  }

  @ReactProp(name="cellPadding")
  fun setCellPadding(view: GiphyGridView, value: Int?) {
    if (value != null) {
      view.cellPadding
    }
  }

  @ReactProp(name="fixedSizeCells")
  fun setFixedSizeCells(view: GiphyGridView, value: Boolean){
    view.fixedSizeCells = value
  }

  @ReactProp(name="orientation")
  fun setOrientation(view: GiphyGridView, value: String){
    view.direction = when(value) {
      "horizontal" -> GiphyGridView.HORIZONTAL
      "vertical" -> GiphyGridView.VERTICAL
      else -> GiphyGridView.VERTICAL
    }
  }

  @ReactProp(name="spanCount")
  fun setSpanCount(view: GiphyGridView, value: Int) {
    view.spanCount = value
  }


  override fun createViewInstance(reactContext: ThemedReactContext): GiphyGridView {
    val view = GiphyGridView(reactContext)

    view.callback = getGridCallback(view, reactContext)
    view.searchCallback = getSearchGridCallback(view, reactContext)

    return view
  }
}
