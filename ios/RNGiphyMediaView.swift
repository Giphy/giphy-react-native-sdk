import UIKit
import GiphyUISDK

let DEFAULT_RENDTION_TYPE: GPHRenditionType = .fixedWidth

func giphyMediaByRNValue(_ rnValue: NSDictionary?, completion: @escaping (_ result: GPHMedia?) -> Void) {
  guard
    let options = rnValue,
    let mediaId = options["id"] as? String
  else {
    completion(nil)
    return
  }
  
  GiphyCore.shared.gifByID(mediaId) { (response, error) in
    completion(response?.data)
  }
}

class RNGiphyMediaView: UIView {
  private var media: GPHMedia? {
    didSet { self.updateMediaViewSource() }
  }
  
  private var renditionType: GPHRenditionType {
    didSet { self.updateMediaViewSource() }
  }
  
  override init(frame: CGRect) {
    self.renditionType = DEFAULT_RENDTION_TYPE
    super.init(frame: frame)
    self.setupView()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  override public func layoutSubviews() {
      super.layoutSubviews()
      let frame = CGRect(x: 0, y: 0, width: self.frame.width, height: self.frame.height)
      self.mediaView.frame = frame
  }
  
  lazy var mediaView: GPHMediaView = {
    return GPHMediaView()
  }()
  
  @objc func setMedia(_ rnValue: NSDictionary?) -> Void {
    giphyMediaByRNValue(rnValue) { self.media = $0 }
  }
  
  @objc func setRenditionType(_ rnValue: NSString?) -> Void {
    let value = rnValue as String?
    if (value == nil) {
      self.renditionType = DEFAULT_RENDTION_TYPE
    } else {
      self.renditionType = GPHRenditionType.fromRNValue(value: value!) ?? DEFAULT_RENDTION_TYPE
    }
  }
  
  private func setupView() -> Void {
    self.addSubview(self.mediaView)
  }
  
  private func updateMediaViewSource() -> Void {
    DispatchQueue.main.async {
      if self.media == nil {
        self.mediaView.media = self.media
      } else {
        self.mediaView.setMedia(self.media!, rendition: self.renditionType)
      }
    }
  }
}
