import type { GiphyMediaType } from './giphyMediaType'
import type { GiphyRating } from './giphyRating'

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
