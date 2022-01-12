package com.giphyreactnativesdk

import android.content.Context
import android.util.AttributeSet
import com.facebook.react.bridge.ReadableMap
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.ui.views.GPHPlayerStateListener
import com.giphy.sdk.ui.views.GPHVideoPlayerView
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

  // TODO v2 remove playing
  private var playing: Boolean? = null
  private var muted = false
  private var rnStateSynchronized = false

  private val playerListener: GPHPlayerStateListener = {
  }

  private fun isViewPlayerActive(): Boolean {
    return false
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
  private fun updatePlaying() {}

  private fun updateVolume() {}

  override fun didBecomeActiveByClick() {
    super.didBecomeActiveByClick()
    muted = false
    if (playing != null) {
      playing = true
    }
  }

  fun setMedia(rnMedia: ReadableMap?) {
    val mediaId = rnMedia?.getString("id") ?: return
    GPHCore.gifById(mediaId) { result, e ->
      val media = result?.data ?: return@gifById
      preloadFirstFrame(media)
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
}
