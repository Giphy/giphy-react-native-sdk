package com.giphyreactnativesdk.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnGridContentUpdateEvent
constructor(
  surfaceId: Int,
  viewId: Int,
  private val resultCount: Int,
) :
  Event<OnGridContentUpdateEvent>(surfaceId, viewId) {

  override fun getEventName() = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap? {
    val event = Arguments.createMap()
    event.putInt("resultCount", resultCount)
    return event
  }

  companion object {
    const val EVENT_NAME = "topContentUpdate"
  }
}
