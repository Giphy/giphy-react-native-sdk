import UIKit

import GiphyUISDK

public extension GPHContentType {
  static func fromRNValue(value: String?) -> GPHContentType? {
    switch value {
    case "emoji":
      return .emoji
    case "gif":
      return .gifs
    case "recents":
      return .recents
    case "sticker":
      return .stickers
    case "text":
      return .text
    case "clips":
      return .clips
    default:
      return nil
    }
  }
}

public extension GPHRatingType {
  static func fromRNValue(value: String?) -> GPHRatingType? {
    switch value {
    case "g":
      return .ratedG
    case "pg":
      return .ratedPG
    case "pg-13":
      return .ratedPG13
    case "r":
      return .ratedR
    case "unrated":
      return .unrated
    case "y":
      return .ratedY
    default:
      return nil
    }
  }
}

public extension GPHRenditionType {
  static func fromRNValue(value: String?) -> GPHRenditionType? {
    switch value {
    case "original":
      return .original
    case "original_still":
      return .originalStill
    case "preview":
      return .preview
    case "looping":
      return .looping
    case "fixed_height":
      return .fixedHeight
    case "fixed_height_still":
      return .fixedHeightStill
    case "fixed_height_downsampled":
      return .fixedHeightDownsampled
    case "fixed_height_small":
      return .fixedHeightSmall
    case "fixed_height_small_still":
      return .fixedHeightSmallStill
    case "fixed_width":
      return .fixedWidth
    case "fixed_width_still":
      return .fixedWidthStill
    case "fixed_width_downsampled":
      return .fixedWidthDownsampled
    case "fixed_width_small":
      return .fixedWidthSmall
    case "fixed_width_small_still":
      return .fixedWidthSmallStill
    case "downsized":
      return .downsized
    case "downsized_small":
      return .downsizedSmall
    case "downsized_medium":
      return .downsizedMedium
    case "downsized_large":
      return .downsizedLarge
    case "downsized_still":
      return .downsizedStill
    default:
      return nil
    }
  }
}

public extension GPHStickerColumnCount {
  static func fromRNValue(value: Int?) -> GPHStickerColumnCount? {
    switch value {
    case 2:
      return .two
    case 3:
      return .three
    case 4:
      return .four
    default:
      return nil
    }
  }
}

public extension GPHFileExtension {
  static func fromRNValue(value: String) -> GPHFileExtension? {
    switch value {
    case "gif":
      return .gif
    case "mp4":
      return .mp4
    case "webp":
      return .webp
    default:
      return nil
    }
  }
}

public extension UICollectionView.ScrollDirection {
  static func fromRNValue(value: String) -> UICollectionView.ScrollDirection {
    switch value {
    case "horizontal":
      return .horizontal
    case "vertical":
      return .vertical
    default:
      return .vertical
    }
  }
}

public extension UIKeyboardAppearance {
  static func fromRNValue(_ value: String) -> UIKeyboardAppearance? {
    switch value {
    case "default":
      return .default
    case "dark":
      return .dark
    case "light":
      return .light
    default:
      return nil
    }
  }
}

public extension UIScrollView.IndicatorStyle {
  static func fromRNValue(_ value: String) -> UIScrollView.IndicatorStyle? {
    switch value {
    case "default":
      return .default
    case "dark":
      return .black
    case "light":
      return .white
    default:
      return nil
    }
  }
}

public extension GPHMediaType {
  static func fromRNValue(value: String) -> GPHMediaType {
    return GPHMediaType.init(rawValue: value) ?? .gif
  }
}

public extension GPHContent {
  static func fromRNValue(value: NSDictionary) -> GPHContent {
    let requestType = value["requestType"] as? String
    let searchQuery = value["searchQuery"] as? String ?? ""
    let mediaType = GPHMediaType.fromRNValue(value: value["mediaType"] as? String ?? "")

    switch requestType {
    case "search":
      return GPHContent.search(withQuery: searchQuery, mediaType: mediaType, language: .english)
    case "trending":
      return GPHContent.trending(mediaType: mediaType)
    case "emoji":
      return GPHContent.emoji
    case "recents":
      return GPHContent.recents
    case "animate":
      return GPHContent.animate(searchQuery)
    default:
      return GPHContent()
    }
  }
}

public enum RNGPHVideoPlayerState: Int {
  case unknown = 0
  case readyToPlay = 3
  case playing = 4
  case paused = 5

  func toRNValue() -> Int {
    return self.rawValue
  }
}

public extension GPHVideoPlayerState {
  func toRNValue() -> Int {
    var rnState: RNGPHVideoPlayerState {
      switch self {
      case .readyToPlay:
        return RNGPHVideoPlayerState.readyToPlay
      case .playing:
        return RNGPHVideoPlayerState.playing
      case .paused:
        return RNGPHVideoPlayerState.paused
      case .unknown:
        return RNGPHVideoPlayerState.unknown
      default:
        return RNGPHVideoPlayerState.unknown
      }
    }
    return rnState.toRNValue()
  }
}

public extension GPHThemeType {
  static func fromRNValue(_ value: String) -> GPHThemeType? {
    switch value {
    case "automatic":
      return .automatic
    case "dark":
      return .dark
    case "light":
      return .light
    default:
      return nil
    }
  }
}

public extension GiphyViewController {
  func applyRNConfig(_ options: NSDictionary) -> Void {
    if let rawMediaTypeConfig = options["mediaTypeConfig"] as? [String] {
      mediaTypeConfig = rawMediaTypeConfig.compactMap {
        GPHContentType.fromRNValue(value: $0)
      }
    }

    enableDynamicText = options["enableDynamicText"] as? Bool ?? false
    theme = RTNGiphyTheme(rnConfig: options["theme"] as? NSDictionary)

    let rawRating = options["rating"] as? String
    if let rating = GPHRatingType.fromRNValue(value: rawRating) {
      self.rating = rating
    }
    
    let rawRenditionType = options["renditionType"] as? String
    if let renditionType = GPHRenditionType.fromRNValue(value: rawRenditionType) {
      self.renditionType = renditionType
    }
    
    let rawClipsPreviewRenditionType = options["clipsPreviewRenditionType"] as? String
    if let clipsPreviewRenditionType = GPHRenditionType.fromRNValue(value: rawClipsPreviewRenditionType) {
      self.clipsPreviewRenditionType = clipsPreviewRenditionType
    }
    
    let showConfirmationScreen = options["showConfirmationScreen"] as? Bool
    if showConfirmationScreen != nil {
      self.showConfirmationScreen = showConfirmationScreen!
    }
    
    let rawStickerColumnCount = options["stickerColumnCount"] as? Int
    if let stickerColumnCount = GPHStickerColumnCount.fromRNValue(value: rawStickerColumnCount) {
      self.stickerColumnCount = stickerColumnCount
    }
    
    let shouldLocalizeSearch = options["shouldLocalizeSearch"] as? Bool
    if shouldLocalizeSearch != nil {
      self.shouldLocalizeSearch = shouldLocalizeSearch!
    }
    
    let trayHeightMultiplier = options["trayHeightMultiplier"] as? CGFloat
    if trayHeightMultiplier != nil {
      GiphyViewController.trayHeightMultiplier = trayHeightMultiplier!
    }
    
    let rawSelectedContentType = options["selectedContentType"] as? String
    if let selectedContentType = GPHContentType.fromRNValue(value: rawSelectedContentType) {
      self.selectedContentType = selectedContentType
    }
  }
}
