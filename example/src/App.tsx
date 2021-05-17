import React, { useEffect, useState } from 'react'
import { GiphyDialog, GiphyDialogConfig } from 'giphy-react-native-sdk'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'

import './giphy.setup'
import { GiphyDialogSettings } from './GiphyDialogSettings'
import { SettingsDialog } from './SettingsDialog'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: getStatusBarHeight() ?? 0,
    backgroundColor: '#eee',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingHorizontal: 16,
  },
  card: {
    paddingVertical: 8,
  },
  cardButton: {
    marginTop: 8,
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  cardButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
})

export default function App() {
  const [dialogSettingsVisible, setDialogSettingsVisible] = useState(false)
  const [
    giphyDialogSettings,
    setGiphyDialogSettings,
  ] = useState<GiphyDialogConfig>({})

  useEffect(() => {
    GiphyDialog.configure(giphyDialogSettings)
  }, [giphyDialogSettings])

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Giphy Dialog</Text>
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => setDialogSettingsVisible(true)}
        >
          <Text style={styles.cardButtonText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => GiphyDialog.show()}
        >
          <Text style={styles.cardButtonText}>Show Dialog</Text>
        </TouchableOpacity>
      </View>
      <SettingsDialog
        visible={dialogSettingsVisible}
        onRequestClose={() => setDialogSettingsVisible(false)}
      >
        <GiphyDialogSettings
          settings={giphyDialogSettings}
          onSettingsChange={setGiphyDialogSettings}
        />
      </SettingsDialog>
    </View>
  )
}
