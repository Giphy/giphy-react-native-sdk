package com.giphyreactnativesdk

import com.giphyreactnativesdk.videoplayeradapter.VideoPlayerAdapterImpl

object SharedVideoPlayer {
  private val gphPlayerDelegate = lazy {
    VideoPlayerAdapterImpl(null, repeatable = true)
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
