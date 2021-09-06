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
      GPHVideoView.muteAll()
    }
  }

  @objc
  func pauseAll() -> Void {
    DispatchQueue.main.async {
      GPHVideoView.pauseAll()
    }
  }
}
