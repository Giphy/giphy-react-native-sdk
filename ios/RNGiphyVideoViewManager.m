#import "React/RCTViewManager.h"

@interface RCT_EXTERN_REMAP_MODULE(GiphyReactNativeVideoView, RNGiphyVideoViewManager, RCTViewManager)
  RCT_EXPORT_VIEW_PROPERTY(media, NSDictionary)

  RCT_EXPORT_VIEW_PROPERTY(autoPlay, BOOL)

  RCT_EXPORT_VIEW_PROPERTY(muted, BOOL)

  RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)

  RCT_EXPORT_VIEW_PROPERTY(onMute, RCTDirectEventBlock)

  RCT_EXPORT_VIEW_PROPERTY(onPlaybackStateChanged, RCTDirectEventBlock)

  RCT_EXPORT_VIEW_PROPERTY(onUnmute, RCTDirectEventBlock)
@end
