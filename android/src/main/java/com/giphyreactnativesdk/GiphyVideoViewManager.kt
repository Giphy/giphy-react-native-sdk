package com.giphyreactnativesdk

import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.SimpleViewManager
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.annotations.ReactProp
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.ui.views.GPHVideoPlayer
import com.giphy.sdk.ui.views.GPHVideoPlayerView

class GiphyVideoViewManager(): SimpleViewManager<GPHVideoPlayerView>() {
  override fun getName(): String {
    return "GiphyReactNativeVideoView"
  }

  private var media: Media? = null
  private var player: GPHVideoPlayer? = null
  private var playing = false

  @ReactProp(name="media")
  fun setMedia(videoView: GPHVideoPlayerView, rnMedia: ReadableMap) {
    val mediaId = rnMedia.getString("id")
    val aspectRatio = rnMedia.getDouble("aspectRatio")

    if (mediaId != null) {
      GPHCore.gifById(mediaId) { result, e ->
        media = result?.data
        if (media != null) {
          videoView.preloadFirstFrame(media!!)
          player = GPHVideoPlayer(videoView, repeatable = true)
          player?.loadMedia(media!!)
          playing = true
        }
      }
    }

  }

  @ReactProp(name="muted")
  fun setMuted(videoView: GPHVideoPlayerView, rnMuted: Boolean){
    player?.setVolume(if (rnMuted) 0f else 1f)
  }

  @ReactProp(name="playing")
  fun setPlaying(videoView: GPHVideoPlayerView, rnPlaying: Boolean) {
    if (rnPlaying != playing) {
      playing = rnPlaying
      if (playing) videoView.onResume() else videoView.onPause()
    }
  }

  override fun createViewInstance(reactContext: ThemedReactContext): GPHVideoPlayerView {
    return GPHVideoPlayerView(reactContext)
  }
}
