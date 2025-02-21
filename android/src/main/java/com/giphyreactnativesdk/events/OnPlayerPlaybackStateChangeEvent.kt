package com.giphyreactnativesdk.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event

enum class RTNGiphyVideoPlaybackState(val code: Int) {
  Unknown(0),
  ReadyToPlay(3),
  Playing(4),
  Paused(5),
}

class OnPlayerPlaybackStateChangeEvent
constructor(surfaceId: Int, viewId: Int, private val state: RTNGiphyVideoPlaybackState) :
  Event<OnPlayerPlaybackStateChangeEvent>(surfaceId, viewId) {

  override fun getEventName() = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap? {
    val event = Arguments.createMap()
    event.putInt("state", state.code)
    return event
  }

  companion object {
    const val EVENT_NAME = "topPlaybackStateChange"
  }
}
