#import "RTNGiphyDialogModule.h"

#if __has_include("giphy_react_native_sdk/giphy_react_native_sdk-Swift.h")
#import <giphy_react_native_sdk/giphy_react_native_sdk-Swift.h>
#else
#import "giphy_react_native_sdk-Swift.h"
#endif

@interface RTNGiphyDialogModule () <RTNGiphyDialogModuleDelegate>
@end

@implementation RTNGiphyDialogModule {
    RTNGiphyDialogModuleImpl *giphyDialogModule;
}

- (instancetype)init {
    self = [super init];
    if (self) {
        giphyDialogModule = [RTNGiphyDialogModuleImpl new];
        giphyDialogModule.rtnDelegate = self;
    }
    return self;
}

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_METHOD(configure
:(NSDictionary *)options) {
    [giphyDialogModule configure:options];
}

RCT_EXPORT_METHOD(show) {
        [giphyDialogModule show];
}

RCT_EXPORT_METHOD(hide) {
        [giphyDialogModule hide];
}

// MARK: Event Emitter
- (NSArray<NSString *> *)supportedEvents {
    return [RTNGiphyDialogModuleImpl supportedEvents];
}

- (void)sendEventWithName:(NSString *_Nonnull)name result:(NSDictionary *_Nonnull)result {
    [self sendEventWithName:name body:result];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeGiphyDialogSpecJSI>(params);
}
#endif
@end
