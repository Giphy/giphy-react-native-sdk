@objc(RNGiphyMediaViewManager)
class RNGiphyMediaViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override func view() -> UIView! {
    return RNGiphyMediaView()
  }
}
