package com.giphyreactnativesdk.utils

import com.facebook.react.bridge.*
import com.google.gson.JsonElement

fun jsonObjectToRNMap(json: JsonElement): WritableMap {
  val output: WritableMap = WritableNativeMap()
  if (!json.isJsonObject) {
    return output
  }

  val entries = json.asJsonObject.entrySet()
  for ((key, el) in entries) {
    when {
      el.isJsonObject -> output.putMap(key, jsonObjectToRNMap(el))
      el.isJsonArray -> output.putArray(key, jsonArrayToRNArray(el))
      el.isJsonNull -> output.putNull(key)
      el.isJsonPrimitive -> {
        val primitive = el.asJsonPrimitive
        when {
          primitive.isBoolean -> output.putBoolean(key, primitive.asBoolean)
          primitive.isNumber -> output.putDouble(key, primitive.asDouble)
          primitive.isString -> output.putString(key, primitive.asString)
          else -> output.putString(key, primitive.asString)
        }
      }
      else -> output.putString(key, el.asString)
    }
  }

  return output
}

fun jsonArrayToRNArray(json: JsonElement): WritableArray {
  val output: WritableArray = WritableNativeArray()
  if (!json.isJsonArray) {
    return output
  }

  for (el in json.asJsonArray) {
    when {
      el.isJsonObject -> output.pushMap(jsonObjectToRNMap(el))
      el.isJsonArray -> output.pushArray(jsonArrayToRNArray(el))
      el.isJsonNull -> output.pushNull()
      el.isJsonPrimitive -> {
        val primitive = el.asJsonPrimitive
        when {
          primitive.isBoolean -> output.pushBoolean(primitive.asBoolean)
          primitive.isNumber -> output.pushDouble(primitive.asDouble)
          primitive.isString -> output.pushString(primitive.asString)
          else -> output.pushString(primitive.asString)
        }
      }
      else -> output.pushString(el.asString)
    }
  }

  return output
}

