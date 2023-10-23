#import <React/RCTViewManager.h>
#import <React/RCTUIManager.h>
#import "RCTBridge.h"

#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTConversions.h>
#else
#import <React/RCTConvert.h>
#endif // RCT_NEW_ARCH_ENABLED

#if __has_include("giphy_react_native_sdk/giphy_react_native_sdk-Swift.h")
#import <giphy_react_native_sdk/giphy_react_native_sdk-Swift.h>
#else
#import "giphy_react_native_sdk-Swift.h"
#endif

@interface RTNGiphyGridViewManager : RCTViewManager
@end

@implementation RTNGiphyGridViewManager {
}

RCT_EXPORT_MODULE()

- (RTNGiphyGridViewImpl *)view
{
  return [RTNGiphyGridViewImpl new];
}

+ (BOOL)requiresMainQueueSetup {
  return YES;
}

RCT_EXPORT_VIEW_PROPERTY(cellPadding, CGFloat)

RCT_EXPORT_VIEW_PROPERTY(clipsPreviewRenditionType, NSString)

RCT_EXPORT_VIEW_PROPERTY(disableEmojiVariations, BOOL)

RCT_EXPORT_VIEW_PROPERTY(orientation, NSString)

RCT_EXPORT_VIEW_PROPERTY(renditionType, NSString)

RCT_EXPORT_VIEW_PROPERTY(spanCount, NSInteger)

RCT_EXPORT_VIEW_PROPERTY(fixedSizeCells, BOOL)

RCT_EXPORT_VIEW_PROPERTY(onContentUpdate, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onMediaSelect, RCTDirectEventBlock)

RCT_EXPORT_VIEW_PROPERTY(onScroll, RCTDirectEventBlock)

RCT_CUSTOM_VIEW_PROPERTY(content, NSString, RTNGiphyGridViewImpl) {
  view.content = RCTJSONParse(json, NULL);
}

RCT_CUSTOM_VIEW_PROPERTY(theme, NSString, RTNGiphyGridViewImpl) {
  view.theme = RCTJSONParse(json, NULL);
}

@end
