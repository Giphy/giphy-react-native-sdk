import { GiphyContentRequest, GiphyContentRequestType, GiphyMediaType } from './native/types'

export type GiphyContentSearchOptions = {
  searchQuery: string
  mediaType?: GiphyMediaType
}

export type GiphyContentTrendingOptions = {
  mediaType?: GiphyMediaType
}

export type GiphyContentAnimateOptions = {
  searchQuery: string
}

function makeGiphyContentRequest(
  options: Required<Pick<GiphyContentRequest, 'requestType'>> & Partial<GiphyContentRequest>
): GiphyContentRequest {
  return {
    searchQuery: '',
    mediaType: GiphyMediaType.Gif,
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

  static animate(options: GiphyContentAnimateOptions): GiphyContentRequest {
    return makeGiphyContentRequest({
      ...options,
      requestType: GiphyContentRequestType.Animate,
    })
  }
}
