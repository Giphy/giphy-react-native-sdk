import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import { NativeGiphyGridView, NativeGiphyGridViewProps } from './native/GiphyGridView'

export type GiphyGridViewProps = NativeGiphyGridViewProps & { style?: StyleProp<ViewStyle> }

export class GiphyGridView extends React.Component<GiphyGridViewProps, {}> {
  render() {
    return <NativeGiphyGridView {...this.props} />
  }
}
