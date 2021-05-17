#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_REMAP_MODULE(GiphyReactNativeSDK, RNGiphySDK, RCTEventEmitter)

RCT_EXTERN_METHOD(configure: (NSDictionary)config)

@end
