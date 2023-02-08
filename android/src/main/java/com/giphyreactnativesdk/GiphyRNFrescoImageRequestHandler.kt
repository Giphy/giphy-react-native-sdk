package com.giphyreactnativesdk

import android.net.Uri
import com.facebook.imagepipeline.request.ImageRequest
import com.facebook.imagepipeline.request.ImageRequestBuilder
import com.facebook.react.bridge.JavaOnlyMap
import com.facebook.react.bridge.ReadableMap
import com.facebook.react.modules.fresco.ReactNetworkImageRequest
import com.giphy.sdk.ui.GiphyFrescoImageRequestHandler

private fun headersToRNMap(headers: Map<String, String>): ReadableMap {
  val rv = JavaOnlyMap()
  headers.entries.forEach { rv.putString(it.key, it.value) }
  return rv
}

class GiphyRNFrescoImageRequestHandler : GiphyFrescoImageRequestHandler {
  override fun getRequest(
    source: Uri,
    headers: Map<String, String>,
    cacheChoice: ImageRequest.CacheChoice
  ): ImageRequest {
    val requestBuilder =
      ImageRequestBuilder.newBuilderWithSource(source).setCacheChoice(cacheChoice)
    return ReactNetworkImageRequest.fromBuilderWithHeaders(
      requestBuilder,
      headersToRNMap(headers),
    )
  }
}
