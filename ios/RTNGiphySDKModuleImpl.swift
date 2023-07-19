import Foundation
import GiphyUISDK

@objc
open class RTNGiphySDKModuleImpl: NSObject {
  @objc
  public static func configure(apiKey: NSString, verificationMode: Bool) -> Void {
    let metadata = [RTNGiphySDKInfo.shared.name: RTNGiphySDKInfo.shared.version ?? ""]
    Giphy.configure(
        apiKey: apiKey as String,
        verificationMode: verificationMode,
        metadata: metadata
    )
  }
}
