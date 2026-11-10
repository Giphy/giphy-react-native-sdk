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
        // Take the view before pausing: releasing the player may clear it.
        val pausedView = gphPlayer.playerView
        gphPlayer.onPause()
        // The SDK's onPause() releases the player instead of pausing it, so no player
        // event reports the pause. Tell the view instead.
        (pausedView as? RTNGiphyVideoView)?.dispatchPaused()
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
