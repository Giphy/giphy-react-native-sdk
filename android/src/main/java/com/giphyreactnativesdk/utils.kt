package com.giphyreactnativesdk

import kotlin.reflect.KProperty1

@Suppress("UNCHECKED_CAST")
fun <R> readInstanceProperty(instance: Any, propertyName: String): R {
  val property = instance::class.members
    // don't cast here to <Any, R>, it would succeed silently
    .first { it.name == propertyName } as KProperty1<Any, *>
  // force a invalid cast exception if incorrect type here
  return property.get(instance) as R
}
