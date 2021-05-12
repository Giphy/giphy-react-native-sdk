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

export default function App() {
  React.useEffect(() => {
    if (GIPHY_API_KEY) {
      GiphySDK.configure(GIPHY_API_KEY)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Button
        title="Show Giphy View"
        onPress={() => GiphySDK.showGiphyView()}
      />
    </View>
  )
}
