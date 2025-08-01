package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactMethod
import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.giphyreactnativesdk.events.OnPlayerErrorEvent
import com.giphyreactnativesdk.events.OnPlayerMuteEvent
import com.giphyreactnativesdk.events.OnPlayerPlaybackStateChangeEvent
import com.giphyreactnativesdk.events.OnPlayerUnmuteEvent

@ReactModule(name = RTNGiphyVideoViewManager.NAME)
class RTNGiphyVideoViewManager :
  RTNGiphyVideoViewManagerSpec<RTNGiphyVideoView>() {
  override fun getName() = NAME

  override fun createViewInstance(context: ThemedReactContext): RTNGiphyVideoView {
    return RTNGiphyVideoView(context)
  }

  @ReactProp(name = "autoPlay")
  override fun setAutoPlay(view: RTNGiphyVideoView?, value: Boolean) {
    view?.setAutoPlay(value)
  }

  @ReactProp(name = "muted")
  override fun setMuted(view: RTNGiphyVideoView?, value: Boolean) {
    view?.setMuted(value)
  }

  @ReactProp(name = "mediaId")
  override fun setMediaId(view: RTNGiphyVideoView?, value: String?) {
    view?.setMedia(value)
  }

  override fun getExportedCustomDirectEventTypeConstants(): MutableMap<String, Any> {
    val export = super.getExportedCustomDirectEventTypeConstants() ?: MapBuilder.newHashMap()

    export[OnPlayerPlaybackStateChangeEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onPlaybackStateChanged")
    export[OnPlayerMuteEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onMute")
    export[OnPlayerUnmuteEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onUnmute")
    export[OnPlayerErrorEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onError")

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
    const val NAME = "RTNGiphyVideoView"
  }
}
