import UIKit
import GiphyUISDK

class RNGiphyMediaView: UIView {
  static let DEFAULT_RENDITION_TYPE: GPHRenditionType = .fixedWidth

  private var media: GPHMedia? {
    didSet { self.updateMediaViewSource() }
  }

  private var renditionType: GPHRenditionType = RNGiphyMediaView.DEFAULT_RENDITION_TYPE {
    didSet { self.updateMediaViewSource() }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    self.setupView()
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  lazy var mediaView: GPHMediaView = {
    return GPHMediaView()
  }()

  @objc func setMedia(_ rnValue: NSDictionary) -> Void {
    GPHMedia.fromRNValue(rnValue) { self.media = $0 }
  }

  @objc func setRenditionType(_ rnValue: NSString) -> Void {
    let value = rnValue as String?
    if (value == nil) {
      self.renditionType = RNGiphyMediaView.DEFAULT_RENDITION_TYPE
    } else {
      self.renditionType = GPHRenditionType.fromRNValue(value: value!) ?? RNGiphyMediaView.DEFAULT_RENDITION_TYPE
    }
  }

  private func setupView() -> Void {
    self.addSubview(self.mediaView)

    self.mediaView.translatesAutoresizingMaskIntoConstraints = false
    self.mediaView.leftAnchor.constraint(equalTo: self.safeLeftAnchor).isActive = true
    self.mediaView.rightAnchor.constraint(equalTo: self.safeRightAnchor).isActive = true
    self.mediaView.topAnchor.constraint(equalTo: self.safeTopAnchor).isActive = true
    self.mediaView.bottomAnchor.constraint(equalTo: self.safeBottomAnchor).isActive = true
  }

  private func updateMediaViewSource() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else { return }

      if self.media == nil {
        self.mediaView.media = self.media
      } else {
        self.mediaView.setMedia(self.media!, rendition: self.renditionType)
      }
    }
  }
}
