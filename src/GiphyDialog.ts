import { EmitterSubscription, NativeEventEmitter } from 'react-native'

import { makeGiphyMedia } from './giphyMedia'
import { noop } from './utils/noop'
import { GiphyVideoManager } from './GiphyVideoManager'
import {
  AndroidGiphyDialogConfig,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  IOSGiphyDialogConfig,
  NativeGiphyDialog,
} from './native/GiphyDialog'

export type GiphyDialogConfig = IOSGiphyDialogConfig & AndroidGiphyDialogConfig

function wrapMediaSelectedListener(listener: (...args: any[]) => any): GiphyDialogMediaSelectEventHandler {
  return (e) => {
    e.media = makeGiphyMedia(e.media)
    return listener(e)
  }
}

export const GiphyDialog = new (class extends NativeEventEmitter {
  constructor() {
    super(NativeGiphyDialog)
    // listener stubs
    this.addListener(GiphyDialogEvent.MediaSelected, noop)
    this.addListener(GiphyDialogEvent.Dismissed, noop)
  }

  addListener(eventType: string, listener: (...args: any[]) => any, ...rest: any[]): EmitterSubscription {
    if (eventType !== GiphyDialogEvent.MediaSelected) {
      return super.addListener(eventType, listener, ...rest)
    }

    return super.addListener(eventType, wrapMediaSelectedListener(listener), ...rest)
  }

  configure(config: GiphyDialogConfig) {
    NativeGiphyDialog.configure(config)
  }

  show() {
    GiphyVideoManager.pauseAll()
    NativeGiphyDialog.show()
  }

  hide() {
    NativeGiphyDialog.hide()
  }
})()
