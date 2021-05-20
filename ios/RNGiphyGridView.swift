import UIKit
import GiphyUISDK

class RNGiphyGridView: UIView {
  let gridController: GiphyGridController
  
  override init(frame: CGRect) {
    self.gridController = GiphyGridController()
    super.init(frame: frame)
    self.setupView()
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
  
  @objc func setContent(_ value: NSDictionary?) -> Void {
    gridController.content = GPHContent.fromRNValue(value: value ?? [:])
    gridController.update()
  }
  
  private func setupView() -> Void {
    self.addSubview(gridController.view)
    
    gridController.view.translatesAutoresizingMaskIntoConstraints = false
    gridController.view.leftAnchor.constraint(equalTo: self.safeLeftAnchor).isActive = true
    gridController.view.rightAnchor.constraint(equalTo: self.safeRightAnchor).isActive = true
    gridController.view.topAnchor.constraint(equalTo: self.safeTopAnchor).isActive = true
    gridController.view.bottomAnchor.constraint(equalTo: self.safeBottomAnchor).isActive = true
  }
}
