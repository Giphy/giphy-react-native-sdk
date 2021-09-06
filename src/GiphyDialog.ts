import { NativeEventEmitter } from 'react-native'

import { GiphyVideoManager } from './GiphyVideoManager'
import { NativeGiphyDialog, IOSGiphyDialogConfig, AndroidGiphyDialogConfig } from './native/GiphyDialog'

export type GiphyDialogConfig = IOSGiphyDialogConfig & AndroidGiphyDialogConfig

function noop() {}

export const GiphyDialog = new (class extends NativeEventEmitter {
  constructor() {
    super(NativeGiphyDialog)
    // listener stubs
    this.addListener('onMediaSelect', noop)
    this.addListener('onDismiss', noop)
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
