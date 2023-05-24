package com.giphyreactnativesdk.dto

enum class RNResizeMode {
  CENTER,
  CONTAIN,
  COVER,
  STRETCH;

  companion object {
    val DEFAULT_MODE = COVER

    fun fromRNValue(rnValue: String?): RNResizeMode? {
      return when (rnValue) {
        "center" -> CENTER
        "contain" -> CONTAIN
        "cover" -> COVER
        "stretch" -> STRETCH
        else -> null
      }
    }
  }
}
