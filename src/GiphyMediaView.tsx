import React from 'react'

import { NativeGiphyMediaView, NativeGiphyMediaViewProps } from './native/GiphyMediaView'

export type GiphyMediaViewProps = NativeGiphyMediaViewProps

export class GiphyMediaView extends React.Component<GiphyMediaViewProps, {}> {
  render() {
    return <NativeGiphyMediaView {...this.props} />
  }
}
