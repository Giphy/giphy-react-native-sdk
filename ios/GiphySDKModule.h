#import <Foundation/Foundation.h>

#ifdef RCT_NEW_ARCH_ENABLED

#import <GiphyReactNativeSDKSpec/GiphyReactNativeSDKSpec.h>
@interface GiphySDKModule: NSObject <NativeGiphySDKSpec>

#else

#import <React/RCTBridgeModule.h>

@interface GiphySDKModule : NSObject <RCTBridgeModule>

#endif

@end
