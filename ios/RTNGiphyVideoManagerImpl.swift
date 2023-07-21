@objc
open class RTNGiphyVideoManagerImpl: NSObject {
  @objc
  public static func muteAll() -> Void {
    DispatchQueue.main.async {
      if SharedGPHVideoPlayer.initialized {
        SharedGPHVideoPlayer.shared.mute(true)
      }
    }
  }

  @objc
  public static func pauseAll() -> Void {
    DispatchQueue.main.async {
      if SharedGPHVideoPlayer.initialized {
        SharedGPHVideoPlayer.shared.pause()
      }
    }
  }

  @objc
  public static func resume() -> Void {
    DispatchQueue.main.async {
      if SharedGPHVideoPlayer.initialized {
        SharedGPHVideoPlayer.shared.resume()
      }
    }
  }
}
