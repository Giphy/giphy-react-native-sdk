import GiphyUISDK

@objc(RNGiphySDK)
class RNGiphySDK: NSObject {
  @objc
  public static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc(configure:)
  func configure(config: NSDictionary) -> Void {
    if let apiKey = config["apiKey"] as? String {
      let verificationMode = config["verificationMode"] as? Bool ?? false
      let metadata = [RNSDKInfo.shared.name: RNSDKInfo.shared.version ?? ""]
      Giphy.configure(
        apiKey: apiKey,
        verificationMode: verificationMode,
        metadata: metadata
      )
    }
  }
}
