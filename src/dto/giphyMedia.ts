import type { Merge } from 'type-fest'
import type { IGif, IImages, IUser } from '@giphy/js-types'

export type GiphyMediaID = Readonly<{
  id: string
}>

export type GiphyMediaData = GiphyMediaID & IGif

export type GiphyMedia = GiphyMediaID & {
  url: string
  aspectRatio: number
  isDynamic: boolean
  isVideo: boolean
  data: GiphyMediaData
}

type GiphyVideo = Exclude<IGif['video'], undefined>

type NativeAsset = Partial<{
  height: any
  size: string
  url: string
  width: any
}>

type NativeAssets = Record<keyof IImages & keyof GiphyVideo['assets'], NativeAsset>

type NativeTag = string | { text: string }

type NativeUser = Merge<
  IUser,
  Partial<{
    is_public: any
    is_verified: any
    suppress_chrome: any
  }>
>

type NativeVideo = Merge<GiphyVideo, { assets?: NativeAssets }>

export type NativeGiphyMediaData = Merge<
  GiphyMediaData,
  {
    images?: NativeAssets
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
    tags?: NativeTag[]
    user?: NativeUser
    video?: NativeVideo
  }
>

export type NativeGiphyMedia = Merge<GiphyMedia, { data: NativeGiphyMediaData }>

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

function deserializeTag(tag: NativeTag | string): string {
  return typeof tag === 'string' ? tag : tag.text
}

function deserializeAssets(assets?: NativeAssets): Partial<IImages> | Partial<GiphyVideo['assets']> {
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

function deserializeUser(user?: NativeUser): IUser | undefined {
  if (!user) {
    return user
  }

  const newUser = { ...user }
  USER_BOOL_PROPS.forEach(propToBool(newUser))
  return newUser as IUser
}

function deserializeVideo(video?: NativeVideo): GiphyVideo | undefined {
  if (!video) {
    return video
  }

  return {
    ...video,
    assets: deserializeAssets(video.assets),
  } as GiphyVideo
}

function deserializeMediaData(data: NativeGiphyMediaData): GiphyMediaData {
  const newData = {
    ...data,
    id: String(data?.id),
    images: deserializeAssets(data?.images),
    tags: (data?.tags || []).map(deserializeTag),
    user: deserializeUser(data?.user),
    video: deserializeVideo(data?.video),
  } as GiphyMediaData

  BOOL_PROPS.forEach(propToBool(newData))
  delete (newData.images as any)?.mediaId

  return newData
}

export function deserializeGiphyMedia(rawMedia: NativeGiphyMedia): GiphyMedia {
  return {
    ...rawMedia,
    data: deserializeMediaData(rawMedia.data),
  }
}
