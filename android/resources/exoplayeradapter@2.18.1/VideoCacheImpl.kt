package com.giphyreactnativesdk.videoplayeradapter

import android.content.Context
import com.google.android.exoplayer2.database.ExoDatabaseProvider
import com.google.android.exoplayer2.upstream.DefaultDataSourceFactory
import com.google.android.exoplayer2.upstream.cache.Cache
import com.google.android.exoplayer2.upstream.cache.CacheDataSource
import com.google.android.exoplayer2.upstream.cache.LeastRecentlyUsedCacheEvictor
import com.google.android.exoplayer2.upstream.cache.SimpleCache
import com.google.android.exoplayer2.util.Util
import java.io.File

object VideoCacheImpl : VideoCache {
  private lateinit var cache: Cache
  private lateinit var cacheDataSource: CacheDataSource
  lateinit var cacheDataSourceFactory: CacheDataSource.Factory

  override fun initialize(context: Context, maxBytes: Long) {
    if (this::cache.isInitialized) {
      return
    }
    val cacheFolder = File(context.filesDir, "gph-rn-sdk-video-cache")
    val cacheEvictor = LeastRecentlyUsedCacheEvictor(maxBytes)
    cache = SimpleCache(cacheFolder, cacheEvictor, ExoDatabaseProvider(context))

    cacheDataSourceFactory = CacheDataSource.Factory().apply {
      setCache(this@VideoCacheImpl.cache)
      setUpstreamDataSourceFactory(
        DefaultDataSourceFactory(
          context, Util.getUserAgent(
            context,
            "GiphySDK"
          )
        )
      )
    }

    cacheDataSource = cacheDataSourceFactory.createDataSource()
  }
}
