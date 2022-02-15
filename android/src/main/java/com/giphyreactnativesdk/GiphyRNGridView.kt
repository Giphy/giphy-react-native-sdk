package com.giphyreactnativesdk

import android.content.Context
import android.util.AttributeSet
import android.widget.FrameLayout
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.giphy.sdk.core.models.enums.MediaType
import com.giphy.sdk.core.models.enums.RatingType
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.GPHRequestType
import com.giphy.sdk.ui.pagination.GPHContent
import com.giphy.sdk.ui.views.GiphyGridView

class GiphyRNGridView @JvmOverloads constructor(
  context: Context,
  attrs: AttributeSet? = null,
  defStyleAttr: Int = 0
) : FrameLayout(context, attrs, defStyleAttr) {
  companion object {
    val DEFAULT_RENDITION_TYPE = RenditionType.fixedWidth
  }

  lateinit var gridView: GiphyGridView
  private var renditionType = DEFAULT_RENDITION_TYPE
  private var clipsPreviewRenditionType = DEFAULT_RENDITION_TYPE

  init {
    prepareLayout()
  }

  private fun prepareLayout() {
    val activity = (context as? ThemedReactContext)?.currentActivity
    gridView = GiphyGridView(activity ?: context)
    addView(gridView)
  }

  override fun requestLayout() {
    super.requestLayout()
    post(measureAndLayout)
  }

  private val measureAndLayout = Runnable {
    measure(
      MeasureSpec.makeMeasureSpec(width, MeasureSpec.EXACTLY),
      MeasureSpec.makeMeasureSpec(height, MeasureSpec.EXACTLY)
    )
    layout(left, top, right, bottom)
  }

  fun setContent(value: ReadableMap?) {
    val content = GPHContent()
    val query = value?.getString("searchQuery")
    val requestType = value?.getString("requestType")
    val mediaType = value?.getString("mediaType")

    if (requestType != null) {
      content.requestType = GPHRequestType.values().firstOrNull { it.name == requestType }
        ?: GPHRequestType.search

      if (content.requestType == GPHRequestType.recents) {
        gridView.content = GPHContent.recents
        return
      }
    }

    content.rating = gphRatingByName(value?.getString("rating")) ?: RatingType.pg13;

    if (query != null) {
      content.searchQuery = query
    }

    if (mediaType != null) {
      content.mediaType = MediaType.values().firstOrNull { it.name == mediaType } ?: MediaType.gif
    }

    gridView.content = content
  }

  fun setCellPadding(value: Int?) {
    if (value != null) {
      gridView.cellPadding = value
    }
  }

  fun setFixedSizeCells(value: Boolean?) {
    if (value != null) {
      gridView.fixedSizeCells = value
    }
  }

  fun setOrientation(value: String?) {
    gridView.direction = when (value) {
      "horizontal" -> GiphyGridView.HORIZONTAL
      "vertical" -> GiphyGridView.VERTICAL
      else -> GiphyGridView.VERTICAL
    }
  }

  fun setSpanCount(value: Int?) {
    if (value != null) {
      gridView.spanCount = value
    }
  }

  fun setRenditionType(value: String?) {
    renditionType = renditionByName(value) ?: DEFAULT_RENDITION_TYPE
  }

  fun setClipsPreviewRenditionType(value: String?) {
    clipsPreviewRenditionType = renditionByName(value) ?: DEFAULT_RENDITION_TYPE
  }

  fun setShowCheckeredBackground(value: Boolean?) {
    gridView.showCheckeredBackground = value ?: false
  }
}
