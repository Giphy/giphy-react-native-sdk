import { NativeEventEmitter } from 'react-native'
import { NativeGiphyDialog, IOSGiphyDialogConfig, AndroidGiphyDialogConfig } from './native/GiphyDialog'

export type GiphyDialogConfig = IOSGiphyDialogConfig & AndroidGiphyDialogConfig

export const GiphyDialog = new (class extends NativeEventEmitter {
  constructor() {
    super(NativeGiphyDialog)
  }

  configure(config: GiphyDialogConfig) {
    NativeGiphyDialog.configure(config)
  }

  show() {
    NativeGiphyDialog.show()
  }

  hide() {
    NativeGiphyDialog.hide()
  }
})()
