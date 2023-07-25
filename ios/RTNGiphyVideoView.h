// This guard prevent this file to be compiled in the old architecture.
#ifdef RCT_NEW_ARCH_ENABLED
#import <React/RCTViewComponentView.h>
#import <UIKit/UIKit.h>

#ifndef RTNGiphyVideoViewNativeComponent_h
#define RTNGiphyVideoViewNativeComponent_h

NS_ASSUME_NONNULL_BEGIN

@interface RTNGiphyVideoView : RCTViewComponentView
@property (nonatomic, copy, nullable) NSString *mediaId;
@property (nonatomic, assign) BOOL autoPlay;
@property (nonatomic, assign) BOOL muted;
@end

NS_ASSUME_NONNULL_END

#endif /* RTNGiphyVideoView_h */
#endif /* RCT_NEW_ARCH_ENABLED */
