import type { Merge } from 'type-fest'
import type { IGif, IImages, IUser } from '@giphy/js-types'

export type GiphyMediaID = {
  id: string
}

export type GiphyMediaData = GiphyMediaID & IGif

export type GiphyMedia = GiphyMediaID & {
  url: string
  aspectRatio: number
  isDynamic: boolean
  isVideo: boolean
  data: GiphyMediaData
}

type GiphyVideo = Exclude<IGif['video'], undefined>

type RawAsset = Partial<{
  height: any
  size: string
  url: string
  width: any
}>

type RawAssets = Record<keyof IImages & keyof GiphyVideo['assets'], RawAsset>

type RawTag = string | { text: string }

type RawUser = Merge<
  IUser,
  Partial<{
    is_public: any
    is_verified: any
    suppress_chrome: any
  }>
>

type RawVideo = Merge<GiphyVideo, { assets?: RawAssets }>

export type RawGiphyMediaData = Merge<
  GiphyMediaData,
  {
    images?: RawAssets
    is_anonymous?: any
    is_community?: any
    is_dynamic?: any
    is_featured?: any
    is_hidden?: any
    is_indexable?: any
    is_preserve_size?: any
    is_realtime?: any
    is_removed?: any
    is_sticker?: any
    tags?: RawTag[]
    user?: RawUser
    video?: RawVideo
  }
>

export type RawGiphyMedia = Merge<GiphyMedia, { data: RawGiphyMediaData }>

const BOOL_PROPS = [
  'is_anonymous',
  'is_community',
  'is_featured',
  'is_hidden',
  'is_indexable',
  'is_preserve_size',
  'is_realtime',
  'is_removed',
  'is_sticker',
  'is_dynamic',
] as const

const USER_BOOL_PROPS = ['suppress_chrome', 'is_public', 'is_verified'] as const

const propToBool = (obj: Record<string, any>) => (prop: string) => {
  obj[prop] = Boolean(obj[prop])
}

function normalizeTag(tag: RawTag | string): string {
  return typeof tag === 'string' ? tag : tag.text
}

function normalizeAssets(assets?: RawAssets): Partial<IImages> | Partial<GiphyVideo['assets']> {
  const newAssets: Record<string, any> = { ...assets }

  Object.entries(newAssets).forEach(([key, asset]) => {
    newAssets[key] = {
      ...asset,
      width: parseInt(asset?.width, 10) || 0,
      height: parseInt(asset?.height, 10) || 0,
    }
  })

  return newAssets
}

function normalizeUser(user?: RawUser): IUser | undefined {
  if (!user) {
    return user
  }

  const newUser = { ...user }
  USER_BOOL_PROPS.forEach(propToBool(newUser))
  return newUser as IUser
}

function normalizeVideo(video?: RawVideo): GiphyVideo | undefined {
  if (!video) {
    return video
  }

  return {
    ...video,
    assets: normalizeAssets(video.assets),
  } as GiphyVideo
}

function normalizeMediaData(data: RawGiphyMediaData): GiphyMediaData {
  const newData = {
    ...data,
    id: String(data?.id),
    images: normalizeAssets(data?.images),
    tags: (data?.tags || []).map(normalizeTag),
    user: normalizeUser(data?.user),
    video: normalizeVideo(data?.video),
  } as GiphyMediaData

  BOOL_PROPS.forEach(propToBool(newData))
  delete (newData.images as any)?.mediaId

  return newData
}

export function makeGiphyMedia(rawMedia: RawGiphyMedia): GiphyMedia {
  return {
    ...rawMedia,
    data: normalizeMediaData(rawMedia.data),
  }
}
