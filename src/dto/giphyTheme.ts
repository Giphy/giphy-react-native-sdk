import { processColor } from 'react-native'

import type { IndicatorStyle, KeyboardAppearance } from './misc'
import type { GiphyThemePreset } from './giphyThemePreset'

type NativeColorValue = ReturnType<typeof processColor>

type ColorValue = Exclude<NativeColorValue, null> | string

export interface NativeGiphyTheme {
  preset?: GiphyThemePreset

  // Dialog's handle
  handleBarColor?: NativeColorValue

  // Emoji drawer
  emojiDrawerGradientBottomColor?: NativeColorValue
  emojiDrawerGradientTopColor?: NativeColorValue
  emojiDrawerScrollIndicatorStyle?: IndicatorStyle
  emojiDrawerSeparatorColor?: NativeColorValue

  // Search bar
  searchBackButtonColor?: NativeColorValue
  searchBarBackgroundColor?: NativeColorValue
  searchBarCornerRadius?: number
  searchBarPadding?: number
  searchPlaceholderTextColor?: NativeColorValue
  searchTextColor?: NativeColorValue

  // Suggestions
  showSuggestionsBar?: boolean
  suggestionCellBackgroundColor?: NativeColorValue
  suggestionCellTextColor?: NativeColorValue

  // Tab bar
  tabBarBackgroundAlpha?: number
  tabBarSwitchDefaultColor?: NativeColorValue
  tabBarSwitchSelectedColor?: NativeColorValue

  // Confirmation
  avatarPlaceholderColor?: NativeColorValue
  confirmationBackButtonColor?: NativeColorValue
  confirmationSelectButtonColor?: NativeColorValue
  confirmationSelectButtonTextColor?: NativeColorValue
  confirmationViewOnGiphyColor?: NativeColorValue
  usernameColor?: NativeColorValue

  // Grid content
  backgroundColorForLoadingCells?: NativeColorValue
  cellCornerRadius?: number
  fixedSizeCells?: boolean
  stickerBackgroundColor?: NativeColorValue

  // Keyboard
  keyboardAppearance?: KeyboardAppearance

  // Other
  backgroundColor?: NativeColorValue
  defaultTextColor?: NativeColorValue
  dialogOverlayBackgroundColor?: NativeColorValue
  retryButtonBackgroundColor?: NativeColorValue
  retryButtonTextColor?: NativeColorValue
}

const THEME_COLOR_FIELDS = [
  'avatarPlaceholderColor',
  'backgroundColor',
  'backgroundColorForLoadingCells',
  'confirmationBackButtonColor',
  'confirmationSelectButtonColor',
  'confirmationSelectButtonTextColor',
  'confirmationViewOnGiphyColor',
  'defaultTextColor',
  'dialogOverlayBackgroundColor',
  'emojiDrawerGradientBottomColor',
  'emojiDrawerGradientTopColor',
  'emojiDrawerSeparatorColor',
  'handleBarColor',
  'retryButtonBackgroundColor',
  'retryButtonTextColor',
  'searchBackButtonColor',
  'searchBarBackgroundColor',
  'searchPlaceholderTextColor',
  'searchTextColor',
  'stickerBackgroundColor',
  'suggestionCellBackgroundColor',
  'suggestionCellTextColor',
  'tabBarSwitchDefaultColor',
  'tabBarSwitchSelectedColor',
  'usernameColor',
] satisfies (keyof NativeGiphyTheme)[]

type ChangeThemeColorType<T> = {
  [P in keyof T]: P extends (typeof THEME_COLOR_FIELDS)[number] ? ColorValue : T[P]
}

export type GiphyTheme = ChangeThemeColorType<NativeGiphyTheme>

export function serializeTheme(theme: GiphyTheme | GiphyThemePreset): NativeGiphyTheme {
  if (typeof theme === 'string') {
    return {
      preset: theme,
    }
  }

  const rv = { ...theme } as NativeGiphyTheme
  THEME_COLOR_FIELDS.forEach((colorField) => {
    if (colorField in rv) {
      rv[colorField] = processColor(theme[colorField])
    }
  })

  return rv
}
