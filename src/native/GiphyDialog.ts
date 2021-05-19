import { NativeModules, EventSubscriptionVendor } from 'react-native'

import type {
  GiphyMediaType,
  GiphyThemePreset,
  GiphyStickersColumnCount,
  GiphyRating,
  GiphyRendition,
  GiphyMedia,
  GiphyFileExtension,
} from './types'

export type BaseNativeGiphyDialogConfig = {
  mediaTypes?: GiphyMediaType[]
  rating?: GiphyRating
  renditionType?: GiphyRendition
  showConfirmationScreen?: boolean
  stickerColumnCount?: GiphyStickersColumnCount
  theme?: GiphyThemePreset
  fileType?: GiphyFileExtension
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

export enum GiphyDialogEvent {
  MediaSelected = 'onMediaSelect',
  Dismissed = 'onDismiss',
}

export type GiphyDialogMediaSelectEventHandler = (e: { media: GiphyMedia }) => void

export type GiphyDialogDismissEventHandler = (e: undefined) => void

export interface INativeGiphyDialog extends EventSubscriptionVendor {
  configure(options: NativeGiphyDialogConfig): void

  show(): void

  hide(): void
}

export const NativeGiphyDialog: INativeGiphyDialog = NativeModules.GiphyReactNativeDialog
