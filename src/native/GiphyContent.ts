import { NativeModules } from 'react-native'

import type { GiphyContentRequest, GiphyMediaType, GiphyRating } from './types'

export type GiphyContentSearchOptions = {
  query: string
  mediaType?: GiphyMediaType
  rating?: GiphyRating
}

export type GiphyContentTrendingOptions = {
  mediaType?: GiphyMediaType
  rating?: GiphyRating
}

export interface INativeGiphyContent {
  search(options: GiphyContentSearchOptions): GiphyContentRequest
  trending(options: GiphyContentTrendingOptions): GiphyContentRequest
  trendingGifs: GiphyContentRequest
  trendingStickers: GiphyContentRequest
  recents: GiphyContentRequest
  emoji: GiphyContentRequest
}

export const NativeGiphyContent: INativeGiphyContent = NativeModules.GiphyReactNativeContent
