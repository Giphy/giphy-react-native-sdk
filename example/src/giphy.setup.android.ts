import { GiphySDK } from '@giphy/react-native-sdk'
import { ANDROID_GIPHY_API_KEY } from 'react-native-dotenv'

if (ANDROID_GIPHY_API_KEY) {
  GiphySDK.configure({ apiKey: ANDROID_GIPHY_API_KEY })
}
