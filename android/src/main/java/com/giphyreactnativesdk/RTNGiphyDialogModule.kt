package com.giphyreactnativesdk

import android.content.Context
import androidx.appcompat.app.AppCompatActivity
import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactMethod
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RatingType
import com.giphy.sdk.ui.GPHContentType
import com.giphy.sdk.ui.GPHSettings
import com.giphy.sdk.ui.themes.GPHTheme
import com.giphy.sdk.ui.views.GiphyDialogFragment
import com.giphyreactnativesdk.dto.RTNGiphyContentType
import com.giphyreactnativesdk.dto.RTNGiphyMedia
import com.giphyreactnativesdk.dto.RTNGiphyRating
import com.giphyreactnativesdk.dto.RTNGiphyRendition
import com.giphyreactnativesdk.utils.getVideoPlayerFactory
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.launch


private enum class RTNDialogProps(val key: String) {
  CLIPS_PREVIEW_RENDITION_TYPE("clipsPreviewRenditionType"),
  CONFIRMATION_RENDITION_TYPE("confirmationRenditionType"),
  ENABLE_DYNAMIC_TEXT("enableDynamicText"),
  TRAY_HEIGHT_MULTIPLIER("trayHeightMultiplier"),
  MEDIA_TYPE_CONFIG("mediaTypeConfig"),
  RATING("rating"),
  RENDITION_TYPE("renditionType"),
  SELECTED_CONTENT_TYPE("selectedContentType"),
  SHOW_CHECKERED_BACKGROUND("showCheckeredBackground"),
  SHOW_CONFIRMATION_SCREEN("showConfirmationScreen"),
  SHOW_SUGGESTIONS_BAR("showSuggestionsBar"),
  STICKER_COLUMN_COUNT("stickerColumnCount"),
}

private fun giphyDialogSettingsFromRNValue(
  options: ReadableMap,
  context: Context,
  initialSettings: GPHSettings? = null
): GPHSettings {
  val settings = initialSettings?.copy() ?: GPHSettings()

  RTNGiphyTheme(context, options.getMap("theme")).applyToGPHCustomTheme()
  settings.theme = GPHTheme.Custom

  if (options.hasKey(RTNDialogProps.RENDITION_TYPE.key)) {
    settings.renditionType = RTNGiphyRendition.fromRNValue(
      options.getString(RTNDialogProps.RENDITION_TYPE.key)
    )
  }

  if (options.hasKey(RTNDialogProps.CONFIRMATION_RENDITION_TYPE.key)) {
    settings.confirmationRenditionType = RTNGiphyRendition.fromRNValue(
      options.getString(RTNDialogProps.CONFIRMATION_RENDITION_TYPE.key)
    )
  }

  if (options.hasKey(RTNDialogProps.TRAY_HEIGHT_MULTIPLIER.key)) {
    settings.trayHeightMultiplier = options.getDouble(
      RTNDialogProps.TRAY_HEIGHT_MULTIPLIER.key
    ).toFloat()
  }

  if (options.hasKey(RTNDialogProps.RATING.key)) {
    val rawRating = options.getString(RTNDialogProps.RATING.key)
    settings.rating = RTNGiphyRating.fromRNValue(rawRating) ?: RatingType.pg13
  }

  if (options.hasKey(RTNDialogProps.SHOW_CONFIRMATION_SCREEN.key)) {
    settings.showConfirmationScreen = options.getBoolean(
      RTNDialogProps.SHOW_CONFIRMATION_SCREEN.key
    )
  }

  if (options.hasKey(RTNDialogProps.SHOW_SUGGESTIONS_BAR.key)) {
    settings.showSuggestionsBar = options.getBoolean(RTNDialogProps.SHOW_SUGGESTIONS_BAR.key)
  }

  if (options.hasKey(RTNDialogProps.SELECTED_CONTENT_TYPE.key)) {
    settings.selectedContentType = RTNGiphyContentType.fromRNValue(
      options.getString(RTNDialogProps.SELECTED_CONTENT_TYPE.key)
    )
  }

  if (options.hasKey(RTNDialogProps.MEDIA_TYPE_CONFIG.key)) {
    val typeConfig =
      options.getArray(RTNDialogProps.MEDIA_TYPE_CONFIG.key)?.toArrayList()?.map { ctype ->
        RTNGiphyContentType.fromRNValue(ctype.toString())
      }?.toTypedArray()

    if (typeConfig != null) {
      settings.mediaTypeConfig = typeConfig
    }
  }

  if (options.hasKey(RTNDialogProps.ENABLE_DYNAMIC_TEXT.key)) {
    settings.enableDynamicText = options.getBoolean(
      RTNDialogProps.ENABLE_DYNAMIC_TEXT.key
    )
  }

  if (options.hasKey(RTNDialogProps.SHOW_CHECKERED_BACKGROUND.key)) {
    settings.showCheckeredBackground = options.getBoolean(
      RTNDialogProps.SHOW_CHECKERED_BACKGROUND.key
    )
  }

  if (options.hasKey(RTNDialogProps.STICKER_COLUMN_COUNT.key)) {
    settings.stickerColumnCount = options.getInt(RTNDialogProps.STICKER_COLUMN_COUNT.key)
  }

  if (options.hasKey(RTNDialogProps.CLIPS_PREVIEW_RENDITION_TYPE.key)) {
    settings.clipsPreviewRenditionType = RTNGiphyRendition.fromRNValue(
      options.getString(RTNDialogProps.CLIPS_PREVIEW_RENDITION_TYPE.key)
    )
  }

  return settings
}

