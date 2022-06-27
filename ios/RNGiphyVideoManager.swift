import GiphyUISDK

@objc(RNGiphyVideoManager)
class RNGiphyVideoManager: NSObject {
  @objc
  public static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc
  func muteAll() -> Void {
    DispatchQueue.main.async {
      if SharedGPHVideoPlayer.initialized {
        SharedGPHVideoPlayer.shared.mute(true)
      }
    }
  }

  @objc
  func pauseAll() -> Void {
    DispatchQueue.main.async {
      if SharedGPHVideoPlayer.initialized {
        SharedGPHVideoPlayer.shared.pause()
      }
    }
  }

  @objc
  func resume() -> Void {
    DispatchQueue.main.async {
      if SharedGPHVideoPlayer.initialized {
        SharedGPHVideoPlayer.shared.resume()
      }
    }
  }
}
