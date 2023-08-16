export const GiphyMediaType = {
  Gif: 'gif',
  Sticker: 'sticker',
  Text: 'text',
  Video: 'video',
} as const

export type GiphyMediaType = (typeof GiphyMediaType)[keyof typeof GiphyMediaType]
