package com.giphyreactnativesdk.exoplayeradapter

import android.view.SurfaceView
import com.giphy.sdk.ui.views.GPHVideoPlayerView

class ExoPlayerAdapter(
  playerView: GPHVideoPlayerView?,
  repeatable: Boolean = false,
  showCaptions: Boolean = true
) : AbstractExoPlayerAdapter(playerView, repeatable, showCaptions) {
  override val duration: Long
    get() {
      return 0
    }

  override val currentPosition: Long
    get() {
      return 0
    }

  override val isPlaying: Boolean
    get() {
      return false
    }

  override fun getVolume(): Float {
    return 0f
  }

  override fun setVolume(audioVolume: Float) {
  }

  override fun setVideoSurfaceView(surfaceView: SurfaceView?) {
  }

  override fun seekTo(position: Long) {
  }

  override fun play() {
  }

  override fun setupExoPlayer(playerView: GPHVideoPlayerView, autoPlay: Boolean) {}

  override fun destroyPlayer() {
  }

  override fun updateRepeatMode() {
  }

  // endregion

  // region RN helpers
  override fun runInPlayerApplicationLooper(runnable: Runnable) {
  }

  // endregion
}
