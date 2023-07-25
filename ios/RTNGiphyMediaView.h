// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

#ifndef RTNGiphyMediaViewNativeComponent_h
#define RTNGiphyMediaViewNativeComponent_h

NS_ASSUME_NONNULL_BEGIN

@interface RTNGiphyMediaView : RCTViewComponentView
@property (nonatomic, copy, nullable) NSString *mediaId;
@property (nonatomic, assign) BOOL autoPlay;
@property (nonatomic, copy, nullable) NSString *renditionType;
@property (nonatomic, copy, nullable) NSString *resizeMode;

- (void)pause;
- (void)resume;
@end

NS_ASSUME_NONNULL_END

#endif /* RTNGiphyMediaView_h */
#endif /* RCT_NEW_ARCH_ENABLED */
