import React from 'react'

import { NativeGiphyMediaView } from './native/GiphyMediaView'

export type GiphyMediaViewProps = any
export class GiphyMediaView extends React.Component<GiphyMediaViewProps, {}> {
  render() {
    return <NativeGiphyMediaView {...this.props} />
  }
}
