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

RCT_EXPORT_MODULE(RTNGiphyMediaView)

- (UIView *)view
{
  return [[RTNGiphyMediaView alloc] init];
}

#define QUICK_RCT_EXPORT_COMMAND_METHOD(name)                                                                        \
RCT_EXPORT_METHOD(name:(nonnull NSNumber *)reactTag)                                                                 \
{                                                                                                                    \
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *, UIView *> *viewRegistry) {   \
    RTNGiphyMediaView *view = (RTNGiphyMediaView *)viewRegistry[reactTag];                                           \
    if (!view || ![view isKindOfClass:[RTNGiphyMediaView class]]) {                                                  \
      RCTLogError(@"Cannot find RTNGiphyMediaView with tag #%@", reactTag);                                          \
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

