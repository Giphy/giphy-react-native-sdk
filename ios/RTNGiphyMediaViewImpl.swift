import UIKit
import GiphyUISDK

@objc
open class RTNGiphyMediaViewImpl: UIView {
  static let DEFAULT_RENDITION_TYPE: GPHRenditionType = .fixedWidth

  private var media: GPHMedia? {
    didSet {
      syncMediaViewSource()
    }
  }

  private var renditionType: GPHRenditionType = RTNGiphyMediaViewImpl.DEFAULT_RENDITION_TYPE {
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

  required public init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  let mediaView: GPHMediaView = {
    return GPHMediaView()
  }()

  @objc
  public func pause() {
    mediaView.stopAnimating()
  }

  @objc
  public func resume() {
    mediaView.startAnimating()
  }

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
  public func setAutoPlay(_ rnValue: Bool) -> Void {
    mediaView.autoPlayAnimatedImage = rnValue
  }

  @objc
  public func setRenditionType(_ rnValue: NSString) -> Void {
    let value = rnValue as String?
    if (value == nil) {
      renditionType = RTNGiphyMediaViewImpl.DEFAULT_RENDITION_TYPE
    } else {
      renditionType = GPHRenditionType.fromRNValue(value: value!) ?? RTNGiphyMediaViewImpl.DEFAULT_RENDITION_TYPE
    }
  }

  @objc
  public func setResizeMode(_ rnValue: NSString) -> Void {
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
