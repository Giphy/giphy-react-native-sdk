package com.giphyreactnativesdk

import com.giphyreactnativesdk.exoplayeradapter.ExoPlayerAdapter

object SharedVideoPlayer {
  private val gphPlayerDelegate = lazy {
    ExoPlayerAdapter(null, repeatable = true)
  }
  val gphPlayer by gphPlayerDelegate

  fun mute() {
    if (gphPlayerDelegate.isInitialized() && gphPlayer.playerView != null) {
      gphPlayer.runInPlayerApplicationLooper {
        gphPlayer.setVolume(0f)
      }
    }
  }

  fun pause() {
    if (gphPlayerDelegate.isInitialized() && gphPlayer.playerView != null) {
      gphPlayer.runInPlayerApplicationLooper {
        gphPlayer.onPause()
      }
    }
  }

  fun resume() {
    if (gphPlayerDelegate.isInitialized() && gphPlayer.playerView != null) {
      gphPlayer.runInPlayerApplicationLooper {
        gphPlayer.onResume()
      }
    }
  }
}
