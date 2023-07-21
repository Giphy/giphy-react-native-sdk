import React from 'react'
import { type GiphyMedia, GiphyMediaView, GiphyVideoView } from '@giphy/react-native-sdk'
import { Button, Image } from 'react-native'

type MediaViewSampleProps = {
  media: GiphyMedia
}

export function MediaViewSample(props: MediaViewSampleProps) {
  const { media } = props
  const [playing, setPlaying] = React.useState(false)
  const [resizeMode, setResizeMode] = React.useState('stretch')
  const ref = React.useRef<GiphyMediaView>(null)

  if (media.isVideo) {
    return (
      <GiphyVideoView
        autoPlay={true}
        media={media}
        muted={true}
        style={{ aspectRatio: media.aspectRatio }}
        testID={`gph-video-view-${media.id}`}
        onMute={(e) => console.log('Mute', e.target)}
        onUnmute={(e) => console.log('Unmute', e.target)}
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
    <>
      <Button
        title={'Play/Pause'}
        onPress={() => {
          setPlaying((v) => !v)
          if (playing) {
            ref.current?.pause()
          } else {
            ref.current?.resume()
          }
        }}
      />
      <Button
        title={'Resize Mode'}
        onPress={() => {
          setResizeMode((v) => (v === 'stretch' ? 'center' : 'stretch'))
        }}
      />
      <GiphyMediaView
        autoPlay={false}
        ref={ref}
        media={media}
        resizeMode={resizeMode as any}
        style={{ aspectRatio: media.aspectRatio }}
        testID={`gph-media-view-${media.id}`}
      />
    </>
  )
}
