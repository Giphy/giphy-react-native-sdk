#import "RTNGiphyMediaView.h"

#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

#if __has_include("giphy_react_native_sdk/giphy_react_native_sdk-Swift.h")
#import <giphy_react_native_sdk/giphy_react_native_sdk-Swift.h>
#else
#import "giphy_react_native_sdk-Swift.h"
#endif

@interface RTNGiphyMediaViewManager : RCTViewManager
@end

@implementation RTNGiphyMediaViewManager

RCT_EXPORT_MODULE()

- (RTNGiphyMediaViewImpl *)view
{
  return [[RTNGiphyMediaViewImpl alloc] init];
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

#define QUICK_RCT_EXPORT_COMMAND_METHOD(name)                                                                        \
RCT_EXPORT_METHOD(name:(nonnull NSNumber *)reactTag)                                                                 \
{                                                                                                                    \
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {   \
    RTNGiphyMediaViewImpl *view = (RTNGiphyMediaViewImpl *)viewRegistry[reactTag];                                   \
    if (!view || ![view isKindOfClass:[RTNGiphyMediaViewImpl class]]) {                                              \
      RCTLogError(@"Cannot find RTNGiphyMediaViewImpl with tag #%@", reactTag);                                      \
      return;                                                                                                        \
    }                                                                                                                \
    [view name];                                                                                                     \
  }];                                                                                                                \
}                                                                                                                    \

RCT_EXPORT_VIEW_PROPERTY(mediaId, NSString)

RCT_EXPORT_VIEW_PROPERTY(autoPlay, BOOL)

RCT_EXPORT_VIEW_PROPERTY(renditionType, NSString)

RCT_EXPORT_VIEW_PROPERTY(resizeMode, NSString)

QUICK_RCT_EXPORT_COMMAND_METHOD(pause)

QUICK_RCT_EXPORT_COMMAND_METHOD(resume)

@end

