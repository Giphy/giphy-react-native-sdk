import { NativeModules } from 'react-native'

import type {
  GiphyMediaType,
  GiphyThemePreset,
  GiphyStickersColumnCount,
  GiphyRating,
  GiphyRendition,
  GiphyMedia,
} from './types'

export type BaseNativeGiphyDialogConfig = {
  mediaTypes?: GiphyMediaType[]
  rating?: GiphyRating
  renditionType?: GiphyRendition
  showConfirmationScreen?: boolean
  stickerColumnCount?: GiphyStickersColumnCount
  theme?: GiphyThemePreset
}

export type IOSGiphyDialogConfig = BaseNativeGiphyDialogConfig & {
  shouldLocalizeSearch?: boolean
  trayHeightMultiplier?: number
}

export type AndroidGiphyDialogConfig = BaseNativeGiphyDialogConfig & {
  confirmationRenditionType?: GiphyRendition
  selectedContentType?: GiphyMediaType
  showCheckeredBackground?: boolean
  showSuggestionsBar?: boolean
  useBlurredBackground?: boolean
}

export type NativeGiphyDialogConfig = IOSGiphyDialogConfig & AndroidGiphyDialogConfig

export type NativeGiphyDialogEvents =
  | {
      type: 'onMediaSelect'
      payload: { media: GiphyMedia }
    }
  | {
      type: 'onDismiss'
      payload: void
    }

export interface INativeGiphyDialog {
  configure(options: NativeGiphyDialogConfig): void

  show(): void

  hide(): void
}

export const NativeGiphyDialog: INativeGiphyDialog = NativeModules.GiphyReactNativeDialog
