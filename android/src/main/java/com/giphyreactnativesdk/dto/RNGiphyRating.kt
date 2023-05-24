package com.giphyreactnativesdk.dto

import com.giphy.sdk.core.models.enums.RatingType

object RNGiphyRating {
  fun fromRNValue(ratingName: String?): RatingType? {
    return when (ratingName) {
      null -> null
      else -> RatingType.values().firstOrNull {
        it.name == ratingName
          .replace("-", "")
          .lowercase()
      }
    }
  }
}


