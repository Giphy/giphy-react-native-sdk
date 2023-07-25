#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

#if __has_include("giphy_react_native_sdk/giphy_react_native_sdk-Swift.h")
#import <giphy_react_native_sdk/giphy_react_native_sdk-Swift.h>
#else
#import "giphy_react_native_sdk-Swift.h"
#endif

@interface RTNGiphyVideoViewManager : RCTViewManager
@end

@implementation RTNGiphyVideoViewManager {
}

RCT_EXPORT_MODULE()

- (RTNGiphyVideoViewImpl *)view
{
  return [RTNGiphyVideoViewImpl new];
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

RCT_EXPORT_VIEW_PROPERTY(mediaId, NSString)

RCT_EXPORT_VIEW_PROPERTY(autoPlay, BOOL)

RCT_EXPORT_VIEW_PROPERTY(muted, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onError, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onMute, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onPlaybackStateChanged, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onUnmute, RCTDirectEventBlock)
@end
