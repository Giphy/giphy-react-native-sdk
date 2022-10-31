import React from 'react'
import { AppState, AppStateStatus } from 'react-native'

import { NativeGiphyVideoView, NativeGiphyVideoViewProps } from './native/GiphyVideoView'
import { GiphyVideoManager } from './GiphyVideoManager'

export type GiphyVideoViewProps = NativeGiphyVideoViewProps

const BACKGROUND_STATE_REGEX = /inactive|background/

let mountedComponentsCount = 0
let appStateListenerAdded = false
let latestAppState: AppStateStatus = AppState.currentState

function appStateListener(appState: AppStateStatus) {
  if (latestAppState === 'active' && appState.match(BACKGROUND_STATE_REGEX)) {
    GiphyVideoManager.pauseAll()
  } else if (appState === 'active' && latestAppState.match(BACKGROUND_STATE_REGEX)) {
    GiphyVideoManager.resume()
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
