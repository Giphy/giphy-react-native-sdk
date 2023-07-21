#import <Foundation/Foundation.h>

#ifdef RCT_NEW_ARCH_ENABLED

#import <GiphyReactNativeSDKSpec/GiphyReactNativeSDKSpec.h>
@interface RTNGiphyVideoManager: NSObject <NativeGiphyVideoManagerSpec>

#else

#import <React/RCTBridgeModule.h>

@interface RTNGiphyVideoManager: NSObject <RCTBridgeModule>

#endif

@end
