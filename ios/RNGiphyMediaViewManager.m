#import "React/RCTViewManager.h"

@interface RCT_EXTERN_REMAP_MODULE(GiphyReactNativeMediaView, RNGiphyMediaViewManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(autoPlay, BOOL)

  RCT_EXPORT_VIEW_PROPERTY(media, NSDictionary)

  RCT_EXPORT_VIEW_PROPERTY(renditionType, NSString)

  RCT_EXPORT_VIEW_PROPERTY(resizeMode, NSString)

  RCT_EXTERN_METHOD(pause:(nonnull NSNumber *)node)

  RCT_EXTERN_METHOD(resume:(nonnull NSNumber *)node)
@end
