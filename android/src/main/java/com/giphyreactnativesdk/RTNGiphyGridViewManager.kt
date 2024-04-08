package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactMethod
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.annotations.ReactProp
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.MediaType
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.views.GPHGridCallback
import com.giphy.sdk.ui.views.GPHSearchGridCallback
import com.giphy.sdk.ui.views.GifView
import com.giphyreactnativesdk.events.OnGridContentUpdateEvent
import com.giphyreactnativesdk.events.OnGridMediaSelectEvent
import com.giphyreactnativesdk.events.OnGridScrollEvent
import com.giphyreactnativesdk.utils.JsonArguments

@ReactModule(name = RTNGiphyGridViewManager.NAME)
class RTNGiphyGridViewManager :
  RTNGiphyGridViewManagerSpec<RTNGiphyGridView>() {
  private var _renditionType = RenditionType.downsized
  private var _clipsPreviewRenditionType = RenditionType.downsized

  override fun getName() = NAME

  override fun createViewInstance(context: ThemedReactContext): RTNGiphyGridView {
    val view = RTNGiphyGridView(context)
    view.gridView.callback = getGridCallback(view, context)
    view.gridView.searchCallback = getSearchGridCallback(view, context)
    return view
  }

  override fun onDropViewInstance(view: RTNGiphyGridView) {
    view.onDropViewInstance()
    super.onDropViewInstance(view)
  }

  @ReactProp(name = "theme")
  override fun setTheme(view: RTNGiphyGridView?, value: String?) {
    if (value.isNullOrEmpty()) {
      view?.setTheme(null)
    } else {
      view?.setTheme(JsonArguments.fromJSONObjectString(value))
    }
  }

  @ReactProp(name = "spanCount")
  override fun setSpanCount(view: RTNGiphyGridView?, value: Int) {
    view?.setSpanCount(value)
  }

  @ReactProp(name = "showCheckeredBackground")
  override fun setShowCheckeredBackground(view: RTNGiphyGridView?, value: Boolean) {
    view?.setShowCheckeredBackground(value)
  }

  @ReactProp(name = "renditionType")
  override fun setRenditionType(view: RTNGiphyGridView?, value: String?) {
    view?.setRenditionType(value)
  }

  @ReactProp(name = "orientation")
  override fun setOrientation(view: RTNGiphyGridView?, value: String?) {
    view?.setOrientation(value)
  }

  @ReactProp(name = "fixedSizeCells")
  override fun setFixedSizeCells(view: RTNGiphyGridView?, value: Boolean) {
    view?.setFixedSizeCells(value)
  }

  @ReactProp(name = "content")
  override fun setContent(view: RTNGiphyGridView?, value: String?) {
    if (value.isNullOrEmpty()) {
      view?.setContent(null)
    } else {
      view?.setContent(JsonArguments.fromJSONObjectString(value))
    }
  }

  @ReactProp(name = "clipsPreviewRenditionType")
  override fun setClipsPreviewRenditionType(view: RTNGiphyGridView?, value: String?) {
    view?.setClipsPreviewRenditionType(value)
  }

  @ReactProp(name = "cellPadding")
  override fun setCellPadding(view: RTNGiphyGridView?, value: Int) {
    view?.setCellPadding(value)
  }

  @ReactProp(name = "disableEmojiVariations")
  override fun setDisableEmojiVariations(view: RTNGiphyGridView?, value: Boolean) {
    view?.setDisableEmojiVariations(value)
  }
  
  private fun getGridCallback(
    view: RTNGiphyGridView,
    context: ThemedReactContext
  ): GPHGridCallback {
    return object : GPHGridCallback {
      override fun contentDidUpdate(resultCount: Int) {
        val surfaceId = UIManagerHelper.getSurfaceId(view)
        val event = OnGridContentUpdateEvent(surfaceId, view.id, resultCount)
        UIManagerHelper.getEventDispatcherForReactTag(context, view.id)?.dispatchEvent(event)
      }

      override fun didSelectMedia(media: Media) {
        val surfaceId = UIManagerHelper.getSurfaceId(view)
        val isVideo = media.type == MediaType.video
        val mediaRenditionType = if (isVideo) _clipsPreviewRenditionType else _renditionType
        val event = OnGridMediaSelectEvent(surfaceId, view.id, media, mediaRenditionType)
        UIManagerHelper.getEventDispatcherForReactTag(context, view.id)?.dispatchEvent(event)
      }
    }
  }

  private fun getSearchGridCallback(
    view: RTNGiphyGridView,
    context: ThemedReactContext
  ): GPHSearchGridCallback {
    return object : GPHSearchGridCallback {
      override fun didTapUsername(username: String) {
        // pass
      }

      override fun didLongPressCell(cell: GifView) {
        // pass
      }

      override fun didScroll(dx: Int, dy: Int) {
        val surfaceId = UIManagerHelper.getSurfaceId(view)
        val event = OnGridScrollEvent(surfaceId, view.id, dy.toDouble())
        UIManagerHelper.getEventDispatcherForReactTag(context, view.id)?.dispatchEvent(event)
      }
    }
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    val export = super.getExportedCustomDirectEventTypeConstants() ?: MapBuilder.newHashMap()

    export[OnGridContentUpdateEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onContentUpdate")
    export[OnGridMediaSelectEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onMediaSelect")
    export[OnGridScrollEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onScroll")

    return export
  }

  @Suppress("unused", "UNUSED_PARAMETER")
  @ReactMethod
  fun addListener(eventName: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @Suppress("unused", "UNUSED_PARAMETER")
  @ReactMethod
  fun removeListeners(count: Int?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  companion object {
    const val NAME = "RTNGiphyGridView"
  }
}
