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
    didSet { self.updateMedia() }
  }
  
  private var muted: Bool = false {
    didSet { self.updateVolume() }
  }
  
  //TODO: v2 remove
  private var playing: Bool? = nil {
    didSet { self.updatePlaying() }
  }
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.videoView.delegate = self
    self.setupView()
    self.updateMedia()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  lazy var videoView: GPHVideoView = {
    return GPHVideoView()
  }()
  
  private func setupView() -> Void {
    self.addSubview(self.videoView)
    
    self.videoView.translatesAutoresizingMaskIntoConstraints = false
    self.videoView.leftAnchor.constraint(equalTo: self.safeLeftAnchor).isActive = true
    self.videoView.rightAnchor.constraint(equalTo: self.safeRightAnchor).isActive = true
    self.videoView.topAnchor.constraint(equalTo: self.safeTopAnchor).isActive = true
    self.videoView.bottomAnchor.constraint(equalTo: self.safeBottomAnchor).isActive = true
    self.videoView.contentMode = .scaleAspectFit
    self.videoView.layer.masksToBounds = true
    self.videoView.backgroundColor = .clear
  }
  
  private func updateMedia() -> Void {
    DispatchQueue.main.async {
      if (self.videoView.media == self.media) {
        return
      }
      
      self.videoView.media = self.media
      if self.autoPlay {
        self.playOnlyCurrentMedia()
      }
      self.updatePlaying()
      self.updateVolume()
    }
  }
  
  private func updateVolume() -> Void {
    DispatchQueue.main.async {
      if self.videoView.media == nil {
        return
      }
      
      if (self.muted) {
        self.videoView.mute()
      } else {
        self.videoView.unmute()
      }
    }
  }
  
  private func playOnlyCurrentMedia() {
    GPHVideoView.pauseAll()
    DispatchQueue.main.async {
      self.videoView.play()
    }
  }

  //TODO: v2 remove
  private func updatePlaying() -> Void {
    DispatchQueue.main.async {
      guard let playing = self.playing,
            self.videoView.media != nil else {
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
    GPHMedia.fromRNValue(rnValue) { self.media = $0 }
  }
  
  //TODO: v2 remove
  @objc func setPlaying(_ value: Bool) -> Void {
    if self.playing == value {
      return
    }
    self.playing = value
  }
  
  @objc func setMuted(_ value: Bool) -> Void {
    if self.muted == value {
      return
    }
    self.muted = value
  }
  
  //MARK: GPHVideoViewDelegate stubs
  func playerDidFail(_ description: String?) {
    self.onError?(["description": description ?? ""])
  }
  
  func playerStateDidChange(_ state: GPHVideoPlayerState) {
    self.onPlaybackStateChanged?(["state": state.toRNValue()])
  }
  
  func muteDidChange(muted: Bool) {
    if muted {
      self.onMute?([:])
    } else {
      self.onUnmute?([:])
    }
  }
}
