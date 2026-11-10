import React from 'react'
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes'
import { AppState, type AppStateStatus, type NativeEventSubscription, type ViewProps } from 'react-native'

import type { GiphyMediaID } from './dto/giphyMedia'
import { GiphyVideoManager } from './GiphyVideoManager'
import NativeGiphyVideoView, {
  type GiphyVideoViewErrorEvent,
  type GiphyVideoViewMuteEvent,
  type GiphyVideoViewPlaybackStateChangeEvent,
  type GiphyVideoViewUnmuteEvent,
} from './specs/GiphyVideoViewNativeComponent'

export interface GiphyVideoViewProps extends ViewProps {
  autoPlay?: boolean
  media?: GiphyMediaID
  muted?: boolean
  onError?: DirectEventHandler<GiphyVideoViewErrorEvent>
  onMute?: DirectEventHandler<GiphyVideoViewMuteEvent>
  onPlaybackStateChanged?: DirectEventHandler<GiphyVideoViewPlaybackStateChangeEvent>
  onUnmute?: DirectEventHandler<GiphyVideoViewUnmuteEvent>
}

const BACKGROUND_STATE_REGEX = /inactive|background/

let mountedComponentsCount = 0
let appStateSubscription: NativeEventSubscription | null = null
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
  appStateSubscription = AppState.addEventListener('change', appStateListener)
}

function removeAppStateListener() {
  appStateSubscription?.remove()
  appStateSubscription = null
}

function registerComponent() {
  mountedComponentsCount += 1
  if (!appStateSubscription) {
    addAppStateListener()
  }
}

function unregisterComponent() {
  mountedComponentsCount = Math.max(0, mountedComponentsCount - 1)
  if (mountedComponentsCount === 0 && appStateSubscription) {
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
    const { autoPlay = false, media, muted = false, ...other } = this.props

    return <NativeGiphyVideoView autoPlay={autoPlay} mediaId={media?.id} muted={muted} {...other} />
  }
}
