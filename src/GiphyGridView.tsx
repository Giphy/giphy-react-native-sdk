import React from 'react'
import type { NativeSyntheticEvent } from 'react-native'

import { deserializeGiphyMedia, type GiphyMedia } from './dto/giphyMedia'
import { NativeGiphyGridView, type NativeGiphyGridViewProps } from './native/GiphyGridView'

export type GiphyGridViewProps = NativeGiphyGridViewProps

export class GiphyGridView extends React.Component<GiphyGridViewProps, {}> {
  mediaSelectHandler = (e: NativeSyntheticEvent<{ media: GiphyMedia }>) => {
    const { onMediaSelect } = this.props
    if (!onMediaSelect) {
      return
    }

    e.nativeEvent.media = deserializeGiphyMedia(e.nativeEvent.media)
    return onMediaSelect(e)
  }

  render() {
    const { onMediaSelect, ...other } = this.props
    return <NativeGiphyGridView onMediaSelect={onMediaSelect ? this.mediaSelectHandler : undefined} {...other} />
  }
}
