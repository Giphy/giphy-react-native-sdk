import UIKit
import GiphyUISDK


class RNGiphyVideoView: UIView, GPHVideoViewDelegate {
  //MARK: RN callbacks
  @objc var onError: RCTDirectEventBlock?
  @objc var onMute: RCTDirectEventBlock?
  @objc var onPlaybackStateChanged: RCTDirectEventBlock?
  @objc var onUnmute: RCTDirectEventBlock?

  //MARK: RN Properties
  @objc var autoPlay: Bool = false

  private var media: GPHMedia? {
    didSet {
      syncMedia()
    }
  }

  private var muted: Bool = false {
    didSet {
      syncVolume()
    }
  }

  //TODO: v2 remove
  private var playing: Bool? = nil {
    didSet {
      syncPlaying()
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    videoView.delegate = self
    setupView()
    syncMedia()
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  let videoView: GPHVideoView = {
    GPHVideoView()
  }()

  private func setupView() -> Void {
    addSubview(videoView)

    videoView.translatesAutoresizingMaskIntoConstraints = false
    videoView.leftAnchor.constraint(equalTo: safeLeftAnchor).isActive = true
    videoView.rightAnchor.constraint(equalTo: safeRightAnchor).isActive = true
    videoView.topAnchor.constraint(equalTo: safeTopAnchor).isActive = true
    videoView.bottomAnchor.constraint(equalTo: safeBottomAnchor).isActive = true
    videoView.contentMode = .scaleAspectFit
    videoView.layer.masksToBounds = true
    videoView.backgroundColor = .clear
  }

  private func syncMedia() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        return
      }

      self.videoView.media = self.media
      self.syncPlaying()
      self.syncAutoPlay()
    }
  }

  private func syncVolume() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self,
            let _ = self.videoView.media else {
        return
      }

      if (self.muted) {
        self.videoView.mute()
      } else {
        self.videoView.unmute()
      }
    }
  }

  private func syncAutoPlay() {
    DispatchQueue.main.async { [weak self] in
      guard let self = self,
            let _ = self.videoView.media,
            self.autoPlay else {
        return
      }

      GPHVideoView.pauseAll()
      self.videoView.play()
    }
  }

  //TODO: v2 remove
  private func syncPlaying() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self,
            let playing = self.playing,
            let _ = self.videoView.media else {
        return
      }

      if (playing) {
        self.videoView.play()
      } else {
        self.videoView.pause()
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

  //TODO: v2 remove
  @objc func setPlaying(_ value: Bool) -> Void {
    guard playing != value else {
      return
    }
    playing = value
  }

  @objc func setMuted(_ value: Bool) -> Void {
    guard muted != value else {
      return
    }
    muted = value
  }

  //MARK: GPHVideoViewDelegate stubs
  func playerDidFail(_ description: String?) {
    onError?(["description": description ?? ""])
  }

  func playerStateDidChange(_ state: GPHVideoPlayerState) {
    onPlaybackStateChanged?(["state": state.toRNValue()])
    if state == GPHVideoPlayerState.readyToPlay {
      syncVolume()
    }
  }

  func muteDidChange(muted: Bool) {
    if muted {
      onMute?([:])
    } else {
      onUnmute?([:])
    }
  }
}
