package com.giphyreactnativesdk

import com.giphy.sdk.ui.views.GPHVideoPlayer

object SharedVideoPlayer {
  val player: GPHVideoPlayer by lazy {
    GPHVideoPlayer(null, repeatable = true)
  }
}
