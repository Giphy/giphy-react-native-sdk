export type KeyboardAppearance = 'default' | 'dark' | 'light'
export type IndicatorStyle = 'default' | 'dark' | 'light'

export const GiphyStickersColumnCount = {
  Two: 2,
  Three: 3,
  Four: 4,
} as const

export type GiphyStickersColumnCount = (typeof GiphyStickersColumnCount)[keyof typeof GiphyStickersColumnCount]

export const GiphyDirection = {
  Horizontal: 'horizontal',
  Vertical: 'vertical',
} as const

export type GiphyDirection = (typeof GiphyDirection)[keyof typeof GiphyDirection]

export const ResizeMode = {
  Center: 'center',
  Contain: 'contain',
  Cover: 'cover',
  Stretch: 'stretch',
} as const

export type ResizeMode = (typeof ResizeMode)[keyof typeof ResizeMode]
