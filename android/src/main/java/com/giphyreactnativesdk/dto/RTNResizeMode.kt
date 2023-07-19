package com.giphyreactnativesdk.dto

enum class RTNResizeMode {
  CENTER,
  CONTAIN,
  COVER,
  STRETCH;

  companion object {
    val DEFAULT_MODE = COVER

    fun fromRNValue(rnValue: String?): RTNResizeMode? {
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
