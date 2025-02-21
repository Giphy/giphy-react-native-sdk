package com.giphyreactnativesdk.events

import com.facebook.react.bridge.Arguments
import com.facebook.react.bridge.WritableMap
import com.facebook.react.uimanager.events.Event
import com.giphy.sdk.core.models.Media
import com.giphy.sdk.core.models.enums.RenditionType
import com.giphyreactnativesdk.dto.RTNGiphyMedia

class OnGridMediaSelectEvent
constructor(
  surfaceId: Int,
  viewId: Int,
  private val media: Media,
  private val renditionType: RenditionType
) :
  Event<OnGridMediaSelectEvent>(surfaceId, viewId) {

  override fun getEventName() = EVENT_NAME

  override fun canCoalesce(): Boolean = false

  override fun getCoalescingKey(): Short = 0

  override fun getEventData(): WritableMap? {
    val event = Arguments.createMap()
    event.putString("media", RTNGiphyMedia.toJson(media, renditionType).toString())
    return event
  }

  companion object {
    const val EVENT_NAME = "topMediaSelect"
  }
}
