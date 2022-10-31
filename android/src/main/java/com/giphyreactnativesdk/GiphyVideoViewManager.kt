package com.giphyreactnativesdk

import com.facebook.react.bridge.*
import com.facebook.react.common.MapBuilder
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.facebook.react.uimanager.events.RCTEventEmitter


class GiphyVideoViewManager() : SimpleViewManager<GiphyRNVideoView>() {
  override fun getName(): String {
    return "GiphyReactNativeVideoView"
  }

  override fun getExportedCustomDirectEventTypeConstants(): Map<String, Any>? {
    return MapBuilder.builder<String, Any>()
      .put(
        "onError",
        MapBuilder.of("registrationName", "onError")
      )
      .put(
        "onMute",
        MapBuilder.of("registrationName", "onMute")
      )
      .put(
        "onPlaybackStateChanged",
        MapBuilder.of("registrationName", "onPlaybackStateChanged")
      ).put(
        "onUnmute",
        MapBuilder.of("registrationName", "onUnmute")
      )
      .build()
  }

  private fun getListener(
    view: GiphyRNVideoView,
    reactContext: ThemedReactContext
  ): GiphyRNVideoViewListener {
    return object : GiphyRNVideoViewListener {
      override fun onError(details: String) {
        val params = Arguments.createMap()
        params.putString("description", details)
        emitEvent(reactContext, view, "onError", params)
      }

      override fun onMute() {
        emitEvent(reactContext, view, "onMute", null)
      }

      override fun onPlaybackStateChanged(state: GiphyRNVideoPlaybackState) {
        val params = Arguments.createMap()
        params.putInt("state", state.code)
        emitEvent(reactContext, view, "onPlaybackStateChanged", params)
      }

      override fun onUnmute() {
        emitEvent(reactContext, view, "onUnmute", null)
      }
    }
  }

  fun emitEvent(context: ReactContext, view: GiphyRNVideoView, name: String, params: WritableMap?) {
    context.getJSModule(RCTEventEmitter::class.java).receiveEvent(
      view.id,
      name,
      params
    )
  }

  @Suppress("unused")
  @ReactProp(name = "media")
  fun setMedia(videoView: GiphyRNVideoView, rnMedia: ReadableMap?) {
    videoView.setMedia(rnMedia)
  }

  @Suppress("unused")
  @ReactProp(name = "muted")
  fun setMuted(videoView: GiphyRNVideoView, rnMuted: Boolean?) {
    videoView.setMuted(rnMuted)
  }

  @Suppress("unused")
  @ReactProp(name = "autoPlay")
  fun setAutoPlay(videoView: GiphyRNVideoView, autoPlay: Boolean?) {
    videoView.setAutoPlay(autoPlay)
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

  override fun onDropViewInstance(view: GiphyRNVideoView) {
    super.onDropViewInstance(view)
    view.onDestroy()
  }

  override fun createViewInstance(reactContext: ThemedReactContext): GiphyRNVideoView {
    val view = GiphyRNVideoView(reactContext)

    view.listener = getListener(view, reactContext)

    return view
  }
}
