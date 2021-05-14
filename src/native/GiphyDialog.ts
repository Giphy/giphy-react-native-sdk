import { NativeModules, Platform } from 'react-native'

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

export type NativeGiphyDialogConfig = IOSGiphyDialogConfig | AndroidGiphyDialogConfig

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

export const BASE_NATIVE_DIALOG_CONFIG_KEYS: ReadonlySet<keyof BaseNativeGiphyDialogConfig> = new Set<
  keyof BaseNativeGiphyDialogConfig
>(['mediaTypes', 'rating', 'renditionType', 'showConfirmationScreen', 'stickerColumnCount', 'theme'])

export const ANDROID_DIALOG_CONFIG_KEYS: ReadonlySet<keyof AndroidGiphyDialogConfig> = new Set<
  keyof AndroidGiphyDialogConfig
>([
  ...BASE_NATIVE_DIALOG_CONFIG_KEYS,
  'confirmationRenditionType',
  'selectedContentType',
  'showCheckeredBackground',
  'showSuggestionsBar',
  'useBlurredBackground',
])

export const IOS_DIALOG_CONFIG_KEYS: ReadonlySet<keyof IOSGiphyDialogConfig> = new Set<keyof IOSGiphyDialogConfig>([
  ...BASE_NATIVE_DIALOG_CONFIG_KEYS,
  'shouldLocalizeSearch',
  'trayHeightMultiplier',
])

export function getNativeDialogConfig(
  config: AndroidGiphyDialogConfig & IOSGiphyDialogConfig & Record<string, any>
): NativeGiphyDialogConfig {
  const platformKeys: ReadonlySet<string> = Platform.OS === 'ios' ? IOS_DIALOG_CONFIG_KEYS : ANDROID_DIALOG_CONFIG_KEYS
  const filteredPairs = Object.entries(config).filter(([key]) => platformKeys.has(key))
  return Object.fromEntries(filteredPairs)
}

export const NativeGiphyDialog: INativeGiphyDialog = NativeModules.GiphyReactNativeDialog
