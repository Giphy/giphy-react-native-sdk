export enum GiphyThemePreset {
  Automatic = 'automatic',
  Dark = 'dark',
  Light = 'light',
}

export enum GiphyMediaType {
  Emoji = 'emoji',
  Gif = 'gif',
  Recents = 'recents',
  Sticker = 'sticker',
  Text = 'text',
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

export type GiphyMedia = {
  id: string
  url: string
  aspectRatio: number
}

export enum GiphyContentRequestType {
  Trending = 'trending',
  Search = 'search',
  Emoji = 'emoji',
  Recents = 'recents',
  Animate = 'animate',
}

export type GiphyContentRequest = {
  searchQuery: string
  mediaType: GiphyMediaType
  rating: GiphyRating
  includeDynamicResults: boolean
  requestType: GiphyContentRequestType
}
