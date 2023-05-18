import { EventSubscriptionVendor, NativeModules } from 'react-native'

import type { GiphyClipsRendition, GiphyRendition } from '../dto/giphyRendition'
import type { GiphyContentType } from '../dto/giphyContentType'
import type { GiphyFileExtension } from '../dto/giphyFileExtension'
import type { GiphyMedia } from '../dto/giphyMedia'
import type { GiphyRating } from '../dto/giphyRating'
import type { GiphyStickersColumnCount } from '../dto/misc'
import type { GiphyThemePreset } from '../dto/giphyThemePreset'

export type BaseNativeGiphyDialogConfig = {
  clipsPreviewRenditionType?: GiphyClipsRendition
  enableDynamicText?: boolean
  fileType?: GiphyFileExtension
  mediaTypeConfig?: GiphyContentType[]
  rating?: GiphyRating
  renditionType?: GiphyRendition
  selectedContentType?: GiphyContentType
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
  showCheckeredBackground?: boolean
  showSuggestionsBar?: boolean
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
