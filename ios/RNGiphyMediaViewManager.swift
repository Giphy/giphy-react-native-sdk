@objc(RNGiphyMediaViewManager)
class RNGiphyMediaViewManager: RCTViewManager {
  override static func requiresMainQueueSetup() -> Bool {
    return true
  }

  override func view() -> UIView! {
    return RNGiphyMediaView()
  }

  func findView(_ node: NSNumber, completion: @escaping (_ result: RNGiphyMediaView?) -> Void) {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        return
      }

      let view = self.bridge.uiManager.view(forReactTag: node) as! RNGiphyMediaView?
      completion(view)
    }
  }

  @objc func pause(_ node: NSNumber) {
    findView(node) { view in
      view?.pause()
    }
  }

  @objc func resume(_ node: NSNumber) {
    findView(node) { view in
      view?.resume()
    }
  }
}
