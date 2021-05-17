import { NativeGiphyDialog, IOSGiphyDialogConfig, AndroidGiphyDialogConfig } from './native/GiphyDialog'

export type GiphyDialogConfig = IOSGiphyDialogConfig & AndroidGiphyDialogConfig

export class GiphyDialog {
  // todo add event emitter

  static configure(config: GiphyDialogConfig) {
    NativeGiphyDialog.configure(config)
  }

  static show() {
    NativeGiphyDialog.show()
  }

  static hide() {
    NativeGiphyDialog.hide()
  }
}
