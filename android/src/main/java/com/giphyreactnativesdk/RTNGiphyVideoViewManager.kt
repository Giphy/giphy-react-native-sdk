package com.giphyreactnativesdk

import com.facebook.react.common.MapBuilder
import com.facebook.react.module.annotations.ReactModule
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.giphyreactnativesdk.events.OnErrorEvent
import com.giphyreactnativesdk.events.OnMuteEvent
import com.giphyreactnativesdk.events.OnPlaybackStateChangeEvent
import com.giphyreactnativesdk.events.OnUnmuteEvent

@Suppress("unused")
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

    export[OnPlaybackStateChangeEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onPlaybackStateChanged")
    export[OnMuteEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onMuteEvent")
    export[OnUnmuteEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onUnmuteEvent")
    export[OnErrorEvent.EVENT_NAME] =
      MapBuilder.of("registrationName", "onErrorEvent")

    return export
  }

  companion object {
    const val NAME = "RTNGiphyVideoView"
  }
}
