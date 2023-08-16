export const GiphyContentType = {
  Emoji: 'emoji',
  Gif: 'gif',
  Recents: 'recents',
  Sticker: 'sticker',
  Text: 'text',
  Clips: 'clips',
} as const

export type GiphyContentType = (typeof GiphyContentType)[keyof typeof GiphyContentType]
