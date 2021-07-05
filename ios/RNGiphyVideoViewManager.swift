@objc(RNGiphyVideoViewManager)
class RNGiphyVideoViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    return RNGiphyVideoView()
  }
}
