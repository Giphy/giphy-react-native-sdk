import React from 'react'
import type { StyleProp, ViewStyle } from 'react-native'

import { NativeGiphyMediaView, NativeGiphyMediaViewProps } from './native/GiphyMediaView'

export type GiphyMediaViewProps = NativeGiphyMediaViewProps & { style?: StyleProp<ViewStyle> }

export class GiphyMediaView extends React.Component<GiphyMediaViewProps, {}> {
  render() {
    return <NativeGiphyMediaView {...this.props} />
  }
}
