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
  
  //MARK: - RN Properties
  @objc func setContent(_ value: NSDictionary?) -> Void {
    gridController.content = GPHContent.fromRNValue(value: value ?? [:])
    gridController.update()
  }
  
  @objc func setCellPadding(_ value: CGFloat) -> Void {
    self.gridController.cellPadding = value
    gridController.viewWillAppear(true)
  }
  
  //MARK: - GPHGridDelegate stubs
  open func contentDidUpdate(resultCount: Int,error: Error?) {
    if self.onContentUpdate != nil {
      self.onContentUpdate!(["resultCount": resultCount])
    }
  }
  
  open func didSelectMedia(media: GPHMedia, cell: UICollectionViewCell) {
    if self.onMediaSelect != nil {
      self.onMediaSelect!(["media": [
        "id": media.id,
        "url": media.url,
        "aspectRatio": media.aspectRatio,
      ]])
    }
  }
  
  open func didScroll(offset: CGFloat) {
    if self.onScroll != nil {
      self.onScroll!(["offset": offset])
    }
  }
  
  open func didSelectMoreByYou(query: String) {}
}
