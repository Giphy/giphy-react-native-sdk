import UIKit
import GiphyUISDK

extension GPHMedia {
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
