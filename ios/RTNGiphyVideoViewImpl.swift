import UIKit
import GiphyUISDK

@objc
open class RTNGiphyVideoViewImpl: UIView {
  @objc public var onError: ((_ data: NSDictionary) -> Void)?
  @objc public var onMute: ((_ data: NSDictionary) -> Void)?
  @objc public var onPlaybackStateChanged: ((_ data: NSDictionary) -> Void)?
  @objc public var onUnmute: ((_ data: NSDictionary) -> Void)?
  
  //MARK: RN Properties
  @objc public var autoPlay: Bool = false

  private var videoPlayerDelegate: RTNGiphyVideoPlayerDelegate?
  
  var media: GPHMedia? {
    didSet {
      syncMedia()
    }
  }
  
  private var muted: Bool = false {
    didSet {
      syncVolume()
    }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    
    ViewsRegister.shared.registerView(view: self)
    setupView()
    
    videoPlayerDelegate = RTNGiphyVideoPlayerDelegate(view: self)
    SharedGPHVideoPlayer.shared.add(listener: videoPlayerDelegate!)
  }
  
  required public init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  deinit {
    ViewsRegister.shared.unregisterView(view: self)
    if (SharedGPHVideoPlayer.initialized && videoPlayerDelegate != nil) {
      SharedGPHVideoPlayer.shared.remove(listener: videoPlayerDelegate! as RTNGiphyVideoPlayerDelegate)
    }
  }
  
  let playerView: GPHVideoPlayerView = {
    GPHVideoPlayerView()
  }()
  
  private func setupView() -> Void {
    addSubview(playerView)
    
    playerView.translatesAutoresizingMaskIntoConstraints = false
    playerView.leftAnchor.constraint(equalTo: safeLeftAnchor).isActive = true
    playerView.rightAnchor.constraint(equalTo: safeRightAnchor).isActive = true
    playerView.topAnchor.constraint(equalTo: safeTopAnchor).isActive = true
    playerView.bottomAnchor.constraint(equalTo: safeBottomAnchor).isActive = true
    playerView.contentMode = .scaleAspectFit
    playerView.layer.masksToBounds = true
    playerView.backgroundColor = .clear
  }
  
  func isViewPlayerActive() -> Bool {
    return SharedGPHVideoPlayer.initialized && SharedGPHVideoPlayer.shared.playerView == playerView
  }
  
  private func syncMedia() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self,
            let media = self.media else {
        return
      }
      
      SharedGPHVideoPlayer.shared.prepareMedia(media: media, view: self.playerView)
      if self.autoPlay == true && ViewsRegister.shared.getLatestViewWithAutoPlayback() == self {
        SharedGPHVideoPlayer.shared.loadMedia(
          media: media,
          autoPlay: true,
          muteOnPlay: self.muted == true,
          view: self.playerView
        )
      }
    }
  }
  
  private func syncVolume() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self,
            let _ = self.playerView.media else {
        return
      }
      
      if self.isViewPlayerActive() {
        SharedGPHVideoPlayer.shared.mute(self.muted)
      }
    }
  }
  
  //MARK: RN Setters
  @objc
  public func setMediaId(_ rnValue: NSString?) -> Void {
    guard
      let mediaId = rnValue as? String
    else {
      self.media = nil
      return
    }
    
    GiphyCore.shared.gifByID(mediaId) { [weak self] (response, error) in
      guard let self = self else {
        return
      }
      self.media = response?.data
    }
  }
  
  @objc
  public func setMuted(_ value: Bool) -> Void {
    guard muted != value else {
      return
    }
    muted = value
  }
}

private class ViewsRegister {
  static let shared = ViewsRegister()
  
  private var views: [RTNGiphyVideoViewImpl] = []
  
  private init() {
  }
  
  func registerView(view: RTNGiphyVideoViewImpl) {
    views.append(view)
  }
  
  func unregisterView(view: RTNGiphyVideoViewImpl) {
    views.removeAll {
      $0 == view
    }
  }
  
  func getLatestViewWithAutoPlayback() -> RTNGiphyVideoViewImpl? {
    return views.last {
      $0.autoPlay && $0.media != nil
    }
  }
}

private class RTNGiphyVideoPlayerDelegate: GPHVideoPlayerStateListener {
  private let view: RTNGiphyVideoViewImpl
  
  init(view: RTNGiphyVideoViewImpl) {
    self.view = view
  }
  
  //MARK: GPHVideoViewDelegate stubs
  func playerDidFail(_ description: String?) {
    guard view.isViewPlayerActive() else {
      return
    }
    
    view.onError?(["description": description ?? ""])
  }
  
  func playerStateDidChange(_ state: GPHVideoPlayerState) {
    guard view.isViewPlayerActive() else {
      return
    }
    
    view.onPlaybackStateChanged?(["state": state.toRNValue()])
  }
  
  func muteDidChange(isMuted: Bool) {
    guard view.isViewPlayerActive() else {
      return
    }
    
    if isMuted {
      view.onMute?([:])
    } else {
      view.onUnmute?([:])
    }
  }
}
