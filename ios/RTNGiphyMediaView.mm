#ifdef RCT_NEW_ARCH_ENABLED
#import "RTNGiphyMediaView.h"

#import <React/RCTConversions.h>
#import <react/renderer/components/GiphyReactNativeSDKSpec/ComponentDescriptors.h>
#import <react/renderer/components/GiphyReactNativeSDKSpec/EventEmitters.h>
#import <react/renderer/components/GiphyReactNativeSDKSpec/Props.h>
#import <react/renderer/components/GiphyReactNativeSDKSpec/RCTComponentViewHelpers.h>

#import "RCTFabricComponentsPlugins.h"

#if __has_include("giphy_react_native_sdk/giphy_react_native_sdk-Swift.h")
#import <giphy_react_native_sdk/giphy_react_native_sdk-Swift.h>
#else
#import "giphy_react_native_sdk-Swift.h"
#endif

using namespace facebook::react;

@interface RTNGiphyMediaView () <RCTRTNGiphyMediaViewViewProtocol>

@end

@implementation RTNGiphyMediaView {
  RTNGiphyMediaViewImpl * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RTNGiphyMediaViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RTNGiphyMediaViewProps>();
    _props = defaultProps;

    _view = [[RTNGiphyMediaViewImpl alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<RTNGiphyMediaViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<RTNGiphyMediaViewProps const>(props);

  #define REMAP_GPH_MEDIA_VIEW_PROP(name)                    \
  if (oldViewProps.name != newViewProps.name) {              \
    _view.name = newViewProps.name;                          \
  }                                                          \

  #define REMAP_GPH_MEDIA_VIEW_STR_PROP(name)                \
  if (oldViewProps.name != newViewProps.name) {              \
    _view.name = RCTNSStringFromString(newViewProps.name);   \
  }                                                          \

  REMAP_GPH_MEDIA_VIEW_STR_PROP(mediaId)
  REMAP_GPH_MEDIA_VIEW_PROP(autoPlay)
  REMAP_GPH_MEDIA_VIEW_STR_PROP(renditionType)
  REMAP_GPH_MEDIA_VIEW_STR_PROP(resizeMode)

  [super updateProps:props oldProps:oldProps];
}

- (void)handleCommand:(nonnull const NSString *)commandName args:(nonnull const NSArray *)args {
  NSString *PAUSE = @"pause";
  NSString *RESUME = @"resume";
  if([commandName isEqual:PAUSE]) {
    [self pause];
  } else if ([commandName isEqual:RESUME]) {
    [self resume];
  }
}

- (void)pause {
  [_view pause];
}

- (void)resume {
  [_view resume];
}
@end

Class<RCTComponentViewProtocol> RTNGiphyMediaViewCls(void)
{
  return RTNGiphyMediaView.class;
}

#endif

