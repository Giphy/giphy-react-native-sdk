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
import com.giphy.sdk.ui.views.GPHGridCallback
import com.giphy.sdk.ui.views.GPHSearchGridCallback
import com.giphy.sdk.ui.views.GifView


class GiphyGridViewManager() : SimpleViewManager<GiphyRNGridView>() {
  val REACT_CLASS = "GiphyReactNativeGridView"
  private var _renditionType = RenditionType.downsized
  private var _clipsPreviewRenditionType = RenditionType.downsized

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

  fun emitEvent(context: ReactContext, view: GiphyRNGridView, name: String, params: WritableMap) {
    context.getJSModule(RCTEventEmitter::class.java).receiveEvent(
      view.id,
      name,
      params
    )
  }

  private fun getGridCallback(
    view: GiphyRNGridView,
    reactContext: ThemedReactContext
  ): GPHGridCallback? {
    return object : GPHGridCallback {
      override fun contentDidUpdate(resultCount: Int) {
        val params = Arguments.createMap()
        params.putInt("resultCount", resultCount)
        emitEvent(reactContext, view, "onContentUpdate", params)
      }

      override fun didSelectMedia(media: Media) {
        val params = Arguments.createMap()
        val isVideo = media.type == MediaType.video
        val mediaRenditionType = if (isVideo) _clipsPreviewRenditionType else _renditionType
        val mediaMap = mediaToRNMap(media, mediaRenditionType)
        params.putMap("media", mediaMap)

        emitEvent(reactContext, view, "onMediaSelect", params)
      }
    }
  }

  fun getSearchGridCallback(
    view: GiphyRNGridView,
    reactContext: ThemedReactContext
  ): GPHSearchGridCallback? {
    return object : GPHSearchGridCallback {
      override fun didTapUsername(username: String) {
        // TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
      }

      override fun didLongPressCell(cell: GifView) {
        // TODO("not implemented") //To change body of created functions use File | Settings | File Templates.
      }

      override fun didScroll(dx: Int, dy: Int) {
        val params = Arguments.createMap()
        params.putDouble("offset", dy.toDouble())
        emitEvent(reactContext, view, "onScroll", params)
      }
    }
  }

  @ReactProp(name = "content")
  fun setContent(view: GiphyRNGridView, value: ReadableMap?) {
    view.setContent(value)
  }

  @ReactProp(name = "cellPadding")
  fun setCellPadding(view: GiphyRNGridView, value: Int?) {
    view.setCellPadding(value)
  }

  @ReactProp(name = "fixedSizeCells")
  fun setFixedSizeCells(view: GiphyRNGridView, value: Boolean?) {
    view.setFixedSizeCells(value)
  }

  @ReactProp(name = "orientation")
  fun setOrientation(view: GiphyRNGridView, value: String?) {
    view.setOrientation(value)
  }

  @ReactProp(name = "spanCount")
  fun setSpanCount(view: GiphyRNGridView, value: Int?) {
    view.setSpanCount(value)
  }

  @ReactProp(name = "renditionType")
  fun setRenditionType(view: GiphyRNGridView, value: String?) {
    view.setRenditionType(value)
  }

  @ReactProp(name = "clipsPreviewRenditionType")
  fun setClipsPreviewRenditionType(view: GiphyRNGridView, value: String?) {
    view.setClipsPreviewRenditionType(value)
  }

  @ReactProp(name = "showCheckeredBackground")
  fun setShowCheckeredBackground(view: GiphyRNGridView, value: Boolean?) {
    view.setShowCheckeredBackground(value)
  }

  override fun createViewInstance(reactContext: ThemedReactContext): GiphyRNGridView {
    val view = GiphyRNGridView(reactContext)

    view.gridView.callback = getGridCallback(view, reactContext)
    view.gridView.searchCallback = getSearchGridCallback(view, reactContext)

    return view
  }
}
