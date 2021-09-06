package com.giphyreactnativesdk

import android.content.Context
import android.util.AttributeSet
import com.facebook.react.bridge.ReadableMap
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.ui.views.GPHPlayerStateListener
import com.giphy.sdk.ui.views.GPHVideoPlayer
import com.giphy.sdk.ui.views.GPHVideoPlayerState
import com.giphy.sdk.ui.views.GPHVideoPlayerView


class GiphyRNVideoView @JvmOverloads constructor(
  context: Context,
  attrs: AttributeSet? = null,
  defStyleAttr: Int = 0
) : GPHVideoPlayerView(context, attrs, defStyleAttr) {
  private var playing: Boolean? = null
  private var muted = false
  private var playerListenerAdded = false
  private var rnStateSynchronized = false

  init {
    videoPlayer = SharedVideoPlayer.player
  }

  private val playerListener: GPHPlayerStateListener = {
    if (isViewPlayerActive()) {
      when (it) {
        is GPHVideoPlayerState.Ready -> {
          syncRNState()
        }
        else -> {
        }
      }
    } else {
      rnStateSynchronized = false
    }
  }

  private fun isViewPlayerActive(): Boolean {
    return videoPlayer?.playerView == this
  }

  private fun syncRNState() {
    if (rnStateSynchronized) {
      return
    }

    updatePlaying()
    updateVolume()
    rnStateSynchronized = true
  }

  private fun updatePlaying() {
    if (playing == null) {
      return
    }

    if (playing == true) {
      if (videoPlayer?.isPlaying == false) {
        onResume()
      }
    } else if (isViewPlayerActive() && videoPlayer?.isPlaying == true) {
      onPause()
    }
  }

  private fun updateVolume() {
    if (isViewPlayerActive()) {
      videoPlayer?.setVolume(if (muted) 0f else 1f)
    }
  }

  override fun didBecomeActiveByClick() {
    super.didBecomeActiveByClick()
    muted = false
    playing = true
  }

  override fun prepare(media: Media, player: GPHVideoPlayer) {
    super.prepare(media, player)
    if (!playerListenerAdded) {
      videoPlayer?.addListener(playerListener)
      playerListenerAdded = true
    }
  }

  fun setMedia(rnMedia: ReadableMap?) {
    val mediaId = rnMedia?.getString("id") ?: return
    GPHCore.gifById(mediaId) { result, _ ->
      val media = result?.data ?: return@gifById
      preloadFirstFrame(media)
      SharedVideoPlayer.player.loadMedia(media, view = this)
    }
  }

  fun setMuted(rnMuted: Boolean?) {
    if (rnMuted == muted) {
      return
    }
    muted = rnMuted ?: false
    updateVolume()
  }

  fun setPlaying(rnPlaying: Boolean?) {
    if (rnPlaying == playing) {
      return
    }
    playing = rnPlaying ?: false
    updatePlaying()
  }

  override fun onDestroy() {
    super.onDestroy()
    if (playerListenerAdded) {
      videoPlayer?.removeListener(playerListener)
      playerListenerAdded = false
    }
  }
}
