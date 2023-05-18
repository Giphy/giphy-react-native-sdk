import React from 'react'
import type { NativeSyntheticEvent } from 'react-native'

import { deserializeGiphyMedia, type GiphyMedia } from './dto/giphyMedia'
import { GiphyThemePreset } from './dto/giphyThemePreset'
import { NativeGiphyGridView, type NativeGiphyGridViewProps } from './native/GiphyGridView'
import { type GiphyTheme, serializeTheme } from './dto/giphyTheme'

export type GiphyGridViewProps = Omit<NativeGiphyGridViewProps, 'theme'> & {
  theme?: GiphyTheme | GiphyThemePreset
}

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
    const { onMediaSelect, theme = GiphyThemePreset.Light, ...other } = this.props
    return (
      <NativeGiphyGridView
        onMediaSelect={onMediaSelect ? this.mediaSelectHandler : undefined}
        theme={serializeTheme(theme)}
        {...other}
      />
    )
  }
}
