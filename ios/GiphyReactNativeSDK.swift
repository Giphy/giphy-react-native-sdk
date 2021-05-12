import GiphyUISDK

@objc(GiphyReactNativeSDK)
class GiphyReactNativeSDK: NSObject {
    let rootViewController = UIApplication.shared.keyWindow!.rootViewController!

    @objc(configure:)
    func configure(apiKey: NSString) -> Void {
        Giphy.configure(apiKey: apiKey as String)
    }

    @objc(showGiphyView)
    func showGiphyView() -> Void {
        DispatchQueue.main.async {
          let giphy = GiphyViewController()
          self.rootViewController.present(giphy, animated: true, completion: nil)
        }
    }

    @objc
    static func requiresMainQueueSetup() -> Bool {
      return true
    }
}
