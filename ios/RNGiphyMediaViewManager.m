#import "React/RCTViewManager.h"

@interface RCT_EXTERN_REMAP_MODULE(GiphyReactNativeMediaView, RNGiphyMediaViewManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(media, NSDictionary)

  RCT_EXPORT_VIEW_PROPERTY(renditionType, NSString)
@end
