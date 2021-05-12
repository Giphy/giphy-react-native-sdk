import {NativeModules} from 'react-native'

export const NativeGiphySDK: INativeGiphySDK = NativeModules.GiphyReactNativeSDK

export interface INativeGiphySDK {
  configure(apiKey: string): void;
  showGiphyView(): void;
}

export class GiphySDK {
  static configure(apiKey: string) {
    NativeGiphySDK.configure(apiKey)
  }

  static showGiphyView() {
    return NativeGiphySDK.showGiphyView()
  }
}


