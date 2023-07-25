import GiphyUISDK

@objc
public protocol RTNGiphyDialogModuleDelegate {
  func sendEvent(name: String, result: NSDictionary)
}

@objc
open class RTNGiphyDialogModuleImpl: NSObject {
  @objc
  public weak var rtnDelegate: RTNGiphyDialogModuleDelegate? = nil

  var config: NSMutableDictionary
  var giphyViewController: GiphyViewController?
  var giphyDelegate: RTNGiphyDialogDelegate?

  @objc
  override public init() {
    config = NSMutableDictionary(dictionary: [:])
    super.init()
    giphyDelegate = RTNGiphyDialogDelegate(module: self)
  }

  deinit {
    giphyDelegate = nil
  }

  @objc(configure:)
  public func configure(options: NSDictionary) -> Void {
    config.addEntries(from: options as? Dictionary<String, Any> ?? [:])
  }

  @objc
  public func show() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        return
      }

      let giphy = GiphyViewController()
      let rootViewController = UIApplication.shared.windows.first?.rootViewController
      giphy.applyRNConfig(self.config)
      giphy.delegate = self.giphyDelegate
      rootViewController?.present(giphy, animated: true, completion: { [weak self] in
        self?.giphyViewController = giphy
      })
    }
  }

  @objc
  public func hide() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        return
      }

      self.giphyViewController?.dismiss(animated: true, completion: { [weak self] in
        self?.giphyViewController = nil
      })
    }
  }
}

extension RTNGiphyDialogModuleImpl {
  enum Event: String, CaseIterable {
    case onMediaSelect
    case onDismiss
  }

  @objc
  static public var supportedEvents: [String] {
    return Event.allCases.map(\.rawValue);
  }
}

class RTNGiphyDialogDelegate: GiphyDelegate {
  private let module: RTNGiphyDialogModuleImpl

  init(module: RTNGiphyDialogModuleImpl) {
    self.module = module
  }

  open func didSelectMedia(giphyViewController: GiphyViewController, media: GPHMedia) {
    let rawFileType = module.config["fileType"] as? String
    var fileType: GPHFileExtension = .gif
    if rawFileType != nil {
      fileType = GPHFileExtension.fromRNValue(value: rawFileType!) ?? .gif
    }

    let mediaData = media.toRNValue(rendition: module.giphyViewController?.renditionType,
        fileType: fileType)
    module.rtnDelegate?.sendEvent(
        name: RTNGiphyDialogModuleImpl.Event.onMediaSelect.rawValue,
        result: ["media": mediaData]
    );
  }

  open func didDismiss(controller: GiphyViewController?) {
    module.rtnDelegate?.sendEvent(
        name: RTNGiphyDialogModuleImpl.Event.onDismiss.rawValue,
        result: [:]
    );
  }
}
