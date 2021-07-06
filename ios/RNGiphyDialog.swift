import GiphyUISDK

struct RNGiphyDialogEvents {
  static let onMediaSelect = "onMediaSelect"
  static let onDismiss = "onDismiss"
}

public extension GiphyViewController {
  func applyRNConfig(_ options: NSDictionary) -> Void {
    if let rawMediaTypeConfig = options["mediaTypeConfig"] as? [String] {
      self.mediaTypeConfig = (rawMediaTypeConfig
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
  }
}

@objc(RNGiphyDialog)
open class RNGiphyDialog: RCTEventEmitter, GiphyDelegate {
  let rootViewController = UIApplication.shared.keyWindow!.rootViewController!
  var giphyViewController: GiphyViewController?
  var config: NSMutableDictionary

  override init() {
    self.config = NSMutableDictionary(dictionary: [:])
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
    self.config.addEntries(from: options as? Dictionary<String,Any> ?? [:])
  }

  @objc
  open func show() -> Void {
    DispatchQueue.main.async {
      let giphy = GiphyViewController()
      giphy.applyRNConfig(self.config)
      giphy.delegate = self
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

  open func didSelectMedia(giphyViewController: GiphyViewController, media: GPHMedia) {
    let rawFileType = self.config["fileType"] as? String
    var fileType: GPHFileExtension = .gif
    if rawFileType != nil {
      fileType = GPHFileExtension.fromRNValue(value: rawFileType!) ?? .gif
    }

    sendEvent(withName: RNGiphyDialogEvents.onMediaSelect, body: [
      "media": media.toRNValue(rendition:self.giphyViewController?.renditionType, fileType:fileType),
    ])
  }

  open func didDismiss(controller: GiphyViewController?) {
    sendEvent(withName: RNGiphyDialogEvents.onDismiss, body: nil)
  }
}
