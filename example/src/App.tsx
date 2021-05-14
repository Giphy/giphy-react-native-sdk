import * as React from 'react'
import { Button, StyleSheet, View } from 'react-native'
import {
  GiphyDialog,
  GiphyMediaType,
  GiphyRating,
  GiphyRendition,
} from 'giphy-react-native-sdk'

import './giphy.setup'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
})

GiphyDialog.configure({
  mediaTypes: [GiphyMediaType.Sticker],
  rating: GiphyRating.PG13,
  renditionType: GiphyRendition.Looping,
})

export default function App() {
  return (
    <View style={styles.container}>
      <Button title="Show Giphy View" onPress={() => GiphyDialog.show()} />
    </View>
  )
}
