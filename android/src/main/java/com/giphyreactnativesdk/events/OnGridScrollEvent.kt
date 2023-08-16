package com.giphyreactnativesdk.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

class OnGridScrollEvent
constructor(
  surfaceId: Int,
  viewId: Int,
  private val offset: Double
) :
  Event<OnGridScrollEvent>(surfaceId, viewId) {

  override fun getEventName() = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap? {
    val event = Arguments.createMap()
    event.putDouble("offset", offset)
    return event
  }

  companion object {
    const val EVENT_NAME = "topGridScroll"
  }
}
