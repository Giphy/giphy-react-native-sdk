package com.giphyreactnativesdk.dto

import com.giphy.sdk.ui.GPHContentType

object RNGiphyContentType {
  fun fromRNValue(contentType: String?): GPHContentType {
    return when (contentType) {
      null -> GPHContentType.gif
      else -> GPHContentType.values().firstOrNull { it.name == contentType.lowercase() }
        ?: GPHContentType.gif
    }
  }
}
