import type { ConditionalKeys } from 'type-fest'

export const GiphyRendition = {
  Original: 'original',
  OriginalStill: 'original_still',
  Preview: 'preview',
  Looping: 'looping',
  FixedHeight: 'fixed_height',
  FixedHeightStill: 'fixed_height_still',
  FixedHeightDownsampled: 'fixed_height_downsampled',
  FixedHeightSmall: 'fixed_height_small',
  FixedHeightSmallStill: 'fixed_height_small_still',
  FixedWidth: 'fixed_width',
  FixedWidthStill: 'fixed_width_still',
  FixedWidthDownsampled: 'fixed_width_downsampled',
  FixedWidthSmall: 'fixed_width_small',
  FixedWidthSmallStill: 'fixed_width_small_still',
  Downsized: 'downsized',
  DownsizedSmall: 'downsized_small',
  DownsizedMedium: 'downsized_medium',
  DownsizedLarge: 'downsized_large',
  DownsizedStill: 'downsized_still',
} as const

export type GiphyRendition = (typeof GiphyRendition)[keyof typeof GiphyRendition]

export type GiphyClipsRendition = Exclude<
  GiphyRendition,
  | 'preview'
  | 'looping'
  | 'fixed_width_small'
  | 'fixed_width_small_still'
  | 'fixed_height_small'
  | 'fixed_height_small_still'
  | 'downsized_small'
  | 'downsized_still'
  | 'downsized'
>

export const GiphyClipsRendition: Record<
  ConditionalKeys<typeof GiphyRendition, GiphyClipsRendition>,
  GiphyClipsRendition
> = {
  Original: GiphyRendition.Original,
  OriginalStill: GiphyRendition.OriginalStill,
  FixedHeight: GiphyRendition.FixedHeight,
  FixedHeightStill: GiphyRendition.FixedHeightStill,
  FixedHeightDownsampled: GiphyRendition.FixedHeightDownsampled,
  FixedWidth: GiphyRendition.FixedWidth,
  FixedWidthStill: GiphyRendition.FixedWidthStill,
  FixedWidthDownsampled: GiphyRendition.FixedWidthDownsampled,
  DownsizedMedium: GiphyRendition.DownsizedMedium,
  DownsizedLarge: GiphyRendition.DownsizedLarge,
}
