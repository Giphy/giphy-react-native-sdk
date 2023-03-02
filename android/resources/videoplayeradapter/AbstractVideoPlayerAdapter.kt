package com.giphyreactnativesdk.videoplayeradapter

import com.giphy.sdk.ui.utils.GPHAbstractVideoPlayer
import com.giphy.sdk.ui.views.GPHVideoPlayerView

abstract class AbstractVideoPlayerAdapter(
  playerView: GPHVideoPlayerView?,
  repeatable: Boolean,
  showCaptions: Boolean
) : GPHAbstractVideoPlayer(playerView, repeatable, showCaptions) {
  abstract fun runInPlayerApplicationLooper(runnable: Runnable)
}

