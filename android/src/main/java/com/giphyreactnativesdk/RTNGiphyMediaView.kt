package com.giphyreactnativesdk

import android.content.Context
import android.graphics.drawable.Animatable
import android.util.AttributeSet
import com.facebook.drawee.drawable.ScalingUtils
import com.facebook.imagepipeline.image.ImageInfo
import com.facebook.react.uimanager.UIManagerHelper
import com.facebook.react.uimanager.events.Event
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.utils.aspectRatio
import com.giphy.sdk.ui.views.GPHMediaView
import com.giphy.sdk.ui.views.GifView
import com.giphyreactnativesdk.dto.RTNResizeMode
import com.giphyreactnativesdk.events.OnMediaErrorEvent
import com.giphyreactnativesdk.events.OnMediaLoadEvent
import com.giphyreactnativesdk.utils.CaseConverter
import timber.log.Timber

class RTNGiphyMediaView @JvmOverloads constructor(
  context: Context,
  attrs: AttributeSet? = null,
  defStyleAttr: Int = 0
) : GPHMediaView(context, attrs, defStyleAttr) {
  companion object {
    val DEFAULT_RENDITION_TYPE = RenditionType.fixedWidth
  }

  private var renditionType = DEFAULT_RENDITION_TYPE
  private var resizeMode = RTNResizeMode.DEFAULT_MODE
  private var loadedMedia: Media? = null
  private var requestedMediaId: String? = null
  private var reportedLoadMediaId: String? = null
  private var autoPlay: Boolean = true

  init {
    adjustResizeMode()
    gifCallback = object : GifView.GifCallback {
      override fun onImageSet(imageInfo: ImageInfo?, anim: Animatable?, loopDuration: Long, loopCount: Int) {
        reportLoad()
      }

      // The SDK reports a failure only for some loading paths, so this is a best effort.
      override fun onFailure(throwable: Throwable?) {
        val mediaId = loadedMedia?.id ?: return
        if (mediaId == requestedMediaId) {
          dispatchEvent(
            OnMediaErrorEvent(
              UIManagerHelper.getSurfaceId(this@RTNGiphyMediaView),
              this@RTNGiphyMediaView.id,
              throwable?.localizedMessage ?: "Failed to load media: $mediaId"
            )
          )
        }
      }
    }
  }

  // Reports a load once per requested media: syncMedia() sets the media again
  // when a prop changes, and the SDK calls onImageSet for every loading step.
  private fun reportLoad() {
    val mediaId = loadedMedia?.id ?: return
    if (mediaId != requestedMediaId || mediaId == reportedLoadMediaId) {
      return
    }
    reportedLoadMediaId = mediaId
    dispatchEvent(OnMediaLoadEvent(UIManagerHelper.getSurfaceId(this), this.id))
  }

  fun setAutoPlay(rnValue: Boolean?) {
    if (rnValue != null) {
      autoPlay = rnValue
    }
  }

  fun setMedia(mediaId: String?) {
    requestedMediaId = mediaId
    reportedLoadMediaId = null
    if (mediaId == null) {
      return
    }

    GPHCore.gifById(mediaId) { result, e ->
      e?.let {
        Timber.d("Error while fetching GIF: %s", e.localizedMessage)
      }
      // Ignore the answer for media that is no longer requested.
      if (mediaId != requestedMediaId) {
        return@gifById
      }
      loadedMedia = result?.data
      syncMedia()
      if (result?.data == null) {
        dispatchEvent(
          OnMediaErrorEvent(
            UIManagerHelper.getSurfaceId(this),
            this.id,
            e?.localizedMessage ?: "Media not found: $mediaId"
          )
        )
      }
    }
  }

  fun setRenditionType(renditionName: String?) {
    renditionType = RenditionType.values().firstOrNull {
      it.name == CaseConverter.snakeToCamel(renditionName)
    } ?: DEFAULT_RENDITION_TYPE
    syncMedia()
  }

  fun setResizeMode(rnValue: String?) {
    resizeMode = RTNResizeMode.fromRNValue(rnValue) ?: RTNResizeMode.DEFAULT_MODE
    adjustResizeMode()
    syncMedia()
  }

  fun setShowCheckeredBackground(rnValue: Boolean?) {
    isBackgroundVisible = rnValue ?: true
    syncMedia()
  }

  private fun syncMedia() {
    if (loadedMedia != null) {
      setMedia(loadedMedia, renditionType)
    }
    aspectRatio = loadedMedia?.aspectRatio ?: aspectRatio
    if (autoPlay == false) {
      pause()
    }
  }

  private fun dispatchEvent(event: Event<*>) {
    val context = UIManagerHelper.getReactContext(this)
    UIManagerHelper.getEventDispatcherForReactTag(context, id)?.dispatchEvent(event)
  }

  private fun adjustResizeMode() {
    when (resizeMode) {
      RTNResizeMode.CENTER -> {
        scaleType = ScalingUtils.ScaleType.CENTER_INSIDE
      }

      RTNResizeMode.CONTAIN -> {
        scaleType = ScalingUtils.ScaleType.FIT_CENTER
      }

      RTNResizeMode.COVER -> {
        scaleType = ScalingUtils.ScaleType.CENTER_CROP
      }

      RTNResizeMode.STRETCH -> {
        scaleType = ScalingUtils.ScaleType.FIT_XY
      }
    }
  }
}
