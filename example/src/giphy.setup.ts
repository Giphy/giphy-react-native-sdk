import { Platform } from 'react-native'

if (Platform.OS === 'ios') {
  require('./giphy.setup.ios')
} else if (Platform.OS === 'android') {
  require('./giphy.setup.android')
}
