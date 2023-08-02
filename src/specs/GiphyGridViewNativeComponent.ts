import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent'
import type { HostComponent, ViewProps } from 'react-native'
import type { DirectEventHandler, Double, Int32 } from 'react-native/Libraries/Types/CodegenTypes'

export type GiphyGridViewContentUpdateEvent = Readonly<{
  resultCount: Int32
}>

export type GiphyGridViewRawMediaSelectEvent = Readonly<{
  media: string
}>

export type GiphyGridViewMediaScrollEvent = Readonly<{
  offset: Double
}>

export interface NativeProps extends ViewProps {
  cellPadding: Int32
  clipsPreviewRenditionType: string
  content?: string
  fixedSizeCells: boolean
  onContentUpdate?: DirectEventHandler<GiphyGridViewContentUpdateEvent>
  onMediaSelect?: DirectEventHandler<GiphyGridViewRawMediaSelectEvent>
  onScroll?: DirectEventHandler<GiphyGridViewMediaScrollEvent>
  orientation: string
  renditionType: string
  showCheckeredBackground: boolean
  spanCount?: Int32
  theme: string
}

export default codegenNativeComponent<NativeProps>('RTNGiphyGridView') as HostComponent<NativeProps>
