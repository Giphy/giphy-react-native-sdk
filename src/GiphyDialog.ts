import { Platform } from 'react-native'

import { NativeGiphyDialog, IOSGiphyDialogConfig, AndroidGiphyDialogConfig } from './native'

export type GiphyDialogConfig = IOSGiphyDialogConfig & AndroidGiphyDialogConfig

function getIOSDialogConfig(config: GiphyDialogConfig): IOSGiphyDialogConfig {
  console.log(config)
  throw new Error('Not implemented')
}

function getAndroidDialogConfig(config: GiphyDialogConfig): AndroidGiphyDialogConfig {
  console.log(config)
  throw new Error('Not implemented')
}

export class GiphyDialog {
  // todo add event emitter

  static configure(config: GiphyDialogConfig) {
    NativeGiphyDialog.configure(Platform.OS === 'ios' ? getIOSDialogConfig(config) : getAndroidDialogConfig(config))
  }

  static show() {
    NativeGiphyDialog.show()
  }

  static hide() {
    NativeGiphyDialog.hide()
  }
}
