import UIKit
import GiphyUISDK

extension GPHMedia {
  static func fromRNValue(_ rnValue: NSDictionary?, completion: @escaping (_ result: GPHMedia?) -> Void) {
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

  func toRNValue(rendition: GPHRenditionType? = nil, fileType: GPHFileExtension? = nil) -> NSDictionary {
    var url: String? = self.url
    if rendition != nil || fileType != nil {
      url = self.url(rendition: rendition ?? .fixedWidth, fileType: fileType ?? .gif)
    }

    return [
      "id": id,
      "url": url as Any,
      "aspectRatio": aspectRatio,
      "isVideo": isVideo,
      "isDynamic": isDynamic,
      "data": toGPHJSON(),
    ]
  }

  private func toGPHJSON() -> GPHJSONObject {
    guard let data = try? JSONEncoder().encode(self),
          let rep = try? JSONSerialization.jsonObject(with: data) as? GPHJSONObject else {
      return [:]
    }
    return rep
  }
}
