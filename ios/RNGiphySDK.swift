import GiphyUISDK

@objc(RNGiphySDK)
class RNGiphySDK: NSObject {
  @objc(configure:)
  func configure(config: NSDictionary) -> Void {
    if let apiKey = config["apiKey"] as? String {
      let verificationMode = config["verificationMode"] as? Bool ?? false
      Giphy.configure(apiKey: apiKey, verificationMode: verificationMode)
    }
  }
}
