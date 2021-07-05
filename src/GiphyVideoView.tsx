import React from 'react'

import { NativeGiphyVideoView, NativeGiphyVideoViewProps } from './native/GiphyVideoView'

export type GiphyVideoViewProps = NativeGiphyVideoViewProps

export class GiphyVideoView extends React.Component<GiphyVideoViewProps, {}> {
  render() {
    return <NativeGiphyVideoView {...this.props} />
  }
}
