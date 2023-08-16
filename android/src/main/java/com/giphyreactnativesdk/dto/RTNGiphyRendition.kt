package com.giphyreactnativesdk.dto

import com.giphy.sdk.core.models.enums.RenditionType
import com.giphyreactnativesdk.utils.CaseConverter

object RTNGiphyRendition {
  fun fromRNValue(renditionName: String?): RenditionType? {
    return when (renditionName) {
      null -> null
      else -> RenditionType.values()
        .firstOrNull { it.name == CaseConverter.snakeToCamel(renditionName) }
    }
  }
}
