import Config from 'react-native-config'
import { GiphySDK } from '@giphy/react-native-sdk'

if (Config.ANDROID_GIPHY_API_KEY) {
  GiphySDK.configure({ apiKey: Config.ANDROID_GIPHY_API_KEY })
}
