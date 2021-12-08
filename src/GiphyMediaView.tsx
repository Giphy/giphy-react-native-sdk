import React from 'react'
import { findNodeHandle } from 'react-native'

import { runViewManagerCommand } from './utils/viewManager'
import {
  NativeGiphyMediaView,
  NativeGiphyMediaViewProps,
  NativeGiphyMediaViewCommands,
  COMPONENT_NAME,
} from './native/GiphyMediaView'

export type GiphyMediaViewProps = NativeGiphyMediaViewProps

export class GiphyMediaView extends React.Component<GiphyMediaViewProps, {}> {
  private view: React.Component | null = null

  pause = () => {
    runViewManagerCommand({
      command: NativeGiphyMediaViewCommands.Pause,
      moduleName: COMPONENT_NAME,
      nodeHandle: findNodeHandle(this.view),
    })
  }

  resume = () => {
    runViewManagerCommand({
      command: NativeGiphyMediaViewCommands.Resume,
      moduleName: COMPONENT_NAME,
      nodeHandle: findNodeHandle(this.view),
    })
  }

  private viewRef = (component: React.Component | null) => {
    this.view = component
  }

  render() {
    return <NativeGiphyMediaView {...this.props} ref={this.viewRef} />
  }
}