class RTNGiphyDialogModule internal constructor(context: ReactApplicationContext) :
  RTNGiphyDialogModuleSpec(context) {
  private var settings: GPHSettings = GPHSettings()
  private var gifsDialog: GiphyDialogFragment? = null

  override fun getName() = NAME

  private fun initializeDialog() {
    gifsDialog = GiphyDialogFragment.newInstance(
      settings,
      videoPlayer = getVideoPlayerFactory()
    )
  }

  @ReactMethod
  override fun configure(options: ReadableMap?) {
    if (options == null) {
      return
    }
    settings = giphyDialogSettingsFromRNValue(
      options,
      reactApplicationContext,
      settings
    )
  }

  @ReactMethod
  override fun show() {
    GlobalScope.launch(Dispatchers.Main) {
      initializeDialog()

      val compatActivity: AppCompatActivity = currentActivity as AppCompatActivity
      val fragmentManager = compatActivity.supportFragmentManager

      gifsDialog!!.gifSelectionListener = getGifSelectionListener()
      gifsDialog!!.show(fragmentManager, "giphy_view")
    }
  }

  @ReactMethod
  override fun hide() {
    GlobalScope.launch(Dispatchers.Main) {
      gifsDialog!!.dismiss()
    }
  }

  private fun getGifSelectionListener() = object : GiphyDialogFragment.GifSelectionListener {
    override fun onGifSelected(
      media: Media,
      searchTerm: String?,
      selectedContentType: GPHContentType
    ) {
      val params = Arguments.createMap()
      params.putMap("media", RTNGiphyMedia.toRNValue(media, settings.renditionType))
      sendEvent("onMediaSelect", params)
    }

    override fun onDismissed(selectedContentType: GPHContentType) {
      sendEvent("onDismiss", Arguments.createMap())
    }

    override fun didSearchTerm(term: String) {}
  }

  private fun sendEvent(eventName: String, params: WritableMap) {
    if (!reactApplicationContext.hasActiveReactInstance()) {
      return
    }
    reactApplicationContext.getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter::class.java)
      .emit(eventName, params)
  }

  @ReactMethod
  override fun addListener(eventType: String?) {
    // Keep: Required for RN RCTEventEmitter class (iOS).
  }

  @ReactMethod
  override fun removeListeners(count: Double) {
    // Keep: Required for RN RCTEventEmitter class (iOS).
  }

  companion object {
    const val NAME = "RTNGiphyDialogModule"
  }
}
