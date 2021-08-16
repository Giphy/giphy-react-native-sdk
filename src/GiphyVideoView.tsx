import React from 'react'

import deprecatedPropType from './utils/deprecatedPropType'
import { NativeGiphyVideoView, NativeGiphyVideoViewProps } from './native/GiphyVideoView'

export type GiphyVideoViewProps = NativeGiphyVideoViewProps

export class GiphyVideoView extends React.Component<GiphyVideoViewProps, {}> {
  static propTypes = {
    playing: deprecatedPropType({
      explanation: 'This property will be removed in v2, please use autoPlay instead',
    }),
  }

  render() {
    return <NativeGiphyVideoView {...this.props} />
  }
}
