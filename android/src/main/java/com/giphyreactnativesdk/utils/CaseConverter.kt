package com.giphyreactnativesdk.utils

import java.util.Locale

object CaseConverter {
  fun capitalize(value: String): String {
    return value.replaceFirstChar {
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
}



