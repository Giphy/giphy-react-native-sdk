package com.giphyreactnativesdk

import com.facebook.react.bridge.ReadableMap
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.GPHContentType
import com.giphy.sdk.ui.GPHSettings
import java.util.*

private fun capitalize(word: String): String {
  return word.replaceFirstChar {
    if (it.isLowerCase()) it.titlecase(Locale.getDefault()) else it.toString()
  }
}

private fun snakeToCamel(value: String): String {
  return value.split("_").mapIndexed {
      idx, word -> if(idx == 0) word.lowercase() else capitalize(word)
  }.joinToString("")
}

private fun getConfirmationRendition(renditionName: String?): RenditionType? {
  return when(renditionName) {
    null -> null
    else -> RenditionType.values().firstOrNull { it.name == snakeToCamel(renditionName) }
  }
}

private fun getSelectedContentType(contentType: String?): GPHContentType {
  return when(contentType) {
    null -> GPHContentType.gif
    else -> GPHContentType.values().firstOrNull { it.name == contentType.lowercase() }
      ?: GPHContentType.gif
  }
}

fun giphySettingsFromReadableMap(
  options: ReadableMap,
  initialSettings: GPHSettings = GPHSettings()
): GPHSettings {
  val settings = initialSettings.copy()
  if (options.hasKey("confirmationRenditionType")) {
    settings.confirmationRenditionType = getConfirmationRendition(
      options.getString("confirmationRenditionType")
    )
  }

  if (options.hasKey("selectedContentType")) {
    settings.selectedContentType = getSelectedContentType(
      options.getString("selectedContentType")
    )
  }

  if (options.hasKey("showCheckeredBackground")) {
    settings.showCheckeredBackground = options.getBoolean("showCheckeredBackground")
  }

  if (options.hasKey("showSuggestionsBar")) {
    settings.showSuggestionsBar = options.getBoolean("showSuggestionsBar")
  }
  if (options.hasKey("useBlurredBackground")) {
    settings.useBlurredBackground = options.getBoolean("useBlurredBackground")
  }

  return settings
}
