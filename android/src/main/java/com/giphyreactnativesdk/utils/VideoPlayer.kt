package com.giphyreactnativesdk.utils

import com.giphy.sdk.ui.views.GPHVideoPlayerView
import com.giphyreactnativesdk.videoplayeradapter.AbstractFakeVideoPlayerAdapter
import com.giphyreactnativesdk.videoplayeradapter.VideoPlayerAdapterImpl
import kotlin.reflect.full.isSubclassOf

fun getVideoPlayerFactory(): ((GPHVideoPlayerView?, Boolean, Boolean) -> VideoPlayerAdapterImpl)? {
  if (VideoPlayerAdapterImpl::class.isSubclassOf(AbstractFakeVideoPlayerAdapter::class)) {
    return null
  }

  return { playerView: GPHVideoPlayerView?, repeatable: Boolean, showCaptions: Boolean ->
    VideoPlayerAdapterImpl(playerView, repeatable, showCaptions)
  }
}
