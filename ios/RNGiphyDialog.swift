import GiphyUISDK

struct RNGiphyDialogEvents {
  static let onMediaSelect = "onMediaSelect"
  static let onDismiss = "onDismiss"
}

public extension GiphyViewController {
  func applyRNConfig(_ options: NSDictionary) -> Void {
    if let rawMediaTypeConfig = options["mediaTypeConfig"] as? [String] {
      self.mediaTypeConfig = rawMediaTypeConfig.compactMap {
        GPHContentType.fromRNValue(value: $0)
      }
    }

    self.enableDynamicText = options["enableDynamicText"] as? Bool ?? false

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

    let rawSelectedContentType = options["selectedContentType"] as? String
    if let selectedContentType = GPHContentType.fromRNValue(value: rawSelectedContentType) {
      self.selectedContentType = selectedContentType
    }
  }
}

@objc(RNGiphyDialog)
open class RNGiphyDialog: RCTEventEmitter, GiphyDelegate {
  var giphyViewController: GiphyViewController?
  var config: NSMutableDictionary
  
  override init() {
    config = NSMutableDictionary(dictionary: [:])
    super.init()
  }
  
  override public static func requiresMainQueueSetup() -> Bool {
    return true
  }
  
  override public static func moduleName() -> String! {
    return "RNGiphyDialog"
  }
  
  open override func supportedEvents() -> [String]! {
    return [
      RNGiphyDialogEvents.onMediaSelect,
      RNGiphyDialogEvents.onDismiss
    ]
  }
  
  @objc(configure:)
  open func configure(options: NSDictionary) -> Void {
    config.addEntries(from: options as? Dictionary<String, Any> ?? [:])
  }
  
  @objc
  open func show() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        return
      }

      let giphy = GiphyViewController()
      let rootViewController = UIApplication.shared.windows.first?.rootViewController
      giphy.applyRNConfig(self.config)
      giphy.delegate = self
      rootViewController?.present(giphy, animated: true, completion: { [weak self] in
        self?.giphyViewController = giphy
      })
    }
  }
  
  @objc
  open func hide() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        return
      }
      
      self.giphyViewController?.dismiss(animated: true, completion: { [weak self] in
        self?.giphyViewController = nil
      })
    }
  }
  
  open func didSelectMedia(giphyViewController: GiphyViewController, media: GPHMedia) {
    let rawFileType = config["fileType"] as? String
    var fileType: GPHFileExtension = .gif
    if rawFileType != nil {
      fileType = GPHFileExtension.fromRNValue(value: rawFileType!) ?? .gif
    }
    
    sendEvent(withName: RNGiphyDialogEvents.onMediaSelect, body: [
      "media": media.toRNValue(rendition: self.giphyViewController?.renditionType, fileType: fileType),
    ])
  }
  
  open func didDismiss(controller: GiphyViewController?) {
    sendEvent(withName: RNGiphyDialogEvents.onDismiss, body: nil)
  }
}
