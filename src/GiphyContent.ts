import { GiphyMediaType, GiphyRating, GiphyContentRequest, GiphyContentRequestType } from './native/types'

export type GiphyContentSearchOptions = {
  searchQuery: string
  mediaType?: GiphyMediaType
  rating?: GiphyRating
}

export type GiphyContentTrendingOptions = {
  mediaType?: GiphyMediaType
  rating?: GiphyRating
}

function makeGiphyContentRequest(
  options: Required<Pick<GiphyContentRequest, 'requestType'>> & Partial<GiphyContentRequest>
): GiphyContentRequest {
  return {
    searchQuery: '',
    mediaType: GiphyMediaType.Gif,
    rating: GiphyRating.PG13,
    ...options,
  }
}

export class GiphyContent {
  static search(options: GiphyContentSearchOptions): GiphyContentRequest {
    return makeGiphyContentRequest({
      ...options,
      requestType: GiphyContentRequestType.Search,
    })
  }

  static trending(options: GiphyContentTrendingOptions): GiphyContentRequest {
    return makeGiphyContentRequest({
      ...options,
      requestType: GiphyContentRequestType.Trending,
    })
  }

  static trendingGifs(): GiphyContentRequest {
    return makeGiphyContentRequest({
      mediaType: GiphyMediaType.Gif,
      requestType: GiphyContentRequestType.Trending,
    })
  }

  static trendingStickers(): GiphyContentRequest {
    return makeGiphyContentRequest({
      mediaType: GiphyMediaType.Sticker,
      requestType: GiphyContentRequestType.Trending,
    })
  }

  static trendingText(): GiphyContentRequest {
    return makeGiphyContentRequest({
      mediaType: GiphyMediaType.Text,
      requestType: GiphyContentRequestType.Trending,
    })
  }

  static recents(): GiphyContentRequest {
    return makeGiphyContentRequest({
      mediaType: GiphyMediaType.Gif,
      requestType: GiphyContentRequestType.Recents,
    })
  }

  static emoji(): GiphyContentRequest {
    return makeGiphyContentRequest({
      mediaType: GiphyMediaType.Sticker,
      requestType: GiphyContentRequestType.Emoji,
    })
  }
}
