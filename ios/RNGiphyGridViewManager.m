#import "React/RCTViewManager.h"

@interface RCT_EXTERN_REMAP_MODULE(GiphyReactNativeGridView, RNGiphyGridViewManager, RCTViewManager)
  
RCT_EXPORT_VIEW_PROPERTY(content, NSDictionary)

RCT_EXPORT_VIEW_PROPERTY(onContentUpdate, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onMediaSelect, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onScroll, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(cellPadding, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(clipsPreviewRenditionType, NSString)

RCT_EXPORT_VIEW_PROPERTY(orientation, NSString)

RCT_EXPORT_VIEW_PROPERTY(renditionType, NSString)

RCT_EXPORT_VIEW_PROPERTY(spanCount, NSInteger)

RCT_EXPORT_VIEW_PROPERTY(fixedSizeCells, BOOL)

@end
