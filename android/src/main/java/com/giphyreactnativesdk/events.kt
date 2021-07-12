package com.giphyreactnativesdk

import com.facebook.react.bridge.ReactContext
import com.facebook.react.bridge.WritableMap
import com.facebook.react.modules.core.DeviceEventManagerModule.RCTDeviceEventEmitter


enum class GiphyDialogEvents (val rnEvent: String) {
  MediaSelected("onMediaSelect"),
  Dismissed("onDismiss")
}

fun emitModuleEvent(reactContext: ReactContext, eventName: String, params: WritableMap?){
  reactContext
    .getJSModule(RCTDeviceEventEmitter::class.java)
    .emit(eventName, params)
}

