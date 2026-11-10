import UIKit
import GiphyUISDK

open class RTNGiphyVideoViewImpl: UIView {
  //MARK: RN Event Handlers
  @objc public var onError: ((_ data: NSDictionary) -> Void)? = nil
  @objc public var onMute: ((_ data: NSDictionary) -> Void)? = nil
  @objc public var onPlaybackStateChanged: ((_ data: NSDictionary) -> Void)? = nil
  @objc public var onUnmute: ((_ data: NSDictionary) -> Void)? = nil

  //MARK: RN Properties
  @objc public var autoPlay: Bool = false

  var videoPlayerDelegate: RTNGiphyVideoPlayerDelegate?
  private var requestedMediaId: String?
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
    let playerView = self.playerView
    let videoPlayerDelegate = self.videoPlayerDelegate
    if Thread.isMainThread {
      RTNGiphyVideoViewImpl.releasePlayer(of: playerView, delegate: videoPlayerDelegate)
    } else {
      DispatchQueue.main.async {
        RTNGiphyVideoViewImpl.releasePlayer(of: playerView, delegate: videoPlayerDelegate)
      }
    }
  }

  // The shared player outlives the views. Besides the view's delegate, the SDK's player view listens to it,
  // and the player keeps playing into that view while it is the player's view, even after it is unmounted.
  private static func releasePlayer(of playerView: GPHVideoPlayerView, delegate: RTNGiphyVideoPlayerDelegate?) {
    guard SharedGPHVideoPlayer.initialized else {
      return
    }

    let player = SharedGPHVideoPlayer.shared
    if let delegate = delegate {
      player.remove(listener: delegate)
    }
    player.remove(listener: playerView)
    if player.playerView == playerView {
      // Also cancels a load that hasn't started playing yet.
      player.stop()
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
            let media = self.media
      else {
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
            let _ = self.playerView.media
      else {
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
    requestedMediaId = rnValue as? String
    guard
        let mediaId = rnValue as? String
    else {
      media = nil
      return
    }

    GiphyCore.shared.gifByID(mediaId) { [weak self] (response, error) in
      // The SDK calls back on the main queue. Ignore the answer for media that is no longer requested.
      guard let self = self, self.requestedMediaId == mediaId else {
        return
      }
      self.media = response?.data
      if response?.data == nil {
        self.reportLoadError(mediaId: mediaId, error: error)
      }
    }
  }

  private func reportLoadError(mediaId: String, error: Error?) -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self, self.requestedMediaId == mediaId else {
        return
      }

      self.onError?(["description": error?.localizedDescription ?? "Media not found: \(mediaId)"])
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

  private struct WeakView {
    weak var view: RTNGiphyVideoViewImpl?
  }

  // Weak, so registering a view doesn't keep it alive: deinit unregisters it.
  private var views: [WeakView] = []

  private init() {
  }

  func registerView(view: RTNGiphyVideoViewImpl) {
    views.append(WeakView(view: view))
  }

  func unregisterView(view: RTNGiphyVideoViewImpl) {
    views.removeAll {
      $0.view == nil || $0.view == view
    }
  }

  func getLatestViewWithAutoPlayback() -> RTNGiphyVideoViewImpl? {
    return views.last {
      guard let view = $0.view else {
        return false
      }
      return view.autoPlay && view.media != nil
    }?.view
  }
}

class RTNGiphyVideoPlayerDelegate: GPHVideoPlayerStateListener {
  private weak var view: RTNGiphyVideoViewImpl?

  init(view: RTNGiphyVideoViewImpl) {
    self.view = view
  }

  //MARK: GPHVideoViewDelegate stubs
  func playerDidFail(_ description: String?) {
    guard view != nil, view!.isViewPlayerActive() else {
      return
    }

    view?.onError?(["description": description ?? ""])
  }

  func playerStateDidChange(_ state: GPHVideoPlayerState) {
    guard view != nil, view!.isViewPlayerActive() else {
      return
    }

    view?.onPlaybackStateChanged?(["state": state.toRNValue()])
  }

  func muteDidChange(isMuted: Bool) {
    guard view != nil, view!.isViewPlayerActive() else {
      return
    }

    if isMuted {
      view?.onMute?([:])
    } else {
      view?.onUnmute?([:])
    }
  }
}
