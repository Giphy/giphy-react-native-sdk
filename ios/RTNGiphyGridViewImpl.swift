import UIKit
import GiphyUISDK

@objc
open class RTNGiphyGridViewImpl: UIView {
  //MARK: RN Event Handlers
  @objc
  public var onContentUpdate: ((_ data: NSDictionary) -> Void)? = nil
  @objc
  public var onMediaSelect: ((_ data: NSDictionary) -> Void)? = nil
  @objc
  public var onScroll: ((_ data: NSDictionary) -> Void)? = nil
  
  let gridController: GiphyGridController
  var gridControllerDelegate: RTNGiphyGridDelegate?

  override init(frame: CGRect) {
    gridController = GiphyGridController()
    super.init(frame: frame)
    gridControllerDelegate = RTNGiphyGridDelegate(view: self)
    gridController.delegate = gridControllerDelegate
    setupView()
  }

  required public init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }

  deinit {
    gridController.delegate = nil
    gridControllerDelegate = nil
  }

  private func setupView() -> Void {
    addSubview(gridController.view)

    gridController.view.translatesAutoresizingMaskIntoConstraints = false
    gridController.view.leftAnchor.constraint(equalTo: safeLeftAnchor).isActive = true
    gridController.view.rightAnchor.constraint(equalTo: safeRightAnchor).isActive = true
    gridController.view.topAnchor.constraint(equalTo: safeTopAnchor).isActive = true
    gridController.view.bottomAnchor.constraint(equalTo: safeBottomAnchor).isActive = true
  }

  //MARK: RN Properties
  @objc
  public func setContent(_ value: NSDictionary) -> Void {
    let rating = GPHRatingType.fromRNValue(value: value["rating"] as? String)
    gridController.rating = rating ?? GPHRatingType.ratedPG13
    gridController.content = GPHContent.fromRNValue(value: value)
    gridController.update()
  }

  @objc
  public func setCellPadding(_ value: CGFloat) -> Void {
    gridController.cellPadding = value
  }

  @objc
  public func setClipsPreviewRenditionType(_ value: NSString) -> Void {
    let renditionType = GPHRenditionType.fromRNValue(value: value as String)
    gridController.clipsPreviewRenditionType = renditionType ?? .fixedWidth
  }

  @objc
  public func setRenditionType(_ value: NSString) -> Void {
    let renditionType = GPHRenditionType.fromRNValue(value: value as String)
    gridController.renditionType = renditionType ?? .fixedWidth
  }

  @objc
  public func setOrientation(_ value: NSString) -> Void {
    gridController.direction = UICollectionView.ScrollDirection.fromRNValue(value: value as String)
  }

  @objc
  public func setSpanCount(_ value: NSInteger) -> Void {
    gridController.numberOfTracks = value
  }

  @objc
  public func setFixedSizeCells(_ value: Bool) -> Void {
    gridController.fixedSizeCells = value
  }

  @objc
  public func setTheme(_ value: NSDictionary) -> Void {
    gridController.theme = RTNGiphyTheme(rnConfig: value)
  }
}

class RTNGiphyGridDelegate: GPHGridDelegate {
  private weak var view: RTNGiphyGridViewImpl?

  init(view: RTNGiphyGridViewImpl) {
    self.view = view
  }
  
  //MARK: GPHGridDelegate stubs
  public func contentDidUpdate(resultCount: Int, error: Error?) {
    view?.onContentUpdate?(["resultCount": resultCount])
  }

  public func didSelectMedia(media: GPHMedia, cell: UICollectionViewCell) {
    let mediaData = media.toRNValue(rendition: view?.gridController.renditionType)
    view?.onMediaSelect?(["media": RCTJSONStringify(mediaData, nil) ?? ""])
  }

  public func didScroll(offset: CGFloat) {
    view?.onScroll?(["offset": offset])
  }

  public func didSelectMoreByYou(query: String) {
  }
}
