import Foundation
import GiphyUISDK

@objc
open class GiphySDKModuleImpl: NSObject {
  @objc
  public static func configure(apiKey: NSString, verificationMode: NSNumber) -> Void {
    let metadata = [RNSDKInfo.shared.name: RNSDKInfo.shared.version ?? ""]
    Giphy.configure(
        apiKey: apiKey as String,
        verificationMode: verificationMode.boolValue,
        metadata: metadata
    )
  }
}
