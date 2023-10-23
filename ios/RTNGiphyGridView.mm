#ifdef RCT_NEW_ARCH_ENABLED
#import "RTNGiphyGridView.h"

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

@interface RTNGiphyGridView () <RCTRTNGiphyGridViewViewProtocol>

@end

@implementation RTNGiphyGridView {
  RTNGiphyGridViewImpl * _view;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RTNGiphyGridViewComponentDescriptor>();
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RTNGiphyGridViewProps>();
    _props = defaultProps;
    
    _view = [RTNGiphyGridViewImpl new];
    
    // MARK: RN Event Handlers
    _view.onContentUpdate = [self](NSDictionary* data) {
      if (_eventEmitter != nil) {
        auto gridViewEventEmitter = std::static_pointer_cast<RTNGiphyGridViewEventEmitter const>(_eventEmitter);
        facebook::react::RTNGiphyGridViewEventEmitter::OnContentUpdate event = {
          .resultCount=[[data valueForKey:@"resultCount"] intValue]
        };
        gridViewEventEmitter->onContentUpdate(event);
      }
    };
    _view.onMediaSelect = [self](NSDictionary* data) {
      if (_eventEmitter != nil) {
        auto gridViewEventEmitter = std::static_pointer_cast<RTNGiphyGridViewEventEmitter const>(_eventEmitter);
        facebook::react::RTNGiphyGridViewEventEmitter::OnMediaSelect event = {
          .media=std::string([[data valueForKey:@"media"] UTF8String])
        };
        gridViewEventEmitter->onMediaSelect(event);
      }
    };
    _view.onScroll = [self](NSDictionary* data) {
      if (_eventEmitter != nil) {
        auto gridViewEventEmitter = std::static_pointer_cast<RTNGiphyGridViewEventEmitter const>(_eventEmitter);
        facebook::react::RTNGiphyGridViewEventEmitter::OnScroll event = {
          .offset=[[data valueForKey:@"offset"] doubleValue]
        };
        gridViewEventEmitter->onScroll(event);
      }
    };
    
    self.contentView = _view;
  }
  
  return self;
}

- (void)updateProps:(Props::Shared const &)props oldProps:(Props::Shared const &)oldProps
{
  const auto &oldViewProps = *std::static_pointer_cast<RTNGiphyGridViewProps const>(_props);
  const auto &newViewProps = *std::static_pointer_cast<RTNGiphyGridViewProps const>(props);
  
  #define REMAP_GPH_GRID_VIEW_PROP(name)                     \
  if (oldViewProps.name != newViewProps.name) {              \
    _view.name = newViewProps.name;                          \
  }                                                          \

  #define REMAP_GPH_GRID_VIEW_STR_PROP(name)                 \
  if (oldViewProps.name != newViewProps.name) {              \
    _view.name = RCTNSStringFromString(newViewProps.name);   \
  }                                                          \

  #define REMAP_GPH_GRID_VIEW_JSON_PROP(name)                                    \
  if (oldViewProps.name != newViewProps.name) {                                  \
    _view.name = RCTJSONParse(RCTNSStringFromString(newViewProps.name), NULL);   \
  }                                                                              \

  REMAP_GPH_GRID_VIEW_JSON_PROP(content)
  REMAP_GPH_GRID_VIEW_PROP(cellPadding)
  REMAP_GPH_GRID_VIEW_PROP(disableEmojiVariations)
  REMAP_GPH_GRID_VIEW_STR_PROP(clipsPreviewRenditionType)
  REMAP_GPH_GRID_VIEW_STR_PROP(orientation)
  REMAP_GPH_GRID_VIEW_STR_PROP(renditionType)
  REMAP_GPH_GRID_VIEW_PROP(spanCount)
  REMAP_GPH_GRID_VIEW_PROP(fixedSizeCells)
  REMAP_GPH_GRID_VIEW_JSON_PROP(theme)
  
  [super updateProps:props oldProps:oldProps];
}
@end

Class<RCTComponentViewProtocol> RTNGiphyGridViewCls(void)
{
  return RTNGiphyGridView.class;
}

#endif


