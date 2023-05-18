package com.giphyreactnativesdk

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.*
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RatingType
import com.giphy.sdk.ui.GPHContentType
import com.giphy.sdk.ui.GPHSettings
import com.giphy.sdk.ui.themes.GPHTheme
import com.giphy.sdk.ui.views.GiphyDialogFragment
import com.giphyreactnativesdk.dto.RNGiphyContentType
import com.giphyreactnativesdk.dto.RNGiphyMedia
import com.giphyreactnativesdk.dto.RNGiphyRating
import com.giphyreactnativesdk.dto.RNGiphyRendition
import com.giphyreactnativesdk.utils.getVideoPlayerFactory
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch


private enum class RNSettings {
  clipsPreviewRenditionType,
  confirmationRenditionType,
  enableDynamicText,
  mediaTypeConfig,
  rating,
  renditionType,
  selectedContentType,
  showCheckeredBackground,
  showConfirmationScreen,
  showSuggestionsBar,
  stickerColumnCount,
}

private fun giphyDialogSettingsFromRNValue(
  options: ReadableMap,
  context: Context,
  initialSettings: GPHSettings? = null
): GPHSettings {
  val settings = initialSettings?.copy() ?: GPHSettings()

  RNGiphyTheme(context, options.getMap("theme")).applyToGPHCustomTheme()
  settings.theme = GPHTheme.Custom

  if (options.hasKey(RNSettings.renditionType.toString())) {
    settings.renditionType = RNGiphyRendition.fromRNValue(
      options.getString(RNSettings.renditionType.toString())
    )
  }

  if (options.hasKey(RNSettings.confirmationRenditionType.toString())) {
    settings.confirmationRenditionType = RNGiphyRendition.fromRNValue(
      options.getString(RNSettings.confirmationRenditionType.toString())
    )
  }

  if (options.hasKey(RNSettings.rating.toString())) {
    val rawRating = options.getString(RNSettings.rating.toString())
    settings.rating = RNGiphyRating.fromRNValue(rawRating) ?: RatingType.pg13
  }

  if (options.hasKey(RNSettings.showConfirmationScreen.toString())) {
    settings.showConfirmationScreen = options.getBoolean(
      RNSettings.showConfirmationScreen.toString()
    )
  }

  if (options.hasKey(RNSettings.showSuggestionsBar.toString())) {
    settings.showSuggestionsBar = options.getBoolean(RNSettings.showSuggestionsBar.toString())
  }

  if (options.hasKey(RNSettings.selectedContentType.toString())) {
    settings.selectedContentType = RNGiphyContentType.fromRNValue(
      options.getString(RNSettings.selectedContentType.toString())
    )
  }

  if (options.hasKey(RNSettings.mediaTypeConfig.toString())) {
    val typeConfig =
      options.getArray(RNSettings.mediaTypeConfig.toString())?.toArrayList()?.map { ctype ->
        RNGiphyContentType.fromRNValue(ctype.toString())
      }?.toTypedArray()

    if (typeConfig != null) {
      settings.mediaTypeConfig = typeConfig
    }
  }

  if (options.hasKey(RNSettings.enableDynamicText.toString())) {
    settings.enableDynamicText = options.getBoolean(
      RNSettings.enableDynamicText.toString()
    )
  }

  if (options.hasKey(RNSettings.showCheckeredBackground.toString())) {
    settings.showCheckeredBackground = options.getBoolean(
      RNSettings.showCheckeredBackground.toString()
    )
  }

  if (options.hasKey(RNSettings.stickerColumnCount.toString())) {
    settings.stickerColumnCount = options.getInt(RNSettings.stickerColumnCount.toString())
  }

  if (options.hasKey(RNSettings.clipsPreviewRenditionType.toString())) {
    settings.clipsPreviewRenditionType = RNGiphyRendition.fromRNValue(
      options.getString(RNSettings.clipsPreviewRenditionType.toString())
    )
  }

  return settings
}

class RNGiphyDialogModule(reactContext: ReactApplicationContext) :
  ReactContextBaseJavaModule(reactContext) {

  companion object {
    val TAG = RNGiphyDialogModule::class.java.simpleName
  }

  private var settings: GPHSettings = GPHSettings()
  private var gifsDialog: GiphyDialogFragment? = null

  override fun getName(): String {
    return "GiphyReactNativeDialog"
  }

  private fun getGifSelectionListener() = object : GiphyDialogFragment.GifSelectionListener {
    override fun onGifSelected(
      media: Media,
      searchTerm: String?,
      selectedContentType: GPHContentType
    ) {
      val params = Arguments.createMap()
      params.putMap("media", RNGiphyMedia.toRNValue(media, settings.renditionType))
      emitModuleEvent(reactApplicationContext, GiphyDialogEvents.MediaSelected.rnEvent, params)
    }

    override fun onDismissed(selectedContentType: GPHContentType) {
      emitModuleEvent(reactApplicationContext, GiphyDialogEvents.Dismissed.rnEvent, null)
    }

    override fun didSearchTerm(term: String) {}
  }

  @Suppress("unused")
  @ReactMethod
  fun configure(options: ReadableMap) {
    settings = giphyDialogSettingsFromRNValue(
      options,
      reactApplicationContext,
      settings
    )
  }

  private fun initializeDialog() {
    gifsDialog = GiphyDialogFragment.newInstance(
      settings,
      videoPlayer = getVideoPlayerFactory()
    )
  }

  @Suppress("unused")
  @ReactMethod
  fun show() {
    GlobalScope.launch(Dispatchers.Main) {
      initializeDialog()

      val compatActivity: AppCompatActivity = currentActivity as AppCompatActivity
      val fragmentManager = compatActivity.supportFragmentManager

      gifsDialog!!.gifSelectionListener = getGifSelectionListener()
      gifsDialog!!.show(fragmentManager, "giphy_view")
    }
  }

  @Suppress("unused")
  @ReactMethod
  fun hide() {
    GlobalScope.launch(Dispatchers.Main) {
      gifsDialog!!.dismiss()
    }
  }

  @Suppress("unused")
  @ReactMethod
  fun addListener(eventName: String?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }

  @Suppress("unused")
  @ReactMethod
  fun removeListeners(count: Int?) {
    // Keep: Required for RN built in Event Emitter Calls.
  }
}
