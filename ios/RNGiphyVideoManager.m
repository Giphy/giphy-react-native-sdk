#import <React/RCTBridgeModule.h>
#import "React/RCTEventEmitter.h"

@interface RCT_EXTERN_REMAP_MODULE(GiphyReactNativeVideoManager, RNGiphyVideoManager, RCTEventEmitter)

RCT_EXTERN_METHOD(muteAll)

RCT_EXTERN_METHOD(pauseAll)

RCT_EXTERN_METHOD(resume)

@end
