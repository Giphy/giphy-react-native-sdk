package com.giphyreactnativesdk

import android.content.Context
import android.util.AttributeSet
import com.facebook.drawee.drawable.ScalingUtils
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.utils.aspectRatio
import com.giphy.sdk.ui.views.GPHMediaView
import com.giphyreactnativesdk.dto.RTNResizeMode
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
  private var autoPlay: Boolean = true

  init {
    adjustResizeMode()
  }

  fun setAutoPlay(rnValue: Boolean?) {
    if (rnValue != null) {
      autoPlay = rnValue
    }
  }

  fun setMedia(mediaId: String?) {
    if (mediaId == null) {
      return
    }

    GPHCore.gifById(mediaId) { result, e ->
      loadedMedia = result?.data
      syncMedia()
      e?.let {
        Timber.d("Error while fetching GIF: %s", e.localizedMessage)
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
