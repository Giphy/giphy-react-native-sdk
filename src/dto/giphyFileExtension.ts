export const GiphyFileExtension = {
  GIF: 'gif',
  MP4: 'mp4',
  WebP: 'webp',
} as const

export type GiphyFileExtension = (typeof GiphyFileExtension)[keyof typeof GiphyFileExtension]
