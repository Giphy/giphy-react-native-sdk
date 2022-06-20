package com.giphyreactnativesdk

enum class ResizeMode {
  CENTER,
  CONTAIN,
  COVER,
  STRETCH;

  companion object {
    val DEFAULT_MODE = COVER

    fun fromRNValue(rnValue: String?): ResizeMode? {
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
