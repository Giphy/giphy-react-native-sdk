import GiphyUISDK

class SharedGPHVideoPlayer {
  static var initialized: Bool = false

  static let shared: GPHVideoPlayer = {
    initialized = true
    return GPHVideoPlayer()
  }()

  private init() {
  }
}
