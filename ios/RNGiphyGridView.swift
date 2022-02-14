import UIKit
import GiphyUISDK

@objc(RNGiphyGridView)
class RNGiphyGridView: UIView, GPHGridDelegate {
  let gridController: GiphyGridController
  @objc var onContentUpdate: RCTDirectEventBlock?
  @objc var onMediaSelect: RCTDirectEventBlock?
  @objc var onScroll: RCTDirectEventBlock?

  override init(frame: CGRect) {
    gridController = GiphyGridController()
    super.init(frame: frame)
    gridController.delegate = self
    setupView()
  }

  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
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
  @objc func setContent(_ value: NSDictionary) -> Void {
    let rating = GPHRatingType.fromRNValue(value: value["rating"] as? String)
    gridController.rating = rating ?? GPHRatingType.ratedPG13
    gridController.content = GPHContent.fromRNValue(value: value)
    gridController.update()
  }

  @objc func setCellPadding(_ value: CGFloat) -> Void {
    gridController.cellPadding = value
  }

  @objc func setClipsPreviewRenditionType(_ value: NSString) -> Void {
    let renditionType = GPHRenditionType.fromRNValue(value: value as String)
    gridController.clipsPreviewRenditionType = renditionType ?? .fixedWidth
  }

  @objc func setRenditionType(_ value: NSString) -> Void {
    let renditionType = GPHRenditionType.fromRNValue(value: value as String)
    gridController.renditionType = renditionType ?? .fixedWidth
  }

  @objc func setOrientation(_ value: NSString) -> Void {
    gridController.direction = UICollectionView.ScrollDirection.fromRNValue(value: value as String)
  }

  @objc func setSpanCount(_ value: NSInteger) -> Void {
    gridController.numberOfTracks = value
  }

  @objc func setFixedSizeCells(_ value: Bool) -> Void {
    gridController.fixedSizeCells = value
  }

  //MARK: GPHGridDelegate stubs
  func contentDidUpdate(resultCount: Int, error: Error?) {
    onContentUpdate?(["resultCount": resultCount])
  }

  func didSelectMedia(media: GPHMedia, cell: UICollectionViewCell) {
    onMediaSelect?(["media": media.toRNValue(rendition: gridController.renditionType)])
  }

  func didScroll(offset: CGFloat) {
    onScroll?(["offset": offset])
  }

  func didSelectMoreByYou(query: String) {
  }
}
