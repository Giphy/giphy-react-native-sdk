import React from 'react'

import { NativeGiphyGridView, NativeGiphyGridViewProps } from './native/GiphyGridView'

export type GiphyGridViewProps = NativeGiphyGridViewProps

export class GiphyGridView extends React.Component<GiphyGridViewProps, {}> {
  render() {
    return <NativeGiphyGridView {...this.props} />
  }
}
