package com.giphyreactnativesdk

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.giphy.sdk.core.models.Image
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.MediaType
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.utils.aspectRatio
import com.giphyreactnativesdk.utils.jsonObjectToRNMap
import com.google.gson.Gson
import kotlin.reflect.KProperty1

@Suppress("UNCHECKED_CAST")
fun <R> readInstanceProperty(instance: Any, propertyName: String): R {
  val property = instance::class.members
    // don't cast here to <Any, R>, it would succeed silently
    .first { it.name == propertyName } as KProperty1<Any, *>
  // force a invalid cast exception if incorrect type here
  return property.get(instance) as R
}

fun getGifURL(media: Media, renditionType: RenditionType?): String? {
  val rendition = renditionType ?: RenditionType.downsized
  val image = readInstanceProperty<Image>(media.images, rendition.name) ?:
                readInstanceProperty<Image>(media.images, RenditionType.original.name)
  return image?.gifUrl
}

fun mediaToRNMap(media: Media, renditionType: RenditionType?): WritableMap {
  val gson = Gson()
  val mediaJson = gson.toJsonTree(media)
  val output = Arguments.createMap()

  output.putString("id", media.id)
  output.putString("url", getGifURL(media, renditionType))
  output.putDouble("aspectRatio", media.aspectRatio.toDouble())
  output.putBoolean("isVideo", media.type == MediaType.video)
  output.putMap("data", jsonObjectToRNMap(mediaJson))

  return output
}
