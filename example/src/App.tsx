import * as React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { GIPHY_API_KEY } from 'react-native-dotenv'
import { GiphySDK } from 'giphy-react-native-sdk'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

if (GIPHY_API_KEY) {
  GiphySDK.configure({ apiKey: GIPHY_API_KEY })
}

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Show Giphy View" onPress={() => void 0} />
    </View>
  )
}
