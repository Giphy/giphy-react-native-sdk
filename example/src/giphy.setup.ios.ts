import { GiphySDK } from '@giphy/react-native-sdk'
import { IOS_GIPHY_API_KEY } from 'react-native-dotenv'

if (IOS_GIPHY_API_KEY) {
  GiphySDK.configure({ apiKey: IOS_GIPHY_API_KEY })
}
