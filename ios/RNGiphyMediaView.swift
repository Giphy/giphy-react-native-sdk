import UIKit
import GiphyUISDK

class RNGiphyMediaView: UIView {
  static let DEFAULT_RENDITION_TYPE: GPHRenditionType = .fixedWidth

  private var media: GPHMedia? {
    didSet {
      syncMediaViewSource()
    }
  }

  private var renditionType: GPHRenditionType = RNGiphyMediaView.DEFAULT_RENDITION_TYPE {
    didSet {
      syncMediaViewSource()
    }
  }

  private var resizeMode: ResizeMode = ResizeMode.defaultMode {
    didSet {
      adjustResizeMode()
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    setupView()
    adjustResizeMode()
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  let mediaView: GPHMediaView = {
    return GPHMediaView()
  }()

  func pause() {
    mediaView.stopAnimating()
  }

  func resume() {
    mediaView.startAnimating()
  }

  @objc func setMedia(_ rnValue: NSDictionary) -> Void {
    GPHMedia.fromRNValue(rnValue) { [weak self] in
      guard let self = self else {
        return
      }
      self.media = $0
    }
  }

  @objc func setAutoPlay(_ rnValue: Bool) -> Void {
    mediaView.autoPlayAnimatedImage = rnValue
  }

  @objc func setRenditionType(_ rnValue: NSString) -> Void {
    let value = rnValue as String?
    if (value == nil) {
      renditionType = RNGiphyMediaView.DEFAULT_RENDITION_TYPE
    } else {
      renditionType = GPHRenditionType.fromRNValue(value: value!) ?? RNGiphyMediaView.DEFAULT_RENDITION_TYPE
    }
  }

  @objc func setResizeMode(_ rnValue: NSString) -> Void {
    resizeMode = ResizeMode.fromRNValue(value: rnValue as String?) ?? ResizeMode.defaultMode
  }

  private func setupView() -> Void {
    addSubview(mediaView)

    mediaView.clipsToBounds = true
    mediaView.translatesAutoresizingMaskIntoConstraints = false
    mediaView.leftAnchor.constraint(equalTo: safeLeftAnchor).isActive = true
    mediaView.rightAnchor.constraint(equalTo: safeRightAnchor).isActive = true
    mediaView.topAnchor.constraint(equalTo: safeTopAnchor).isActive = true
    mediaView.bottomAnchor.constraint(equalTo: safeBottomAnchor).isActive = true
  }

  private func adjustResizeMode() -> Void {
    switch resizeMode {
    case .center:
      mediaView.contentMode = .center
    case .contain:
      mediaView.contentMode = .scaleAspectFit
    case .cover:
      mediaView.contentMode = .scaleAspectFill
    case .stretch:
      mediaView.contentMode = .scaleToFill
    }
  }

  private func syncMediaViewSource() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        return
      }

      if self.media == nil {
        self.mediaView.media = self.media
      } else {
        self.mediaView.setMedia(self.media!, rendition: self.renditionType)
      }
    }
  }
}
