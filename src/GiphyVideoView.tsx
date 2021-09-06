import React from 'react'
import { AppState, AppStateStatus } from 'react-native'

import { NativeGiphyVideoView, NativeGiphyVideoViewProps } from './native/GiphyVideoView'
import { GiphyVideoManager } from './GiphyVideoManager'
import deprecatedPropType from './utils/deprecatedPropType'

export type GiphyVideoViewProps = NativeGiphyVideoViewProps

let mountedComponentsCount = 0
let appStateListenerAdded = false
let latestAppState: AppStateStatus = AppState.currentState

function appStateListener(appState: AppStateStatus) {
  if (latestAppState === 'active' && appState.match(/inactive|background/)) {
    GiphyVideoManager.muteAll()
  }
  latestAppState = appState
}

function addAppStateListener() {
  latestAppState = AppState.currentState
  AppState.addEventListener('change', appStateListener)
  appStateListenerAdded = true
}

function removeAppStateListener() {
  AppState.addEventListener('change', appStateListener)
  appStateListenerAdded = false
}

function registerComponent() {
  mountedComponentsCount += 1
  if (!appStateListenerAdded) {
    addAppStateListener()
  }
}

function unregisterComponent() {
  mountedComponentsCount = Math.max(0, mountedComponentsCount - 1)
  if (mountedComponentsCount === 0 && appStateListenerAdded) {
    removeAppStateListener()
  }
}

export class GiphyVideoView extends React.Component<GiphyVideoViewProps, {}> {
  static propTypes = {
    playing: deprecatedPropType({
      explanation: 'This property will be removed in v2, please use autoPlay instead',
    }),
  }

  componentDidMount() {
    registerComponent()
  }

  componentWillUnmount() {
    unregisterComponent()
  }

  render() {
    return <NativeGiphyVideoView {...this.props} />
  }
}
