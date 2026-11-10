package com.giphyreactnativesdk

import android.content.Context
import android.util.AttributeSet
import com.facebook.react.uimanager.ThemedReactContext
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.ui.utils.GPHAbstractVideoPlayer
import com.giphy.sdk.ui.utils.GPHPlayerStateListener
import com.giphy.sdk.ui.utils.GPHVideoPlayerState
import com.giphy.sdk.ui.views.GPHVideoPlayerView
import com.giphyreactnativesdk.events.OnPlayerErrorEvent
import com.giphyreactnativesdk.events.OnPlayerMuteEvent
import com.giphyreactnativesdk.events.OnPlayerPlaybackStateChangeEvent
import com.giphyreactnativesdk.events.OnPlayerUnmuteEvent
import com.giphyreactnativesdk.events.RTNGiphyVideoPlaybackState
import timber.log.Timber


class RTNGiphyVideoView @JvmOverloads constructor(
  context: Context,
  attrs: AttributeSet? = null,
  defStyleAttr: Int = 0
) : GPHVideoPlayerView(context, attrs, defStyleAttr) {
  private var autoPlay: Boolean = false
  private var muted = false
  private var rnStateSynchronized = false
  private var requestedMediaId: String? = null
  private var destroyed = false

  init {
    videoPlayer = SharedVideoPlayer.gphPlayer
  }

  private fun syncRNState() {
    if (rnStateSynchronized) {
      return
    }

    updateVolume()
    rnStateSynchronized = true
  }

  private fun isViewPlayerActive(): Boolean {
    return videoPlayer?.playerView == this
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

  fun setMedia(mediaId: String?) {
    requestedMediaId = mediaId
    if (mediaId == null) {
      return
    }

    GPHCore.gifById(mediaId) { result, e ->
      e?.let {
        Timber.d("Error while fetching GIF: %s", e.localizedMessage)
      }
      // The view may have been dropped, or given other media, while the lookup ran. Loading the
      // media then would start playback that nobody sees.
      if (destroyed || mediaId != requestedMediaId) {
        return@gifById
      }
      val media = result?.data
      if (media == null) {
        dispatchEvent(
          OnPlayerErrorEvent(
            UIManagerHelper.getSurfaceId(this),
            this.id,
            e?.localizedMessage ?: "Media not found: $mediaId"
          )
        )
        return@gifById
      }
      preloadFirstFrame(media)
      SharedVideoPlayer.gphPlayer.loadMedia(media, view = this, autoPlay = this.autoPlay)
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

  private val playerListener: GPHPlayerStateListener = {
    if (isViewPlayerActive()) {
      val surfaceId = UIManagerHelper.getSurfaceId(this)
      when (it) {
        is GPHVideoPlayerState.Ready -> {
          syncRNState()
          dispatchEvent(
            OnPlayerPlaybackStateChangeEvent(
              surfaceId,
              this.id,
              RTNGiphyVideoPlaybackState.ReadyToPlay
            )
          )
        }

        is GPHVideoPlayerState.Playing -> {
          dispatchEvent(
            OnPlayerPlaybackStateChangeEvent(
              surfaceId,
              this.id,
              RTNGiphyVideoPlaybackState.Playing
            )
          )
        }

        is GPHVideoPlayerState.Error -> {
          dispatchEvent(
            OnPlayerErrorEvent(
              surfaceId,
              this.id, it.details
            )
          )
        }

        is GPHVideoPlayerState.MuteChanged -> {
          if (it.muted) {
            dispatchEvent(OnPlayerMuteEvent(surfaceId, this.id))
          } else {
            dispatchEvent(OnPlayerUnmuteEvent(surfaceId, this.id))
          }
        }

        is GPHVideoPlayerState.Unknown -> dispatchEvent(
          OnPlayerPlaybackStateChangeEvent(
            surfaceId,
            this.id,
            RTNGiphyVideoPlaybackState.Unknown
          )
        )

        else -> {
        }
      }

      if (videoPlayer?.paused == true) {
        dispatchEvent(
          OnPlayerPlaybackStateChangeEvent(
            surfaceId,
            this.id,
            RTNGiphyVideoPlaybackState.Paused
          )
        )
      }
    } else {
      rnStateSynchronized = false
    }
  }

  private fun dispatchEvent(event: Event<*>) {
    val context = this.context as ThemedReactContext
    UIManagerHelper.getEventDispatcherForReactTag(context, id)?.dispatchEvent(event)
  }

  fun dispatchPaused() {
    dispatchEvent(
      OnPlayerPlaybackStateChangeEvent(
        UIManagerHelper.getSurfaceId(this),
        this.id,
        RTNGiphyVideoPlaybackState.Paused
      )
    )
  }

  override fun onDestroy() {
    destroyed = true
    super.onDestroy()
    // The view can't receive events any more, so stop listening before pausing.
    videoPlayer?.removeListener(playerListener)
    if (isViewPlayerActive()) {
      videoPlayer?.onPause()
      // Otherwise SharedVideoPlayer.resume() would load the media into this dropped view.
      videoPlayer?.playerView = null
    }
  }
}
