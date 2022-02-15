import { GiphyContentRequest, GiphyContentRequestType, GiphyMediaType, GiphyRating } from './native/types'

type GiphyContentRating = {
  rating?: GiphyRating
}

export type GiphyContentSearchOptions = GiphyContentRating & {
  searchQuery: string
  mediaType?: GiphyMediaType
}

export type GiphyContentTrendingOptions = GiphyContentRating & {
  mediaType?: GiphyMediaType
}

export type GiphyContentTrendingGIFsOptions = GiphyContentRating

export type GiphyContentTrendingStickersOptions = GiphyContentRating

export type GiphyContentTrendingTextOptions = GiphyContentRating

export type GiphyContentRecentsOptions = GiphyContentRating

export type GiphyContentEmojiOptions = GiphyContentRating

export type GiphyContentAnimateOptions = GiphyContentRating & {
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

  static trendingGifs(options?: GiphyContentTrendingGIFsOptions): GiphyContentRequest {
    return makeGiphyContentRequest({
      ...options,
      mediaType: GiphyMediaType.Gif,
      requestType: GiphyContentRequestType.Trending,
    })
  }

  static trendingStickers(options?: GiphyContentTrendingStickersOptions): GiphyContentRequest {
    return makeGiphyContentRequest({
      ...options,
      mediaType: GiphyMediaType.Sticker,
      requestType: GiphyContentRequestType.Trending,
    })
  }

  static trendingText(options?: GiphyContentTrendingTextOptions): GiphyContentRequest {
    return makeGiphyContentRequest({
      ...options,
      mediaType: GiphyMediaType.Text,
      requestType: GiphyContentRequestType.Trending,
    })
  }

  static recents(options?: GiphyContentRecentsOptions): GiphyContentRequest {
    return makeGiphyContentRequest({
      ...options,
      mediaType: GiphyMediaType.Gif,
      requestType: GiphyContentRequestType.Recents,
    })
  }

  static emoji(options?: GiphyContentEmojiOptions): GiphyContentRequest {
    return makeGiphyContentRequest({
      ...options,
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
