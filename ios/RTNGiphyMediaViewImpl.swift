import UIKit
import GiphyUISDK

open class RTNGiphyMediaViewImpl: UIView {
  static let DEFAULT_RENDITION_TYPE: GPHRenditionType = .fixedWidth

  //MARK: RN Event Handlers
  @objc public var onError: ((_ data: NSDictionary) -> Void)? = nil
  @objc public var onLoad: ((_ data: NSDictionary) -> Void)? = nil

  private var requestedMediaId: String?
  // The media the SDK view is loading, and the last one reported as loaded.
  private var loadingMediaId: String?
  private var reportedLoadMediaId: String?
  private var imageObservation: NSKeyValueObservation?

  private var media: GPHMedia? {
    didSet {
      syncMediaViewSource()
    }
  }

  private var renditionType: GPHRenditionType = RTNGiphyMediaViewImpl.DEFAULT_RENDITION_TYPE {
    didSet {
      syncMediaViewSource()
    }
  }

  private var resizeMode: ResizeMode = ResizeMode.defaultMode {
    didSet {
      adjustResizeMode()
    }
  }

  override init(frame: CGRect) {
    super.init(frame: frame)
    setupView()
    adjustResizeMode()
  }

  required public init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  let mediaView: GPHMediaView = {
    return GPHMediaView()
  }()

  @objc
  public func pause() {
    mediaView.stopAnimating()
  }

  @objc
  public func resume() {
    mediaView.startAnimating()
  }

  @objc
  public func setMediaId(_ rnValue: NSString?) -> Void {
    requestedMediaId = rnValue as? String
    reportedLoadMediaId = nil
    guard
        let mediaId = rnValue as? String
    else {
      media = nil
      return
    }

    GiphyCore.shared.gifByID(mediaId) { [weak self] (response, error) in
      // The SDK calls back on the main queue. Ignore the answer for media that is no longer requested.
      guard let self = self, self.requestedMediaId == mediaId else {
        return
      }
      self.media = response?.data
      if response?.data == nil {
        self.reportLoadError(mediaId: mediaId, error: error)
      }
    }
  }

  private func reportLoadError(mediaId: String, error: Error?) -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self, self.requestedMediaId == mediaId else {
        return
      }

      self.onError?(["description": error?.localizedDescription ?? "Media not found: \(mediaId)"])
    }
  }

  @objc
  public func setAutoPlay(_ rnValue: Bool) -> Void {
    mediaView.autoPlayAnimatedImage = rnValue
  }

  @objc
  public func setRenditionType(_ rnValue: NSString) -> Void {
    let value = rnValue as String?
    if (value == nil) {
      renditionType = RTNGiphyMediaViewImpl.DEFAULT_RENDITION_TYPE
    } else {
      renditionType = GPHRenditionType.fromRNValue(value: value!) ?? RTNGiphyMediaViewImpl.DEFAULT_RENDITION_TYPE
    }
  }

  @objc
  public func setResizeMode(_ rnValue: NSString) -> Void {
    resizeMode = ResizeMode.fromRNValue(value: rnValue as String?) ?? ResizeMode.defaultMode
  }

  private func setupView() -> Void {
    addSubview(mediaView)

    // The SDK has no load callback, but it sets the image once it is downloaded.
    imageObservation = mediaView.observe(\.image) { [weak self] view, _ in
      guard view.image != nil else {
        return
      }
      // Check right away: the media can change before a deferred check runs.
      if Thread.isMainThread {
        self?.reportLoad()
      } else {
        DispatchQueue.main.async {
          self?.reportLoad()
        }
      }
    }

    mediaView.clipsToBounds = true
    mediaView.translatesAutoresizingMaskIntoConstraints = false
    mediaView.leftAnchor.constraint(equalTo: safeLeftAnchor).isActive = true
    mediaView.rightAnchor.constraint(equalTo: safeRightAnchor).isActive = true
    mediaView.topAnchor.constraint(equalTo: safeTopAnchor).isActive = true
    mediaView.bottomAnchor.constraint(equalTo: safeBottomAnchor).isActive = true
  }

  private func adjustResizeMode() -> Void {
    switch resizeMode {
    case .center:
      mediaView.contentMode = .center
    case .contain:
      mediaView.contentMode = .scaleAspectFit
    case .cover:
      mediaView.contentMode = .scaleAspectFill
    case .stretch:
      mediaView.contentMode = .scaleToFill
    }
  }

  private func syncMediaViewSource() -> Void {
    DispatchQueue.main.async { [weak self] in
      guard let self = self else {
        return
      }

      guard let media = self.media else {
        self.loadingMediaId = nil
        // The SDK view ignores a nil media, so clear it explicitly.
        self.mediaView.cancelLoading()
        return
      }

      // Set first: a cached image is set before setMedia returns. The SDK ignores the images of
      // earlier loads, so every image after this belongs to this media.
      self.loadingMediaId = media.id
      self.mediaView.setMedia(media, rendition: self.renditionType)
    }
  }

  // Reports a load once per requested media, not again when a rendition change reloads it.
  private func reportLoad() -> Void {
    guard let mediaId = loadingMediaId,
          mediaId == requestedMediaId,
          mediaId != reportedLoadMediaId
    else {
      return
    }

    reportedLoadMediaId = mediaId
    onLoad?([:])
  }
}
