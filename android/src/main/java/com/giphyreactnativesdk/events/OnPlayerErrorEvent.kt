package com.giphyreactnativesdk.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnPlayerErrorEvent
constructor(surfaceId: Int, viewId: Int, private val description: String) :
  Event<OnPlayerErrorEvent>(surfaceId, viewId) {

  override fun getEventName() = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap? {
    val event = Arguments.createMap()
    event.putString("description", description)
    return event
  }

  companion object {
    const val EVENT_NAME = "topError"
  }
}
