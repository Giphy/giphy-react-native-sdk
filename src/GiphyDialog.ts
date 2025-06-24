import { type EmitterSubscription, NativeEventEmitter } from 'react-native'

import NativeGiphyDialog from './specs/NativeGiphyDialog'
import type { GiphyClipsRendition, GiphyRendition } from './dto/giphyRendition'
import type { GiphyContentType } from './dto/giphyContentType'
import type { GiphyFileExtension } from './dto/giphyFileExtension'
import type { GiphyRating } from './dto/giphyRating'
import type { GiphyStickersColumnCount } from './dto/misc'
import { deserializeGiphyMedia, type GiphyMedia } from './dto/giphyMedia'
import { GiphyVideoManager } from './GiphyVideoManager'
import { noop } from './utils/noop'
import { type GiphyTheme, serializeTheme } from './dto/giphyTheme'
import { type GiphyThemePreset } from './dto/giphyThemePreset'

export const GiphyDialogEvent = {
  MediaSelected: 'onMediaSelect',
  Dismissed: 'onDismiss',
} as const

export type GiphyDialogEvent = (typeof GiphyDialogEvent)[keyof typeof GiphyDialogEvent]

export type GiphyDialogMediaSelectEventHandler = (e: { media: GiphyMedia }) => void

export type GiphyDialogDismissEventHandler = (e: {}) => void

export interface GiphyDialogConfig {
  clipsPreviewRenditionType?: GiphyClipsRendition
  confirmationRenditionType?: GiphyRendition
  enableDynamicText?: boolean
  fileType?: GiphyFileExtension
  mediaTypeConfig?: GiphyContentType[]
  rating?: GiphyRating
  renditionType?: GiphyRendition
  selectedContentType?: GiphyContentType
  shouldLocalizeSearch?: boolean
  showCheckeredBackground?: boolean
  showConfirmationScreen?: boolean
  showSuggestionsBar?: boolean
  stickerColumnCount?: GiphyStickersColumnCount
  theme?: GiphyTheme | GiphyThemePreset
  trayHeightMultiplier?: number
  enableEdgeToEdge?: boolean
}

function wrapMediaSelectedListener(listener: (...args: any[]) => any): GiphyDialogMediaSelectEventHandler {
  return (e) => {
    e.media = deserializeGiphyMedia(e.media ?? {})
    return listener(e)
  }
}

export const GiphyDialog = new (class GiphyDialog extends NativeEventEmitter {
  constructor() {
    super(NativeGiphyDialog)
    // listener stubs
    this.addListener('onMediaSelect', noop)
    this.addListener('onDismiss', noop)
  }

  override addListener(
    eventType: GiphyDialogEvent,
    listener: (...args: any[]) => any,
    ...rest: any[]
  ): EmitterSubscription {
    if (eventType === 'onMediaSelect') {
      return super.addListener(eventType, wrapMediaSelectedListener(listener), ...rest)
    }
    return super.addListener(eventType, listener, ...rest)
  }

  configure(config: GiphyDialogConfig) {
    NativeGiphyDialog.configure({
      ...config,
      theme: serializeTheme(config.theme ?? 'light'),
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
