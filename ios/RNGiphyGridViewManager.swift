@objc(RNGiphyGridViewManager)
class RNGiphyGridViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    return RNGiphyGridView()
  }
}
