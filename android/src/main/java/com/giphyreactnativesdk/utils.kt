package com.giphyreactnativesdk

import com.giphy.sdk.core.models.Image
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphy.sdk.ui.GPHSettings
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
  val image = readInstanceProperty<Image>(media.images, rendition.name)
  return image.gifUrl
}
