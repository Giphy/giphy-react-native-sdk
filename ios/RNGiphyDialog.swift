import GiphyUISDK

public extension GiphyViewController {
  func applyRNConfig(_ options: NSDictionary) -> Void {
    if let rawMediaTypes = options["mediaTypes"] as? [String] {
      self.mediaTypeConfig = (rawMediaTypes
                                .map { GPHContentType.fromRNValue(value: $0) }
                                .filter { $0 != nil } as! [GPHContentType])
    }
    
    let rawRating = options["rating"] as? String
    if let rating = GPHRatingType.fromRNValue(value: rawRating) {
      self.rating = rating
    }
    
    let rawRenditionType = options["renditionType"] as? String
    if let renditionType = GPHRenditionType.fromRNValue(value: rawRenditionType) {
      self.renditionType = renditionType
    }
    
    let showConfirmationScreen = options["showConfirmationScreen"] as? Bool
    if showConfirmationScreen != nil {
      self.showConfirmationScreen = showConfirmationScreen!
    }
    
    let rawStickerColumnCount = options["stickerColumnCount"] as? Int
    if let stickerColumnCount = GPHStickerColumnCount.fromRNValue(value: rawStickerColumnCount) {
      self.stickerColumnCount = stickerColumnCount
    }
    
    let rawTheme = options["theme"] as? String
    if let theme = GPHTheme.fromRNValue(value: rawTheme) {
      self.theme = theme
    }
    
    let shouldLocalizeSearch = options["shouldLocalizeSearch"] as? Bool
    if shouldLocalizeSearch != nil {
      self.shouldLocalizeSearch = shouldLocalizeSearch!
    }
    
    let trayHeightMultiplier = options["trayHeightMultiplier"] as? CGFloat
    if trayHeightMultiplier != nil {
      GiphyViewController.trayHeightMultiplier = trayHeightMultiplier!
    }
    
    //    debugPrint("mediaTypeConfig", config.mediaTypeConfig, giphy.mediaTypeConfig)
    //    debugPrint("rating", config.rating, giphy.rating)
    //    debugPrint("renditionType", config.renditionType, giphy.renditionType)
        debugPrint("showConfirmationScreen", showConfirmationScreen, self.showConfirmationScreen)
    //    debugPrint("stickerColumnCount", config.stickerColumnCount, giphy.stickerColumnCount)
    //    debugPrint("shouldLocalizeSearch", config.shouldLocalizeSearch, giphy.shouldLocalizeSearch)
    //    debugPrint("trayHeightMultiplier", config.trayHeightMultiplier, GiphyViewController.trayHeightMultiplier)
    
  }
}



@objc(RNGiphyDialog)
class RNGiphyDialog: NSObject {
  let rootViewController = UIApplication.shared.keyWindow!.rootViewController!
  var giphyViewController: GiphyViewController?
  var config: NSMutableDictionary
  
  override init() {
    self.config = NSMutableDictionary(dictionary: [:])
    super.init()
  }
  
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  @objc(configure:)
  open func configure(options: NSDictionary?) -> Void {
    self.config.addEntries(from: options as? Dictionary<String,Any> ?? [:])
    if let giphy = self.giphyViewController {
      giphy.applyRNConfig(self.config)
    }
  }
  
  @objc
  open func show() -> Void {
    DispatchQueue.main.async {
      let giphy = GiphyViewController()
      giphy.applyRNConfig(self.config)
      self.rootViewController.present(giphy, animated: true, completion: {
        self.giphyViewController = giphy
      })
    }
  }
  
  @objc
  open func hide() -> Void {
    DispatchQueue.main.async {
      self.giphyViewController?.dismiss(animated: true, completion: {
        self.giphyViewController = nil
      })
    }
  }
  
}
