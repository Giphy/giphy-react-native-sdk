package com.giphyreactnativesdk

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

@ReactModule(name = RTNGiphyMediaViewManager.NAME)
class RTNGiphyMediaViewManager :
  RTNGiphyMediaViewManagerSpec<RTNGiphyMediaView>() {
  override fun getName() = NAME

  override fun createViewInstance(context: ThemedReactContext): RTNGiphyMediaView {
    return RTNGiphyMediaView(context)
  }

  @ReactProp(name = "showCheckeredBackground")
  override fun setShowCheckeredBackground(view: RTNGiphyMediaView?, value: Boolean) {
    view?.setShowCheckeredBackground(value)
  }

  @ReactProp(name = "resizeMode")
  override fun setResizeMode(view: RTNGiphyMediaView?, value: String?) {
    view?.setResizeMode(value)
  }

  @ReactProp(name = "renditionType")
  override fun setRenditionType(view: RTNGiphyMediaView?, value: String?) {
    view?.setRenditionType(value)
  }

  @ReactProp(name = "mediaId")
  override fun setMediaId(view: RTNGiphyMediaView?, value: String?) {
    view?.setMedia(value)
  }

  @ReactProp(name = "autoPlay")
  override fun setAutoPlay(view: RTNGiphyMediaView?, value: Boolean) {
    view?.setAutoPlay(value)
  }

  override fun receiveCommand(
    root: RTNGiphyMediaView,
    commandId: String?,
    args: ReadableArray?
  ) {
    when (commandId) {
      "resume" -> this.resume(root)
      "pause" -> this.pause(root)
    }
  }

  override fun resume(view: RTNGiphyMediaView?) {
    view?.play()
  }

  override fun pause(view: RTNGiphyMediaView?) {
    view?.pause()
  }

  companion object {
    const val NAME = "RTNGiphyMediaView"
  }
}
