package com.giphyreactnativesdk

import com.facebook.react.bridge.ReadableMap
import com.giphy.sdk.core.models.enums.RatingType
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.GPHContentType
import com.giphy.sdk.ui.GPHSettings
import com.giphy.sdk.ui.themes.GPHTheme
import java.util.*

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
  theme,
}


private fun capitalize(word: String): String {
  return word.replaceFirstChar {
    if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString()
  }
}

fun snakeToCamel(value: String?): String? {
  return when (value) {
    null -> null
    else -> value.split("_").mapIndexed { idx, word ->
      if (idx == 0) word.lowercase() else capitalize(word)
    }.joinToString("")
  }
}

fun renditionByName(renditionName: String?): RenditionType? {
  return when (renditionName) {
    null -> null
    else -> RenditionType.values().firstOrNull { it.name == snakeToCamel(renditionName) }
  }
}

fun gphRatingByName(ratingName: String?): RatingType? {
  return when (ratingName) {
    null -> null
    else -> RatingType.values().firstOrNull {
      it.name == ratingName
        .replace("-", "")
        .lowercase()
    }
  }
}

fun getContentType(contentType: String?): GPHContentType {
  return when (contentType) {
    null -> GPHContentType.gif
    else -> GPHContentType.values().firstOrNull { it.name == contentType.lowercase() }
      ?: GPHContentType.gif
  }
}


fun giphySettingsFromReadableMap(
  options: ReadableMap,
  initialSettings: GPHSettings? = null
): GPHSettings {
  val settings = initialSettings?.copy() ?: GPHSettings()

  if (options.hasKey(RNSettings.renditionType.toString())) {
    settings.renditionType = renditionByName(
      options.getString(RNSettings.renditionType.toString())
    )
  }

  if (options.hasKey(RNSettings.confirmationRenditionType.toString())) {
    settings.confirmationRenditionType = renditionByName(
      options.getString(RNSettings.confirmationRenditionType.toString())
    )
  }

  if (options.hasKey(RNSettings.rating.toString())) {
    val rawRating = options.getString(RNSettings.rating.toString())
    settings.rating = gphRatingByName(rawRating) ?: RatingType.pg13
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
    settings.selectedContentType = getContentType(
      options.getString(RNSettings.selectedContentType.toString())
    )
  }

  if (options.hasKey(RNSettings.mediaTypeConfig.toString())) {
    val typeConfig =
      options.getArray(RNSettings.mediaTypeConfig.toString())?.toArrayList()?.map { ctype ->
        getContentType(ctype.toString())
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

  if (options.hasKey(RNSettings.theme.toString())) {
    settings.theme = GPHTheme.values().firstOrNull {
      it.name == capitalize(options.getString(RNSettings.theme.toString()) ?: "")
    } ?: GPHTheme.Automatic
  }

  if (options.hasKey(RNSettings.clipsPreviewRenditionType.toString())) {
    settings.clipsPreviewRenditionType = renditionByName(
      options.getString(RNSettings.clipsPreviewRenditionType.toString())
    )
  }

  return settings
}
