#ifdef RCT_NEW_ARCH_ENABLED
#import "RTNGiphyGridView.h"

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

@interface RTNGiphyGridView () <RCTRTNGiphyGridViewViewProtocol>

@end

@implementation RTNGiphyGridView {
  RTNGiphyGridViewImpl * _view;
  BOOL _initialPropsApplied;
}

+ (ComponentDescriptorProvider)componentDescriptorProvider
{
  return concreteComponentDescriptorProvider<RTNGiphyGridViewComponentDescriptor>();
}

// A recycled view would keep the content and the scroll position of its previous use.
+ (BOOL)shouldBeRecycled
{
  return NO;
}

- (instancetype)initWithFrame:(CGRect)frame
{
  if (self = [super initWithFrame:frame]) {
    static const auto defaultProps = std::make_shared<const RTNGiphyGridViewProps>();
    _props = defaultProps;
    
    _view = [RTNGiphyGridViewImpl new];
    
    // MARK: RN Event Handlers
    // _view keeps these handlers, so they must not retain self.
    __weak __typeof(self) weakSelf = self;
    _view.onContentUpdate = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto gridViewEventEmitter = std::static_pointer_cast<RTNGiphyGridViewEventEmitter const>(strongSelf->_eventEmitter);
        facebook::react::RTNGiphyGridViewEventEmitter::OnContentUpdate event = {
          .resultCount=[[data valueForKey:@"resultCount"] intValue]
        };
        gridViewEventEmitter->onContentUpdate(event);
      }
    };
    _view.onMediaSelect = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto gridViewEventEmitter = std::static_pointer_cast<RTNGiphyGridViewEventEmitter const>(strongSelf->_eventEmitter);
        NSString *media = [data valueForKey:@"media"] ?: @"";
        facebook::react::RTNGiphyGridViewEventEmitter::OnMediaSelect event = {
          .media=std::string([media UTF8String])
        };
        gridViewEventEmitter->onMediaSelect(event);
      }
    };
    _view.onScroll = [weakSelf](NSDictionary* data) {
      __typeof(self) strongSelf = weakSelf;
      if (strongSelf && strongSelf->_eventEmitter != nil) {
        auto gridViewEventEmitter = std::static_pointer_cast<RTNGiphyGridViewEventEmitter const>(strongSelf->_eventEmitter);
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
  // The first update applies every prop: a prop equal to its codegen default
  // (e.g. cellPadding={0}) would otherwise never reach the view.
  const BOOL applyAll = !_initialPropsApplied;
  
  #define REMAP_GPH_GRID_VIEW_PROP(name)                     \
  if (applyAll || oldViewProps.name != newViewProps.name) {  \
    _view.name = newViewProps.name;                          \
  }                                                          \

  #define REMAP_GPH_GRID_VIEW_STR_PROP(name)                 \
  if (applyAll || oldViewProps.name != newViewProps.name) {  \
    _view.name = RCTNSStringFromString(newViewProps.name);   \
  }                                                          \

  // An empty or invalid JSON string parses to nil, which the setters don't accept.
  #define REMAP_GPH_GRID_VIEW_JSON_PROP(name)                                         \
  if (applyAll || oldViewProps.name != newViewProps.name) {                           \
    id value = RCTJSONParse(RCTNSStringFromString(newViewProps.name), NULL);          \
    if ([value isKindOfClass:[NSDictionary class]]) {                                 \
      _view.name = value;                                                             \
    }                                                                                 \
  }                                                                                   \

  REMAP_GPH_GRID_VIEW_PROP(cellPadding)
  REMAP_GPH_GRID_VIEW_PROP(disableEmojiVariations)
  REMAP_GPH_GRID_VIEW_STR_PROP(clipsPreviewRenditionType)
  REMAP_GPH_GRID_VIEW_STR_PROP(orientation)
  REMAP_GPH_GRID_VIEW_STR_PROP(renditionType)
  // spanCount has no JS default; 0 means it isn't set, so the SDK keeps its own default.
  if ((applyAll || oldViewProps.spanCount != newViewProps.spanCount) && newViewProps.spanCount > 0) {
    _view.spanCount = newViewProps.spanCount;
  }
  REMAP_GPH_GRID_VIEW_PROP(fixedSizeCells)
  REMAP_GPH_GRID_VIEW_JSON_PROP(theme)
  // Last: setting the content reloads the grid with the settings above.
  REMAP_GPH_GRID_VIEW_JSON_PROP(content)
  
  _initialPropsApplied = YES;
  [super updateProps:props oldProps:oldProps];
}
@end

Class<RCTComponentViewProtocol> RTNGiphyGridViewCls(void)
{
  return RTNGiphyGridView.class;
}

#endif


