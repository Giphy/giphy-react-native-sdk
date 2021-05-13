import * as React from 'react'
import { StyleSheet, View, Button } from 'react-native'
import { GiphyDialog } from 'giphy-react-native-sdk'

import './giphy.setup'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Show Giphy View" onPress={() => GiphyDialog.show()} />
    </View>
  )
}
