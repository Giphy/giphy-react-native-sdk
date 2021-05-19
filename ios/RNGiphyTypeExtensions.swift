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

public extension GPHTheme {
  static func fromRNValue(value: String?) -> GPHTheme? {
    switch value {
    case "automatic":
      return GPHTheme(type: .automatic)
    case "dark":
      return GPHTheme(type: .dark)
    case "light":
      return GPHTheme(type: .light)
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
