import React from 'react'
import { GiphyMedia, GiphyMediaView, GiphyVideoView } from '@giphy/react-native-sdk'
import { Image } from 'react-native'

type MediaViewSampleProps = {
  media: GiphyMedia
}

export function MediaViewSample(props: MediaViewSampleProps) {
  const { media } = props

  if (media.isVideo) {
    return (
      <GiphyVideoView
        autoPlay={false}
        media={media}
        muted={true}
        style={{ aspectRatio: media.aspectRatio }}
        testID={`gph-video-view-${media.id}`}
        onError={(e) => console.error(e.nativeEvent.description)}
        onPlaybackStateChanged={(e) => console.log('onPlaybackStateChanged', JSON.stringify(e.nativeEvent, null, 2))}
      />
    )
  } else if (media.isDynamic) {
    return (
      <Image
        style={{ aspectRatio: media.aspectRatio }}
        source={{ uri: media.data.images.original.url }}
        testID={`gph-dynamic-text-view-${media.id}`}
      />
    )
  }

  return (
    <GiphyMediaView media={media} style={{ aspectRatio: media.aspectRatio }} testID={`gph-media-view-${media.id}`} />
  )
}
