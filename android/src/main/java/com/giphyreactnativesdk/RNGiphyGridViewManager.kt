package com.giphyreactnativesdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.ReactMethod
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
import com.giphyreactnativesdk.dto.RNGiphyMedia


class RNGiphyGridViewManager : SimpleViewManager<RNGiphyGridView>() {
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

  fun emitEvent(context: ReactContext, view: RNGiphyGridView, name: String, params: WritableMap) {
    context.getJSModule(RCTEventEmitter::class.java).receiveEvent(
      view.id,
      name,
      params
    )
  }

  private fun getGridCallback(
    view: RNGiphyGridView,
    reactContext: ThemedReactContext
  ): GPHGridCallback {
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
        val mediaMap = RNGiphyMedia.toRNValue(media, mediaRenditionType)
        params.putMap("media", mediaMap)

        emitEvent(reactContext, view, "onMediaSelect", params)
      }
    }
  }

  fun getSearchGridCallback(
    view: RNGiphyGridView,
    reactContext: ThemedReactContext
  ): GPHSearchGridCallback {
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

  @Suppress("unused")
  @ReactProp(name = "content")
  fun setContent(view: RNGiphyGridView, value: ReadableMap?) {
    view.setContent(value)
  }

  @Suppress("unused")
  @ReactProp(name = "cellPadding")
  fun setCellPadding(view: RNGiphyGridView, value: Int?) {
    view.setCellPadding(value)
  }

  @Suppress("unused")
  @ReactProp(name = "fixedSizeCells")
  fun setFixedSizeCells(view: RNGiphyGridView, value: Boolean?) {
    view.setFixedSizeCells(value)
  }

  @Suppress("unused")
  @ReactProp(name = "orientation")
  fun setOrientation(view: RNGiphyGridView, value: String?) {
    view.setOrientation(value)
  }

  @Suppress("unused")
  @ReactProp(name = "spanCount")
  fun setSpanCount(view: RNGiphyGridView, value: Int?) {
    view.setSpanCount(value)
  }

  @Suppress("unused")
  @ReactProp(name = "renditionType")
  fun setRenditionType(view: RNGiphyGridView, value: String?) {
    view.setRenditionType(value)
  }

  @Suppress("unused")
  @ReactProp(name = "clipsPreviewRenditionType")
  fun setClipsPreviewRenditionType(view: RNGiphyGridView, value: String?) {
    view.setClipsPreviewRenditionType(value)
  }

  @Suppress("unused")
  @ReactProp(name = "showCheckeredBackground")
  fun setShowCheckeredBackground(view: RNGiphyGridView, value: Boolean?) {
    view.setShowCheckeredBackground(value)
  }

  @Suppress("unused")
  @ReactProp(name = "theme")
  fun setTheme(view: RNGiphyGridView, value: ReadableMap?) {
    view.setTheme(value)
  }

  @Suppress("unused")
  @ReactMethod
  fun addListener(eventName: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @Suppress("unused")
  @ReactMethod
  fun removeListeners(count: Int?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  override fun createViewInstance(reactContext: ThemedReactContext): RNGiphyGridView {
    val view = RNGiphyGridView(reactContext)

    view.gridView.callback = getGridCallback(view, reactContext)
    view.gridView.searchCallback = getSearchGridCallback(view, reactContext)

    return view
  }
}
