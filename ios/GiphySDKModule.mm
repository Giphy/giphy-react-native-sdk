#import "GiphySDKModule.h"

// MARK: Swift classes in ObjC++
#if __has_include("giphy_react_native_sdk/giphy_react_native_sdk-Swift.h")
#import <giphy_react_native_sdk/giphy_react_native_sdk-Swift.h>
#else
#import "giphy_react_native_sdk-Swift.h"
#endif

@implementation GiphySDKModule

RCT_EXPORT_MODULE()

- (dispatch_queue_t)methodQueue {
    return dispatch_get_main_queue();
}

+ (BOOL)requiresMainQueueSetup {
    return YES;
}

RCT_EXPORT_METHOD(configure:(NSString *)apiKey
                  verificationMode:(NSNumber *)verificationMode
                  videoCacheMaxBytes:(NSNumber *)videoCacheMaxBytes) {
  [GiphySDKModuleImpl configureWithApiKey:apiKey verificationMode:verificationMode];
}

#ifdef RCT_NEW_ARCH_ENABLED
- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:
(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeGiphySDKSpecJSI>(params);
}
#endif

@end
