import React from 'react';
import type { ViewStyle } from 'react-native';

import { NativeGiphyMediaView, NativeGiphyMediaViewProps } from './native/GiphyMediaView';

export type GiphyMediaViewProps = NativeGiphyMediaViewProps & { style?: ViewStyle };

export class GiphyMediaView extends React.Component<GiphyMediaViewProps, {}> {
  render() {
    return <NativeGiphyMediaView {...this.props} />;
  }
}
