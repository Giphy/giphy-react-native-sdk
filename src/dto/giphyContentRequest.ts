import type { GiphyMediaType } from './giphyMediaType'
import type { GiphyRating } from './giphyRating'

export const GiphyContentRequestType = {
  Trending: 'trending',
  Search: 'search',
  Emoji: 'emoji',
  Recents: 'recents',
  Animate: 'animate',
} as const

export type GiphyContentRequestType = (typeof GiphyContentRequestType)[keyof typeof GiphyContentRequestType]

export type GiphyContentRequest = {
  mediaType: GiphyMediaType
  rating?: GiphyRating
  requestType: GiphyContentRequestType
  searchQuery: string
}
