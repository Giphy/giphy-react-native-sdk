package com.giphyreactnativesdk.videoplayeradapter

import android.view.SurfaceView
import com.giphy.sdk.ui.views.GPHVideoPlayerView

const val VIDEO_PLAYER_ADAPTER_STUB_IMPL = true

class VideoPlayerAdapterImpl(
  playerView: GPHVideoPlayerView?,
  repeatable: Boolean = false,
  showCaptions: Boolean = true
) : AbstractVideoPlayerAdapter(playerView, repeatable, showCaptions) {
  override fun runInPlayerApplicationLooper(runnable: Runnable) {
  }

  override val currentPosition: Long
    get() = 0
  override val duration: Long
    get() = 0
  override val isPlaying: Boolean
    get() = false

  override fun destroyPlayer() {
  }

  override fun getVolume(): Float {
    return 0f
  }

  override fun play() {
  }

  override fun seekTo(position: Long) {
  }

  override fun setVideoSurfaceView(surfaceView: SurfaceView?) {
  }

  override fun setVolume(audioVolume: Float) {
  }

  override fun setupExoPlayer(playerView: GPHVideoPlayerView, autoPlay: Boolean) {
  }

  override fun updateRepeatMode() {
  }
}
