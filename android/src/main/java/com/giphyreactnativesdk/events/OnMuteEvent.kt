package com.giphyreactnativesdk.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnMuteEvent
constructor(surfaceId: Int, viewId: Int) :
  Event<OnMuteEvent>(surfaceId, viewId) {

  override fun getEventName(): String = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap? {
    return Arguments.createMap()
  }

  companion object {
    const val EVENT_NAME = "topMuteEvent"
  }
}
