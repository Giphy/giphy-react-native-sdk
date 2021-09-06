package com.giphyreactnativesdk

import android.os.Handler
import com.giphy.sdk.ui.views.GPHVideoPlayer

object SharedVideoPlayer {
  private val gphPlayerDelegate = lazy { GPHVideoPlayer(null, repeatable = true) }
  val gphPlayer by gphPlayerDelegate

  private fun runInPlayerApplicationLooper(runnable: Runnable) {
    val applicationLooper = gphPlayer.player?.applicationLooper
    if (applicationLooper != null) {
      Handler(applicationLooper).post(runnable)
    }
  }

  fun mute() {
    if (gphPlayerDelegate.isInitialized() && gphPlayer.playerView != null) {
      runInPlayerApplicationLooper {
        gphPlayer.setVolume(0f)
      }
    }
  }

  fun pause() {
    if (gphPlayerDelegate.isInitialized() && gphPlayer.playerView != null) {
      runInPlayerApplicationLooper {
        gphPlayer.onPause()
      }
    }
  }
}
