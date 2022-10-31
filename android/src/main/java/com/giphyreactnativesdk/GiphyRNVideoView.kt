package com.giphyreactnativesdk

import android.content.Context
import android.util.AttributeSet
import com.facebook.react.bridge.ReadableMap
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.ui.utils.GPHPlayerStateListener
import com.giphy.sdk.ui.utils.GPHVideoPlayerState
import com.giphy.sdk.ui.views.GPHVideoPlayerView
import com.giphy.sdk.ui.utils.GPHAbstractVideoPlayer
import timber.log.Timber

enum class GiphyRNVideoPlaybackState(val code: Int) {
  Unknown(0),
  ReadyToPlay(3),
  Playing(4),
  Paused(5),
}

interface GiphyRNVideoViewListener {
  fun onError(details: String)
  fun onMute()
  fun onPlaybackStateChanged(state: GiphyRNVideoPlaybackState)
  fun onUnmute()
}

class GiphyRNVideoView @JvmOverloads constructor(
  context: Context,
  attrs: AttributeSet? = null,
  defStyleAttr: Int = 0
) : GPHVideoPlayerView(context, attrs, defStyleAttr) {
  var listener: GiphyRNVideoViewListener? = null
  private var autoPlay: Boolean = false
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
          listener?.onPlaybackStateChanged(GiphyRNVideoPlaybackState.ReadyToPlay)
        }
        is GPHVideoPlayerState.Playing -> {
          listener?.onPlaybackStateChanged(GiphyRNVideoPlaybackState.Playing)
        }
        is GPHVideoPlayerState.Error -> {
          listener?.onError(it.details)
        }
        is GPHVideoPlayerState.MuteChanged -> {
          if (it.muted) {
            listener?.onUnmute()
          } else {
            listener?.onMute()
          }
        }
        is GPHVideoPlayerState.Unknown -> listener?.onPlaybackStateChanged(GiphyRNVideoPlaybackState.Unknown)
        else -> {
        }
      }

      if (videoPlayer?.paused == true) {
        listener?.onPlaybackStateChanged(GiphyRNVideoPlaybackState.Paused)
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

    updateVolume()
    rnStateSynchronized = true
  }

  private fun updateVolume() {
    if (!isViewPlayerActive()) {
      return
    }

    if (muted) {
      if (videoPlayer?.getVolume() != 0f) videoPlayer?.setVolume(0f)
    } else {
      if (videoPlayer?.getVolume() != 1f) videoPlayer?.setVolume(1f)
    }
  }

  override fun didBecomeActiveByClick() {
    super.didBecomeActiveByClick()
    muted = false
  }

  override fun prepare(media: Media, player: GPHAbstractVideoPlayer) {
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

  fun setAutoPlay(value: Boolean?) {
    if (value == autoPlay) {
      return
    }
    autoPlay = value ?: false
  }

  override fun onDestroy() {
    super.onDestroy()
    if (isViewPlayerActive()) {
      videoPlayer?.onPause()
    }
    videoPlayer?.removeListener(playerListener)
  }
}
