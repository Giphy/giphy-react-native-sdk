package com.giphyreactnativesdk

import android.content.Context
import android.util.AttributeSet
import com.facebook.react.bridge.ReadableMap
import com.giphy.sdk.core.GPHCore
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.utils.aspectRatio
import com.giphy.sdk.ui.views.GPHMediaView
import timber.log.Timber


class GiphyRNMediaView @JvmOverloads constructor(
  context: Context,
  attrs: AttributeSet? = null,
  defStyleAttr: Int = 0
) : GPHMediaView(context, attrs, defStyleAttr) {
  companion object {
    val DEFAULT_RENDITION_TYPE = RenditionType.fixedWidth
  }

  private var renditionType = DEFAULT_RENDITION_TYPE
  private var loadedMedia: Media? = null
  private var autoPlay: Boolean = true

  private fun updateMedia() {
    if (loadedMedia != null) {
      setMedia(loadedMedia, renditionType)
    }
    aspectRatio = loadedMedia?.aspectRatio ?: aspectRatio
    if (autoPlay == false) {
      pause()
    }
  }

  fun setAutoPlay(rnValue: Boolean?) {
    if (rnValue != null) {
      autoPlay = rnValue
    }
  }

  fun setMedia(rnMedia: ReadableMap?) {
    val mediaId = rnMedia?.getString("id") ?: return
    GPHCore.gifById(mediaId) { result, e ->
      loadedMedia = result?.data
      updateMedia()
      e?.let {
        Timber.d("Error while fetching GIF: %s", e.localizedMessage)
      }
    }
  }

  fun setRenditionType(renditionName: String?) {
    renditionType = RenditionType.values().firstOrNull {
      it.name == snakeToCamel(renditionName)
    } ?: DEFAULT_RENDITION_TYPE
    updateMedia()
  }
}
