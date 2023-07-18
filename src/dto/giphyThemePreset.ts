export const GiphyThemePreset = {
  Automatic: 'automatic',
  Dark: 'dark',
  Light: 'light',
} as const

export type GiphyThemePreset = (typeof GiphyThemePreset)[keyof typeof GiphyThemePreset]
