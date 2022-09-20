package com.giphyreactnativesdk.exoplayeradapter

import android.content.Context
import com.google.android.exoplayer2.upstream.cache.CacheDataSource

object VideoCache {
  lateinit var cacheDataSourceFactory: CacheDataSource.Factory

  fun initialize(context: Context, maxBytes: Long = (100 * 1024 * 1024).toLong()) {
  }
}
