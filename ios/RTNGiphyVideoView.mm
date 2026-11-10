#ifdef RCT_NEW_ARCH_ENABLED
#import "RTNGiphyVideoView.h"

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

@interface RTNGiphyVideoView () <RCTRTNGiphyVideoViewViewProtocol>

@end

@implementation RTNGiphyVideoView {
  RTNGiphyVideoViewImpl * _view;
  BOOL _initialPropsApplied;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RTNGiphyVideoViewComponentDescriptor>();
}

// A recycled view would skip loading media it showed before, and with it autoplay.
+ (BOOL)shouldBeRecycled
{
  return NO;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RTNGiphyVideoViewProps>();
    _props = defaultProps;

    _view = [RTNGiphyVideoViewImpl new];

    // MARK: RN Event Handlers
    // _view keeps these handlers, so they must not retain self.
    __weak __typeof(self) weakSelf = self;
    _view.onPlaybackStateChanged = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto videoViewEventEmitter = std::static_pointer_cast<RTNGiphyVideoViewEventEmitter const>(strongSelf->_eventEmitter);
        facebook::react::RTNGiphyVideoViewEventEmitter::OnPlaybackStateChanged event = {
          .state=[[data valueForKey:@"state"] intValue]
        };
        videoViewEventEmitter->onPlaybackStateChanged(event);
      }
    };
    _view.onError = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto videoViewEventEmitter = std::static_pointer_cast<RTNGiphyVideoViewEventEmitter const>(strongSelf->_eventEmitter);
        NSString *description = [data valueForKey:@"description"] ?: @"";
        facebook::react::RTNGiphyVideoViewEventEmitter::OnError event = {
          .description=std::string([description UTF8String])
        };
        videoViewEventEmitter->onError(event);
      }
    };
    _view.onMute = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto videoViewEventEmitter = std::static_pointer_cast<RTNGiphyVideoViewEventEmitter const>(strongSelf->_eventEmitter);
        facebook::react::RTNGiphyVideoViewEventEmitter::OnMute event = {};
        videoViewEventEmitter->onMute(event);
      }
    };
    _view.onUnmute = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto videoViewEventEmitter = std::static_pointer_cast<RTNGiphyVideoViewEventEmitter const>(strongSelf->_eventEmitter);
        facebook::react::RTNGiphyVideoViewEventEmitter::OnUnmute event = {};
        videoViewEventEmitter->onUnmute(event);
      }
    };

    self.contentView = _view;
  }

  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<RTNGiphyVideoViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<RTNGiphyVideoViewProps const>(props);
  // The first update applies every prop: a prop equal to its codegen default
  // would otherwise never reach the view.
  const BOOL applyAll = !_initialPropsApplied;

  #define REMAP_GPH_VIDEO_VIEW_PROP(name)                    \
  if (applyAll || oldViewProps.name != newViewProps.name) {  \
    _view.name = newViewProps.name;                          \
  }                                                          \

  // autoPlay first: setting the media starts playback when autoPlay is on.
  REMAP_GPH_VIDEO_VIEW_PROP(autoPlay)
  REMAP_GPH_VIDEO_VIEW_PROP(muted)
  // Fabric sends "" when the media is removed.
  if (applyAll || oldViewProps.mediaId != newViewProps.mediaId) {
    _view.mediaId = newViewProps.mediaId.empty() ? nil : RCTNSStringFromString(newViewProps.mediaId);
  }

  _initialPropsApplied = YES;
  [super updateProps:props oldProps:oldProps];
}
@end

Class<RCTComponentViewProtocol> RTNGiphyVideoViewCls(void)
{
  return RTNGiphyVideoView.class;
}

#endif


