import {
  NativeGiphyDialog,
  IOSGiphyDialogConfig,
  AndroidGiphyDialogConfig,
  getNativeDialogConfig,
} from './native/GiphyDialog'

export type GiphyDialogConfig = IOSGiphyDialogConfig & AndroidGiphyDialogConfig

export class GiphyDialog {
  // todo add event emitter

  static configure(config: GiphyDialogConfig) {
    NativeGiphyDialog.configure(getNativeDialogConfig(config))
  }

  static show() {
    NativeGiphyDialog.show()
  }

  static hide() {
    NativeGiphyDialog.hide()
  }
}
