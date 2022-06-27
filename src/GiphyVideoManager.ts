import { NativeGiphyVideoManager } from './native/GiphyVideoManager'

export class GiphyVideoManager {
  static muteAll() {
    NativeGiphyVideoManager.muteAll()
  }

  static pauseAll() {
    NativeGiphyVideoManager.pauseAll()
  }

  static resume() {
    NativeGiphyVideoManager.resume()
  }
}
