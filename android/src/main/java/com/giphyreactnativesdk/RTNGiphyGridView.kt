package com.giphyreactnativesdk

import android.content.Context
import android.util.AttributeSet
import android.view.ViewGroup
import android.widget.FrameLayout
import androidx.core.view.children
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.uimanager.ThemedReactContext
import com.giphy.sdk.core.models.enums.MediaType
import com.giphy.sdk.core.models.enums.RatingType
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.GPHRequestType
import com.giphy.sdk.ui.pagination.GPHContent
import com.giphy.sdk.ui.themes.GPHTheme
import com.giphy.sdk.ui.views.GiphyGridView
import com.giphyreactnativesdk.dto.RTNGiphyRating
import com.giphyreactnativesdk.dto.RTNGiphyRendition

class RTNGiphyGridView @JvmOverloads constructor(
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
    val activity = (context as? ThemedReactContext)?.reactApplicationContext?.currentActivity
    gridView = GiphyGridView(activity ?: context)
    addView(gridView)
  }

  fun onDropViewInstance() {
    gridView.children.forEach {
      (it as? ViewGroup)?.let { vg ->
        vg.removeAllViews()
        vg.clearDisappearingChildren()
      }
    }
    gridView.removeAllViews()
    gridView.clearDisappearingChildren()
    removeAllViews()
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

    content.rating = RTNGiphyRating.fromRNValue(value?.getString("rating")) ?: RatingType.pg13

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

  fun setDisableEmojiVariations(value: Boolean?) {
    if (value != null) {
      gridView.disableEmojiVariations = value
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
    renditionType = RTNGiphyRendition.fromRNValue(value) ?: DEFAULT_RENDITION_TYPE
  }

  fun setClipsPreviewRenditionType(value: String?) {
    clipsPreviewRenditionType = RTNGiphyRendition.fromRNValue(value) ?: DEFAULT_RENDITION_TYPE
  }

  fun setShowCheckeredBackground(value: Boolean?) {
    gridView.showCheckeredBackground = value ?: false
  }

  fun setTheme(value: ReadableMap?) {
    RTNGiphyTheme(context, value).applyToGPHCustomTheme()
    gridView.theme = GPHTheme.Custom
  }
}
