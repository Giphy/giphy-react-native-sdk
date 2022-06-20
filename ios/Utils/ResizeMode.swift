public enum ResizeMode: Int {
  case center = 1
  case contain = 2
  case cover = 3
  case stretch = 4

  static let defaultMode: ResizeMode = .cover

  static func fromRNValue(value: String?) -> ResizeMode? {
    switch value {
    case "center":
      return .center
    case "contain":
      return .contain
    case "cover":
      return .cover
    case "stretch":
      return .stretch
    default:
      return nil
    }
  }
}
