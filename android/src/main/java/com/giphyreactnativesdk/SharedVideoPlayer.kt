package com.giphyreactnativesdk

import android.os.Handler
import com.giphy.sdk.ui.views.GPHVideoPlayer

object SharedVideoPlayer {
  val gphPlayer: GPHVideoPlayer by lazy {
    initialized = true
    GPHVideoPlayer(null, repeatable = true)
  }

  private var initialized: Boolean = false

  private fun runInPlayerApplicationLooper(runnable: Runnable) {
    val applicationLooper = gphPlayer.player?.applicationLooper
    if (applicationLooper != null) {
      Handler(applicationLooper).post(runnable)
    }
  }

  fun mute() {
    if (initialized && gphPlayer.playerView != null) {
      runInPlayerApplicationLooper {
        gphPlayer.setVolume(0f)
      }
    }
  }

  fun pause() {
    if (initialized && gphPlayer.playerView != null) {
      runInPlayerApplicationLooper {
        gphPlayer.onPause()
      }
    }
  }
}
