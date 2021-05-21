#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_REMAP_MODULE(GiphyReactNativeDialog, RNGiphyDialog, NSObject)

RCT_EXTERN_METHOD(configure: (NSDictionary)options)

RCT_EXTERN_METHOD(show)

RCT_EXTERN_METHOD(hide)

@end
