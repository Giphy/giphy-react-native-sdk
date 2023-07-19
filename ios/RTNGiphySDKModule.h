#import <Foundation/Foundation.h>

#ifdef RCT_NEW_ARCH_ENABLED

#import <GiphyReactNativeSDKSpec/GiphyReactNativeSDKSpec.h>
@interface RTNGiphySDKModule: NSObject <NativeGiphySDKSpec>

#else

#import <React/RCTBridgeModule.h>

@interface RTNGiphySDKModule : NSObject <RCTBridgeModule>

#endif

@end
