#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(GiphyReactNativeSDK, NSObject)

RCT_EXTERN_METHOD(
    configure:(NSString)apiKey
)

RCT_EXTERN_METHOD(showGiphyView)

@end
