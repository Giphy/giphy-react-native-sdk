package com.giphyreactnativesdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.MediaType
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.utils.GifUtils
import com.giphy.sdk.ui.utils.aspectRatio
import com.giphyreactnativesdk.utils.jsonObjectToRNMap
import com.google.gson.Gson

fun getGifURL(media: Media, renditionType: RenditionType?): String? {
  val rendition = renditionType ?: RenditionType.downsized
  return GifUtils.getImageDataForType(media, rendition)?.gifUrl
}

fun mediaToRNMap(media: Media, renditionType: RenditionType?): WritableMap {
  val gson = Gson()
  val mediaJson = gson.toJsonTree(media)
  val output = Arguments.createMap()

  output.putString("id", media.id)
  output.putString("url", getGifURL(media, renditionType))
  output.putDouble("aspectRatio", media.aspectRatio.toDouble())
  output.putBoolean("isVideo", media.type == MediaType.video)
  output.putBoolean("isDynamic", media.isDynamic)
  output.putMap("data", jsonObjectToRNMap(mediaJson))

  return output
}
