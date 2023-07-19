import React from 'react'
import codegenNativeCommands from 'react-native/Libraries/Utilities/codegenNativeCommands'
import codegenNativeComponent from 'react-native/Libraries/Utilities/codegenNativeComponent'
import type { HostComponent } from 'react-native'
import type { ViewProps } from 'react-native/Libraries/Components/View/ViewPropTypes'

export interface NativeProps extends ViewProps {
  autoPlay: boolean
  mediaId?: string
  renditionType: string
  resizeMode: string
  showCheckeredBackground: boolean
}

export interface NativeCommands {
  pause: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void
  resume: (viewRef: React.ElementRef<HostComponent<NativeProps>>) => void
}

export const Commands: NativeCommands = codegenNativeCommands<NativeCommands>({
  supportedCommands: ['pause', 'resume'],
})

export default codegenNativeComponent<NativeProps>('RTNGiphyMediaView') as HostComponent<NativeProps>
