import UIKit
import GiphyUISDK

func getMediaByRNValue(_ rnMedia: NSDictionary?, completion: @escaping (_ result: GPHMedia?) -> Void) {
  guard
    let options = rnMedia,
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
  override init(frame: CGRect) {
    super.init(frame: frame)
    self.mediaView.frame = frame
    self.addSubview(self.mediaView)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  lazy var mediaView: GPHMediaView = {
    return GPHMediaView()
  }()
  
  @objc func setMedia(_ rnMedia: NSDictionary?) {
    getMediaByRNValue(rnMedia) { media in
      DispatchQueue.main.async {
        self.mediaView.media = media
        self.mediaView.frame = self.frame
      }
    }
  }
}
