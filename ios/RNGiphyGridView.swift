import UIKit
import GiphyUISDK

@objc(RNGiphyGridView)
class RNGiphyGridView: UIView, GPHGridDelegate {
  let gridController: GiphyGridController
  @objc var onContentUpdate: RCTDirectEventBlock?
  @objc var onMediaSelect: RCTDirectEventBlock?
  @objc var onScroll: RCTDirectEventBlock?
  
  override init(frame: CGRect) {
    self.gridController = GiphyGridController()
    super.init(frame: frame)
    self.gridController.delegate = self
    self.setupView()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  private func setupView() -> Void {
    self.addSubview(gridController.view)
    
    gridController.view.translatesAutoresizingMaskIntoConstraints = false
    gridController.view.leftAnchor.constraint(equalTo: self.safeLeftAnchor).isActive = true
    gridController.view.rightAnchor.constraint(equalTo: self.safeRightAnchor).isActive = true
    gridController.view.topAnchor.constraint(equalTo: self.safeTopAnchor).isActive = true
    gridController.view.bottomAnchor.constraint(equalTo: self.safeBottomAnchor).isActive = true
  }
  
  //MARK: RN Properties
  @objc func setContent(_ value: NSDictionary) -> Void {
    gridController.content = GPHContent.fromRNValue(value: value)
    gridController.update()
  }
  
  @objc func setCellPadding(_ value: CGFloat) -> Void {
    self.gridController.cellPadding = value
  }
  
  @objc func setClipsPreviewRenditionType(_ value: NSString) -> Void {
    let renditionType = GPHRenditionType.fromRNValue(value: value as String)
    self.gridController.clipsPreviewRenditionType = renditionType ?? .fixedWidth
  }
  
  @objc func setRenditionType(_ value: NSString) -> Void {
    let renditionType = GPHRenditionType.fromRNValue(value: value as String)
    self.gridController.renditionType = renditionType ?? .fixedWidth
  }
  
  @objc func setOrientation(_ value: NSString) -> Void {
    self.gridController.direction = UICollectionView.ScrollDirection.fromRNValue(value: value as String)
  }
  
  @objc func setSpanCount(_ value: NSInteger) -> Void {
    self.gridController.numberOfTracks = value
  }
  
  @objc func setFixedSizeCells(_ value: Bool) -> Void {
    self.gridController.fixedSizeCells = value
  }
  
  //MARK: GPHGridDelegate stubs
  func contentDidUpdate(resultCount: Int, error: Error?) {
    self.onContentUpdate?(["resultCount": resultCount])
  }
  
  func didSelectMedia(media: GPHMedia, cell: UICollectionViewCell) {
    self.onMediaSelect?(["media": media.toRNValue(rendition: self.gridController.renditionType)])
  }
  
  func didScroll(offset: CGFloat) {
    self.onScroll?(["offset": offset])
  }
  
  func didSelectMoreByYou(query: String) {}
}
