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
  
  @objc func setOrientation(_ value: NSString) -> Void {
    self.gridController.direction = UICollectionView.ScrollDirection.fromRNValue(value: value as String)
  }
  
  @objc func setSpanCount(_ value: Int) -> Void {
    self.gridController.numberOfTracks = value
  }
  
  @objc func setFixedSizeCells(_ value: Bool) -> Void {
    self.gridController.fixedSizeCells = value
  }
  
  
  //MARK: GPHGridDelegate stubs
  func contentDidUpdate(resultCount: Int,error: Error?) {
    if self.onContentUpdate != nil {
      self.onContentUpdate!(["resultCount": resultCount])
    }
  }
  
  func didSelectMedia(media: GPHMedia, cell: UICollectionViewCell) {
    if self.onMediaSelect != nil {
      self.onMediaSelect!(["media": [
        "id": media.id,
        "url": media.url,
        "aspectRatio": media.aspectRatio,
      ]])
    }
  }
  
  func didScroll(offset: CGFloat) {
    if self.onScroll != nil {
      self.onScroll!(["offset": offset])
    }
  }
  
  func didSelectMoreByYou(query: String) {}
}
