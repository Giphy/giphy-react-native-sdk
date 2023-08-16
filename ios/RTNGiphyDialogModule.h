#import <Foundation/Foundation.h>
#import <React/RCTEventEmitter.h>

#ifdef RCT_NEW_ARCH_ENABLED

#import <GiphyReactNativeSDKSpec/GiphyReactNativeSDKSpec.h>
@interface RTNGiphyDialogModule: RCTEventEmitter <NativeGiphyDialogSpec>

#else

#import <React/RCTBridgeModule.h>

@interface RTNGiphyDialogModule : RCTEventEmitter <RCTBridgeModule>

#endif

@end
