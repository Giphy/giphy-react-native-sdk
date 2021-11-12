class RNSDKInfo {
  static let shared = RNSDKInfo()

  let name = "RNSDK"

  lazy var version: String? = {
    if let rawVersion = Bundle(for: type(of: self)).object(forInfoDictionaryKey: "CFBundleShortVersionString") {
      return rawVersion as? String
    }
    return nil
  }()
}
