#import "React/RCTViewManager.h"

@interface RCT_EXTERN_REMAP_MODULE(GiphyReactNativeVideoView, RNGiphyVideoViewManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(media, NSDictionary)

  RCT_EXPORT_VIEW_PROPERTY(playing, BOOL)

  RCT_EXPORT_VIEW_PROPERTY(muted, BOOL)
@end
