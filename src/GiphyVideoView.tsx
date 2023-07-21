import React from 'react'
import type { DirectEventHandler } from 'react-native/Libraries/Types/CodegenTypes'
import { AppState, type AppStateStatus, type ViewProps } from 'react-native'

import type { GiphyMediaID } from './dto/giphyMedia'
import { GiphyVideoManager } from './GiphyVideoManager'
import { noop } from './utils/noop'
import NativeGiphyVideoView, {
  type GiphyVideoViewErrorEvent,
  type GiphyVideoViewMuteEvent,
  type GiphyVideoViewPlaybackStateEvent,
  type GiphyVideoViewUnmuteEvent,
} from './specs/GiphyVideoViewNativeComponent'

export type GiphyVideoViewProps = ViewProps & {
  autoPlay?: boolean
  media?: GiphyMediaID
  muted?: boolean
  onError?: DirectEventHandler<GiphyVideoViewErrorEvent>
  onMute?: DirectEventHandler<GiphyVideoViewMuteEvent>
  onPlaybackStateChanged?: DirectEventHandler<GiphyVideoViewPlaybackStateEvent>
  onUnmute?: DirectEventHandler<GiphyVideoViewUnmuteEvent>
}

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
    const {
      autoPlay = false,
      media,
      muted = false,
      onError = noop,
      onMute = noop,
      onPlaybackStateChanged = noop,
      onUnmute = noop,
      ...other
    } = this.props

    return (
      <NativeGiphyVideoView
        autoPlay={autoPlay}
        mediaId={media?.id}
        muted={muted}
        onError={onError}
        onMute={onMute}
        onPlaybackStateChanged={onPlaybackStateChanged}
        onUnmute={onUnmute}
        {...other}
      />
    )
  }
}
