package com.giphyreactnativesdk

import android.os.Handler
import android.os.Looper
import com.giphy.sdk.ui.views.GPHVideoPlayer

object SharedVideoPlayer {
  private val gphPlayerDelegate = lazy { GPHVideoPlayer(null, repeatable = true) }
  val gphPlayer by gphPlayerDelegate
  var looper: Looper? = null

  private fun runInPlayerApplicationLooper(runnable: Runnable) {

    // Android SDK kills the player on every pause event and creates it when needed later on.
    // We keep a looper to make a possibility to resume.
    // It is the easiest way for now.
    gphPlayer.player?.let {
      looper = it.applicationLooper
    }

    val applicationLooper = gphPlayer.player?.applicationLooper ?: looper
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

  fun resume() {
    if (gphPlayerDelegate.isInitialized() && gphPlayer.playerView != null) {
      runInPlayerApplicationLooper {
        gphPlayer.onResume()
      }
    }
  }
}
