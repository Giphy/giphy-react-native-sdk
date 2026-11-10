#ifdef RCT_NEW_ARCH_ENABLED
#import "RTNGiphyMediaView.h"

#import <React/RCTConversions.h>
#import <React/RCTFabricComponentsPlugins.h>
#import <react/renderer/components/GiphyReactNativeSDKSpec/ComponentDescriptors.h>
#import <react/renderer/components/GiphyReactNativeSDKSpec/EventEmitters.h>
#import <react/renderer/components/GiphyReactNativeSDKSpec/Props.h>
#import <react/renderer/components/GiphyReactNativeSDKSpec/RCTComponentViewHelpers.h>

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
  BOOL _initialPropsApplied;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RTNGiphyMediaViewComponentDescriptor>();
}

// A recycled view would keep the media and the paused state of its previous use.
+ (BOOL)shouldBeRecycled
{
  return NO;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RTNGiphyMediaViewProps>();
    _props = defaultProps;

    _view = [RTNGiphyMediaViewImpl new];

    // MARK: RN Event Handlers
    // _view keeps these handlers, so they must not retain self.
    __weak __typeof(self) weakSelf = self;
    _view.onError = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto mediaViewEventEmitter = std::static_pointer_cast<RTNGiphyMediaViewEventEmitter const>(strongSelf->_eventEmitter);
        NSString *description = [data valueForKey:@"description"] ?: @"";
        facebook::react::RTNGiphyMediaViewEventEmitter::OnError event = {
          .description=std::string([description UTF8String])
        };
        mediaViewEventEmitter->onError(event);
      }
    };
    _view.onLoad = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto mediaViewEventEmitter = std::static_pointer_cast<RTNGiphyMediaViewEventEmitter const>(strongSelf->_eventEmitter);
        facebook::react::RTNGiphyMediaViewEventEmitter::OnLoad event = {};
        mediaViewEventEmitter->onLoad(event);
      }
    };

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<RTNGiphyMediaViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<RTNGiphyMediaViewProps const>(props);
  // The first update applies every prop: a prop equal to its codegen default
  // (e.g. autoPlay={false}) would otherwise never reach the view.
  const BOOL applyAll = !_initialPropsApplied;

  #define REMAP_GPH_MEDIA_VIEW_PROP(name)                    \
  if (applyAll || oldViewProps.name != newViewProps.name) {  \
    _view.name = newViewProps.name;                          \
  }                                                          \

  #define REMAP_GPH_MEDIA_VIEW_STR_PROP(name)                \
  if (applyAll || oldViewProps.name != newViewProps.name) {  \
    _view.name = RCTNSStringFromString(newViewProps.name);   \
  }                                                          \

  // Fabric sends "" when the media is removed.
  if (applyAll || oldViewProps.mediaId != newViewProps.mediaId) {
    _view.mediaId = newViewProps.mediaId.empty() ? nil : RCTNSStringFromString(newViewProps.mediaId);
  }
  REMAP_GPH_MEDIA_VIEW_PROP(autoPlay)
  REMAP_GPH_MEDIA_VIEW_STR_PROP(renditionType)
  REMAP_GPH_MEDIA_VIEW_STR_PROP(resizeMode)

  _initialPropsApplied = YES;
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

