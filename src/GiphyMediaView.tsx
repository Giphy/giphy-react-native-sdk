import React from 'react'
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes'

import NativeGiphyMediaView, { Commands } from './specs/GiphyMediaViewNativeComponent'
import type { GiphyMediaID } from './dto/giphyMedia'
import type { GiphyRendition } from './dto/giphyRendition'
import type { ResizeMode } from './dto/misc'

export interface GiphyMediaViewProps extends ViewProps {
  autoPlay?: boolean
  media?: GiphyMediaID
  renditionType?: GiphyRendition
  resizeMode?: ResizeMode
  showCheckeredBackground?: boolean
}

type ComponentRef = InstanceType<typeof NativeGiphyMediaView>

export class GiphyMediaView extends React.Component<GiphyMediaViewProps, {}> {
  ref = React.createRef<ComponentRef>()

  pause = () => {
    if (this.ref.current) {
      Commands.pause(this.ref.current)
    }
  }

  resume = () => {
    if (this.ref.current) {
      Commands.resume(this.ref.current)
    }
  }

  render() {
    const {
      autoPlay = true,
      renditionType = 'fixed_width',
      media,
      showCheckeredBackground = false,
      resizeMode = 'cover',
      ...other
    } = this.props

    return (
      <NativeGiphyMediaView
        ref={this.ref}
        autoPlay={autoPlay}
        mediaId={media?.id}
        renditionType={renditionType}
        resizeMode={resizeMode}
        showCheckeredBackground={showCheckeredBackground}
        {...other}
      />
    )
  }
}
