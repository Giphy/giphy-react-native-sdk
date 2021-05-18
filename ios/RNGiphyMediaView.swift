import UIKit
import GiphyUISDK

class RNGiphyMediaView: UIView {
  @objc private var media: GPHMedia?
  
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.addSubview(mediaView)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  lazy var mediaView: GPHMediaView = {
    return GPHMediaView()
  }()
}
