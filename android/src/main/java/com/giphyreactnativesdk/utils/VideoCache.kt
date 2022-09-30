package com.giphyreactnativesdk.utils

import android.content.Context
import com.giphyreactnativesdk.videoplayeradapter.VideoCache
import com.giphyreactnativesdk.videoplayeradapter.VideoCacheImpl

fun initializeVideoCache(context: Context, maxBytes: Long): VideoCacheImpl? {
  @Suppress("USELESS_IS_CHECK")
  if (maxBytes > 0 && VideoCacheImpl is VideoCache) {
    VideoCacheImpl.initialize(context, maxBytes)
    return VideoCacheImpl
  }

  return null
}
