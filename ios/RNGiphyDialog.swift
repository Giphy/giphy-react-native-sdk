import GiphyUISDK

@objc(RNGiphyDialogConfig)
class RNGiphyDialogConfig: NSObject {
  var mediaTypeConfig: [GPHContentType]?
  var rating: GPHRatingType?
  var renditionType: GPHRenditionType?
  var showConfirmationScreen: Bool = false

  init(_ maybeOptions: NSDictionary?) {
    guard
      let options = maybeOptions
    else { return }
    
    self.showConfirmationScreen = options["showConfirmationScreen"] as? Bool ?? false
    
    if let rawMediaTypes = options["mediaTypes"] as? [String] {
      self.mediaTypeConfig = (rawMediaTypes
                                .map { GPHContentType.fromRNValue(value: $0) }
                                .filter { $0 != nil } as! [GPHContentType])
    }

    if let rawRating = options["rating"] as? String {
      self.rating = GPHRatingType.fromRNValue(value: rawRating)
    }

    if let rawRenditionType = options["renditionType"] as? String {
      self.renditionType = GPHRenditionType.fromRNValue(value: rawRenditionType)
    }
  }
}

@objc(RNGiphyDialog)
class RNGiphyDialog: NSObject {
  let rootViewController = UIApplication.shared.keyWindow!.rootViewController!
  var giphyViewController: GiphyViewController?
  var config: RNGiphyDialogConfig?

  @objc
  static func requiresMainQueueSetup() -> Bool {
    return true
  }

  @objc(configure:)
  open func configure(options: NSDictionary?) -> Void {
    self.config = RNGiphyDialogConfig(options)
    self.applyConfig(self.giphyViewController)
  }

  @objc
  open func show() -> Void {
    DispatchQueue.main.async {
      let giphy = GiphyViewController()
      self.applyConfig(giphy)
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

  @objc
  private func applyConfig(_ giphyViewController: GiphyViewController?) -> Void {
    guard
      let giphy = giphyViewController,
      let config = self.config
    else { return }
    
    giphy.showConfirmationScreen = config.showConfirmationScreen
    
    if let mediaTypeConfig = config.mediaTypeConfig as? [GPHContentType] {
      giphy.mediaTypeConfig = mediaTypeConfig
    }

    if let rating = config.rating as? GPHRatingType {
      giphy.rating = rating
    }

    if let renditionType = config.renditionType as? GPHRenditionType {
      giphy.renditionType = renditionType
      print(renditionType)
    }
  }
}
