/**
 * Source: https://github.com/facebook/react-native/blob/529c9524995e62184777046497f36437c59d7a7d/packages/react-native/ReactAndroid/src/main/java/com/facebook/react/bridge/JSONArguments.java
 */
package com.giphyreactnativesdk.utils

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.ReadableArray
import com.facebook.react.bridge.ReadableMap
import org.json.JSONArray
import org.json.JSONException
import org.json.JSONObject

object JsonArguments {
  /**
   * Parse JSONObject to ReadableMap
   *
   * @param obj The JSONObject to be parsed
   * @return readableMap from the JSONObject
   */
  @Throws(JSONException::class)
  fun fromJSONObject(obj: JSONObject): ReadableMap? {
    val result = Arguments.createMap()
    val keys = obj.keys()
    while (keys.hasNext()) {
      val key = keys.next()
      val `val` = obj[key]
      if (`val` is JSONObject) {
        result.putMap(key, fromJSONObject(`val`))
      } else if (`val` is JSONArray) {
        result.putArray(key, fromJSONArray(`val`))
      } else if (`val` is String) {
        result.putString(key, `val`)
      } else if (`val` is Boolean) {
        result.putBoolean(key, `val`)
      } else if (`val` is Int) {
        result.putInt(key, `val`)
      } else if (`val` is Double) {
        result.putDouble(key, `val`)
      } else if (`val` is Long) {
        result.putInt(key, `val`.toInt())
      } else if (obj.isNull(key)) {
        result.putNull(key)
      } else {
        // Unknown value type. Will throw
        throw JSONException("Unexpected value when parsing JSON object. key: $key")
      }
    }
    return result
  }

  /**
   * Parse String of JSON object to ReadableMap
   *
   * @param objStr The String JSON object to be parsed
   * @return readableMap from the JSONArray
   */
  @Throws(JSONException::class)
  fun fromJSONObjectString(objStr: String?): ReadableMap? {
    return fromJSONObject(JSONObject(objStr))
  }

  /**
   * Parse JSONArray to ReadableArray
   *
   * @param arr The JSONArray to be parsed
   * @return readableArray from the JSONArray
   */
  @Throws(JSONException::class)
  fun fromJSONArray(arr: JSONArray): ReadableArray? {
    val result = Arguments.createArray()
    for (i in 0 until arr.length()) {
      val `val` = arr[i]
      if (`val` is JSONObject) {
        result.pushMap(fromJSONObject(`val`))
      } else if (`val` is JSONArray) {
        result.pushArray(fromJSONArray(`val`))
      } else if (`val` is String) {
        result.pushString(`val`)
      } else if (`val` is Boolean) {
        result.pushBoolean(`val`)
      } else if (`val` is Int) {
        result.pushInt(`val`)
      } else if (`val` is Double) {
        result.pushDouble(`val`)
      } else if (`val` is Long) {
        result.pushInt(`val`.toInt())
      } else if (arr.isNull(i)) {
        result.pushNull()
      } else {
        // Unknown value type. Will throw
        throw JSONException("Unexpected value when parsing JSON array. index: $i")
      }
    }
    return result
  }

  /**
   * Parse String of JSON array to ReadableArray
   *
   * @param arrStr The String JSON array to be parsed
   * @return readableArray from the JSONArray
   */
  @Throws(JSONException::class)
  fun fromJSONArrayString(arrStr: String?): ReadableArray? {
    return fromJSONArray(JSONArray(arrStr))
  }
}
