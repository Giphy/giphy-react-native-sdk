package com.giphyreactnativesdk

import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp

class RNGiphyMediaViewManager : SimpleViewManager<RNGiphyMediaView>() {
  val REACT_CLASS = "GiphyReactNativeMediaView"
  private val COMMAND_PAUSE = "pause"
  private val COMMAND_RESUME = "resume"

  companion object {
    val TAG = RNGiphyMediaViewManager::class.java.simpleName
  }

  @Suppress("unused")
  @ReactProp(name = "autoPlay")
  fun autoPlay(gifView: RNGiphyMediaView, rnValue: Boolean?) {
    gifView.setAutoPlay(rnValue)
  }

  @Suppress("unused")
  @ReactProp(name = "media")
  fun setMedia(gifView: RNGiphyMediaView, rnMedia: ReadableMap?) {
    gifView.setMedia(rnMedia)
  }

  @Suppress("unused")
  @ReactProp(name = "renditionType")
  fun setRenditionType(gifView: RNGiphyMediaView, renditionName: String?) {
    gifView.setRenditionType(renditionName)
  }

  @Suppress("unused")
  @ReactProp(name = "resizeMode")
  fun setResizeMode(gifView: RNGiphyMediaView, resizeMode: String?) {
    gifView.setResizeMode(resizeMode)
  }

  @Suppress("unused")
  @ReactProp(name = "showCheckeredBackground")
  fun setShowCheckeredBackground(gifView: RNGiphyMediaView, rnValue: Boolean?) {
    gifView.setShowCheckeredBackground(rnValue)
  }

  override fun getName(): String {
    return REACT_CLASS
  }

  override fun getCommandsMap(): Map<String, Int>? {
    return MapBuilder.of(
      COMMAND_PAUSE, 1,
      COMMAND_RESUME, 2,
    )
  }

  override fun receiveCommand(
    root: RNGiphyMediaView,
    commandId: String?,
    args: ReadableArray?
  ) {
    when (commandId) {
      COMMAND_PAUSE -> root.pause()
      COMMAND_RESUME -> root.play()
    }
  }

  override fun receiveCommand(root: RNGiphyMediaView, commandId: Int, args: ReadableArray?) {
    val command = commandsMap?.keys?.first { commandId == commandsMap?.get(it) }
    if (command != null) {
      receiveCommand(root, command, args)
    }
  }

  override fun createViewInstance(reactContext: ThemedReactContext): RNGiphyMediaView {
    return RNGiphyMediaView(reactContext)
  }
}
