package com.giphyreactnativesdk.dto

import com.facebook.react.bridge.WritableMap
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.MediaType
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.utils.GifUtils
import com.giphy.sdk.ui.utils.aspectRatio
import com.giphyreactnativesdk.utils.jsonObjectToRNMap
import com.google.gson.Gson
import com.google.gson.JsonElement


object RTNGiphyMedia {
  private fun getGifURL(media: Media, renditionType: RenditionType?): String? {
    val rendition = renditionType ?: RenditionType.downsized
    return GifUtils.getImageDataForType(media, rendition)?.gifUrl
  }

  fun toRNValue(media: Media, renditionType: RenditionType?): WritableMap {
    return jsonObjectToRNMap(toJson(media, renditionType))
  }

  fun toJson(media: Media, renditionType: RenditionType?): JsonElement {
    val gson = Gson()
    val output = HashMap<String, Any>()

    output["id"] = media.id
    output["url"] = getGifURL(media, renditionType) ?: ""
    output["aspectRatio"] = media.aspectRatio.toDouble()
    output["isVideo"] = media.type == MediaType.video
    output["isDynamic"] = media.isDynamic
    output["data"] = media

    return gson.toJsonTree(output)
  }
}
