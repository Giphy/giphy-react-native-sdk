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
import timber.log.Timber


class GiphyRNVideoView @JvmOverloads constructor(
  context: Context,
  attrs: AttributeSet? = null,
  defStyleAttr: Int = 0
) : GPHVideoPlayerView(context, attrs, defStyleAttr) {
  private var autoPlay: Boolean = false

  // TODO v2 remove
  private var playing: Boolean? = null
  private var muted = false
  private var rnStateSynchronized = false

  init {
    videoPlayer = SharedVideoPlayer.gphPlayer
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

  // TODO v2 remove
  private fun updatePlaying() {
    if (playing == null) {
      return
    }

    if (playing == true) {
      if (videoPlayer?.isPlaying == false) {
        onResume()
        videoPlayer?.onResume()
      }
    } else if (isViewPlayerActive() && videoPlayer?.isPlaying == true) {
      onPause()
      videoPlayer?.onPause()
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
    if (playing != null) {
      playing = true
    }
  }

  override fun prepare(media: Media, player: GPHVideoPlayer) {
    super.prepare(media, player)
    videoPlayer?.addListener(playerListener)
  }

  fun setMedia(rnMedia: ReadableMap?) {
    val mediaId = rnMedia?.getString("id") ?: return
    GPHCore.gifById(mediaId) { result, e ->
      val media = result?.data ?: return@gifById
      preloadFirstFrame(media)
      SharedVideoPlayer.gphPlayer.loadMedia(media, view = this, autoPlay = this.autoPlay)
      e?.let {
        Timber.d("Error while fetching GIF: %s", e.localizedMessage)
      }
    }
  }

  fun setMuted(rnMuted: Boolean?) {
    if (rnMuted == muted) {
      return
    }
    muted = rnMuted ?: false
    updateVolume()
  }

  // TODO v2 remove
  fun setPlaying(rnPlaying: Boolean?) {
    if (rnPlaying == playing) {
      return
    }
    playing = rnPlaying ?: false
    updatePlaying()
  }

  fun setAutoPlay(value: Boolean?) {
    if (value == autoPlay) {
      return
    }
    autoPlay = value ?: false
  }

  override fun onDestroy() {
    super.onDestroy()
    videoPlayer?.removeListener(playerListener)
  }
}
