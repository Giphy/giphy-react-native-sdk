import { EmitterSubscription, NativeEventEmitter } from 'react-native'

import { deserializeGiphyMedia } from './dto/giphyMedia'
import { GiphyVideoManager } from './GiphyVideoManager'
import { noop } from './utils/noop'
import { type GiphyTheme, serializeTheme } from './dto/giphyTheme'
import { type GiphyThemePreset } from './dto/giphyThemePreset'
import {
  GiphyDialogEvent,
  type GiphyDialogMediaSelectEventHandler,
  NativeGiphyDialog,
  type NativeGiphyDialogConfig,
} from './native/GiphyDialog'

export type GiphyDialogConfig = Omit<NativeGiphyDialogConfig, 'theme'> & {
  theme: GiphyTheme | GiphyThemePreset
}

function wrapMediaSelectedListener(listener: (...args: any[]) => any): GiphyDialogMediaSelectEventHandler {
  return (e) => {
    e.media = deserializeGiphyMedia(e.media)
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
    NativeGiphyDialog.configure({
      ...config,
      theme: serializeTheme(config.theme),
    })
  }

  show() {
    GiphyVideoManager.pauseAll()
    NativeGiphyDialog.show()
  }

  hide() {
    NativeGiphyDialog.hide()
  }
})()
