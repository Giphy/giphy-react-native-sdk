#ifdef RCT_NEW_ARCH_ENABLED
#import "RTNGiphyVideoView.h"

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
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

@interface RTNGiphyVideoView () <RCTRTNGiphyVideoViewViewProtocol>

@end

@implementation RTNGiphyVideoView {
  RTNGiphyVideoViewImpl * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RTNGiphyVideoViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RTNGiphyVideoViewProps>();
    _props = defaultProps;

    _view = [[RTNGiphyVideoViewImpl alloc] init];

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<RTNGiphyVideoViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<RTNGiphyVideoViewProps const>(props);

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
  REMAP_GPH_MEDIA_VIEW_PROP(muted)

  [super updateProps:props oldProps:oldProps];
}
@end

Class<RCTComponentViewProtocol> RTNGiphyVideoViewCls(void)
{
  return RTNGiphyVideoView.class;
}

#endif


