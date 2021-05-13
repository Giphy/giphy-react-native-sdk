import GiphyUISDK

@objc(GiphyReactNativeSDK)
class GiphyReactNativeSDK: NSObject {
  @objc(configure:)
  func configure(config: NSDictionary) -> Void {
    if let apiKey = config["apiKey"] as? String {
      Giphy.configure(apiKey: apiKey)
    }
  }
}
