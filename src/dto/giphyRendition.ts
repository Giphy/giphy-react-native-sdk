import type { ConditionalKeys } from 'type-fest'

export enum GiphyRendition {
  Original = 'original',
  OriginalStill = 'original_still',
  Preview = 'preview',
  Looping = 'looping',
  FixedHeight = 'fixed_height',
  FixedHeightStill = 'fixed_height_still',
  FixedHeightDownsampled = 'fixed_height_downsampled',
  FixedHeightSmall = 'fixed_height_small',
  FixedHeightSmallStill = 'fixed_height_small_still',
  FixedWidth = 'fixed_width',
  FixedWidthStill = 'fixed_width_still',
  FixedWidthDownsampled = 'fixed_width_downsampled',
  FixedWidthSmall = 'fixed_width_small',
  FixedWidthSmallStill = 'fixed_width_small_still',
  Downsized = 'downsized',
  DownsizedSmall = 'downsized_small',
  DownsizedMedium = 'downsized_medium',
  DownsizedLarge = 'downsized_large',
  DownsizedStill = 'downsized_still',
}

export type GiphyClipsRendition = Exclude<
  GiphyRendition,
  | GiphyRendition.Preview
  | GiphyRendition.Looping
  | GiphyRendition.FixedWidthSmall
  | GiphyRendition.FixedWidthSmallStill
  | GiphyRendition.FixedHeightSmall
  | GiphyRendition.FixedHeightSmallStill
  | GiphyRendition.DownsizedSmall
  | GiphyRendition.DownsizedStill
  | GiphyRendition.Downsized
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
