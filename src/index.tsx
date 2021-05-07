import { requireNativeComponent, ViewStyle } from 'react-native';

type GiphyReactNativeSdkProps = {
  color: string;
  style: ViewStyle;
};

export const GiphyReactNativeSdkViewManager = requireNativeComponent<GiphyReactNativeSdkProps>(
  'GiphyReactNativeSdkView'
);

export default GiphyReactNativeSdkViewManager;
