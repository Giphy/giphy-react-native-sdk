import GiphyUISDK

@objc(GiphyReactNativeDialog)
class GiphyReactNativeDialog: NSObject {
  let rootViewController = UIApplication.shared.keyWindow!.rootViewController!
  var giphyViewController: GiphyViewController?
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc(show)
  func show() -> Void {
    DispatchQueue.main.async {
      let giphy = GiphyViewController()
      self.rootViewController.present(giphy, animated: true, completion: {
        self.giphyViewController = giphy
      })
    }
  }
  
  @objc(hide)
  func hide() -> Void {
    DispatchQueue.main.async {
      self.giphy?.dismiss(animated: true, completion: {
        self.giphyViewController = nil
      })
    }
  }
}
