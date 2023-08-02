declare module 'react-native-config' {
  export interface NativeConfig {
    ANDROID_GIPHY_API_KEY?: string
    IOS_GIPHY_API_KEY?: string
  }

  export const Config: NativeConfig
  export default Config
}
