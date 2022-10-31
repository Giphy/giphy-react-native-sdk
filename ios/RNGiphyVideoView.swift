import UIKit
import GiphyUISDK

private class ViewsRegister {
  static let shared = ViewsRegister()

  private var views: [RNGiphyVideoView] = []

  private init() {
  }

  func registerView(view: RNGiphyVideoView) {
    views.append(view)
  }

  func unregisterView(view: RNGiphyVideoView) {
    views.removeAll {
      $0 == view
    }
  }

  func getLatestViewWithAutoPlayback() -> RNGiphyVideoView? {
    return views.last {
      $0.autoPlay && $0.media != nil
    }
  }
}

class RNGiphyVideoView: UIView, GPHVideoPlayerStateListener {
  //MARK: RN callbacks
  @objc var onError: RCTDirectEventBlock?
  @objc var onMute: RCTDirectEventBlock?
  @objc var onPlaybackStateChanged: RCTDirectEventBlock?
  @objc var onUnmute: RCTDirectEventBlock?

  //MARK: RN Properties
  @objc var autoPlay: Bool = false

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
    setupView()
    SharedGPHVideoPlayer.shared.add(listener: self)
    ViewsRegister.shared.registerView(view: self)
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  deinit {
    ViewsRegister.shared.unregisterView(view: self)
    if (SharedGPHVideoPlayer.initialized) {
      SharedGPHVideoPlayer.shared.remove(listener: self)
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

  private func isViewPlayerActive() -> Bool {
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
  @objc func setMedia(_ rnValue: NSDictionary) -> Void {
    GPHMedia.fromRNValue(rnValue) { [weak self] in
      guard let self = self else {
        return
      }
      self.media = $0
    }
  }

  @objc func setMuted(_ value: Bool) -> Void {
    guard muted != value else {
      return
    }
    muted = value
  }

  //MARK: GPHVideoViewDelegate stubs
  func playerDidFail(_ description: String?) {
    guard isViewPlayerActive() else {
      return
    }

    onError?(["description": description ?? ""])
  }

  func playerStateDidChange(_ state: GPHVideoPlayerState) {
    guard isViewPlayerActive() else {
      return
    }

    onPlaybackStateChanged?(["state": state.toRNValue()])
  }

  func muteDidChange(isMuted: Bool) {
    guard isViewPlayerActive() else {
      return
    }

    if isMuted {
      onMute?([:])
    } else {
      onUnmute?([:])
    }
  }
}
