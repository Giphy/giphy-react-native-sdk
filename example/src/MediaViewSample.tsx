import React from 'react'
import { Image } from 'react-native'
import { type GiphyMedia, GiphyMediaView, GiphyVideoView } from '@giphy/react-native-sdk'

type MediaViewSampleProps = {
  media: GiphyMedia
}

export function MediaViewSample(props: MediaViewSampleProps) {
  const { media } = props

  if (media.isVideo) {
    return (
      <GiphyVideoView
        autoPlay={true}
        media={media}
        muted={true}
        style={{ aspectRatio: media.aspectRatio }}
        testID={`gph-video-view-${media.id}`}
        onMute={(e) => console.log('Mute', e.nativeEvent)}
        onUnmute={(e) => console.log('Unmute', e.nativeEvent)}
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
