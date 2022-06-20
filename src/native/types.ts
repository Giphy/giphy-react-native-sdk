import type { ConditionalKeys } from 'type-fest'

export enum GiphyThemePreset {
  Automatic = 'automatic',
  Dark = 'dark',
  Light = 'light',
}

export enum GiphyContentType {
  Emoji = 'emoji',
  Gif = 'gif',
  Recents = 'recents',
  Sticker = 'sticker',
  Text = 'text',
  Clips = 'clips',
}

export enum GiphyMediaType {
  Gif = 'gif',
  Sticker = 'sticker',
  Text = 'text',
  Video = 'video',
}

export enum GiphyRating {
  G = 'g',
  PG = 'pg',
  PG13 = 'pg-13',
  R = 'r',
  Unrated = 'unrated',
  Y = 'y',
}

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

export enum GiphyStickersColumnCount {
  Two = 2,
  Three,
  Four,
}

export enum GiphyFileExtension {
  GIF = 'gif',
  MP4 = 'mp4',
  WebP = 'webp',
}

export enum GiphyDirection {
  Horizontal = 'horizontal',
  Vertical = 'vertical',
}

export enum GiphyContentRequestType {
  Trending = 'trending',
  Search = 'search',
  Emoji = 'emoji',
  Recents = 'recents',
  Animate = 'animate',
}

export type GiphyContentRequest = {
  mediaType: GiphyMediaType
  rating?: GiphyRating
  requestType: GiphyContentRequestType
  searchQuery: string
}

export enum ResizeMode {
  Center = 'center',
  Contain = 'contain',
  Cover = 'cover',
  Stretch = 'stretch',
}
