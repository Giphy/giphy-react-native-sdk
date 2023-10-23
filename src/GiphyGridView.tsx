import React from 'react'
import type { NativeSyntheticEvent, ViewProps } from 'react-native'
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes'

import { deserializeGiphyMedia, type GiphyMedia } from './dto/giphyMedia'
import { type GiphyTheme, serializeTheme } from './dto/giphyTheme'
import type { GiphyClipsRendition, GiphyRendition } from './dto/giphyRendition'
import type { GiphyContentRequest } from './dto/giphyContentRequest'
import type { GiphyDirection } from './dto/misc'
import type { GiphyThemePreset } from './dto/giphyThemePreset'
import NativeGiphyGridView, {
  type GiphyGridViewContentUpdateEvent,
  type GiphyGridViewMediaScrollEvent,
} from './specs/GiphyGridViewNativeComponent'

export interface GiphyGridViewMediaSelectEvent {
  media: GiphyMedia
}

export interface GiphyGridViewProps extends ViewProps {
  cellPadding?: number
  clipsPreviewRenditionType?: GiphyClipsRendition
  content?: GiphyContentRequest
  disableEmojiVariations?: boolean
  fixedSizeCells?: boolean
  onContentUpdate?: DirectEventHandler<GiphyGridViewContentUpdateEvent>
  onMediaSelect?: DirectEventHandler<GiphyGridViewMediaSelectEvent>
  onScroll?: DirectEventHandler<GiphyGridViewMediaScrollEvent>
  orientation?: GiphyDirection
  renditionType?: GiphyRendition
  showCheckeredBackground?: boolean
  spanCount?: number
  theme?: GiphyTheme | GiphyThemePreset
}

export class GiphyGridView extends React.Component<GiphyGridViewProps, {}> {
  mediaSelectHandler = (e: any) => {
    const { onMediaSelect } = this.props
    if (!onMediaSelect) {
      return
    }

    const media = (JSON.parse(e.nativeEvent.media ?? '{}') || {}) as GiphyMedia
    e.nativeEvent.media = deserializeGiphyMedia(media)
    return onMediaSelect(e as NativeSyntheticEvent<GiphyGridViewMediaSelectEvent>)
  }

  render() {
    const {
      cellPadding = 0,
      clipsPreviewRenditionType = 'fixed_width',
      content,
      disableEmojiVariations = false,
      fixedSizeCells = false,
      onMediaSelect,
      orientation = 'vertical',
      renditionType = 'fixed_width',
      showCheckeredBackground = false,
      theme = 'light',
      ...other
    } = this.props

    return (
      <NativeGiphyGridView
        cellPadding={cellPadding}
        clipsPreviewRenditionType={clipsPreviewRenditionType}
        content={content ? JSON.stringify(content) : ''}
        disableEmojiVariations={disableEmojiVariations}
        fixedSizeCells={fixedSizeCells}
        onMediaSelect={onMediaSelect ? this.mediaSelectHandler : undefined}
        orientation={orientation}
        renditionType={renditionType}
        showCheckeredBackground={showCheckeredBackground}
        theme={JSON.stringify(serializeTheme(theme))}
        {...other}
      />
    )
  }
}
