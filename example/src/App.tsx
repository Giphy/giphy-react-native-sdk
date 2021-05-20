import React, { useEffect, useState } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native'
import {
  GiphyDialog,
  GiphyDialogConfig,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaView,
  GiphyContent,
} from 'giphy-react-native-sdk'

import './giphy.setup'
import { GiphyDialogSettings } from './Settings'
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
  preview: {
    backgroundColor: '#fff',
    maxHeight: 400,
    padding: 4,
    width: '100%',
  },
})

const content = GiphyContent.search({ searchQuery: 'who' })

export default function App() {
  const [dialogSettingsVisible, setDialogSettingsVisible] = useState(false)
  const [media, setMedia] = useState<GiphyMedia | null>(null)
  const [
    giphyDialogSettings,
    setGiphyDialogSettings,
  ] = useState<GiphyDialogConfig>({})

  useEffect(() => {
    GiphyDialog.configure(giphyDialogSettings)
  }, [giphyDialogSettings])

  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (e) => {
      setMedia(e.media)
      GiphyDialog.hide()
    }
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler
    )
    return () => {
      listener.remove()
    }
  }, [])

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
      <View style={styles.card}>
        <Text style={styles.header}>Preview</Text>
        <GiphyGridView
          content={content}
          style={[styles.preview, { minHeight: 400, minWidth: 400 }]}
        />
        {media && (
          <ScrollView style={styles.preview}>
            <GiphyMediaView
              media={media}
              renditionType={giphyDialogSettings.renditionType}
              style={{ aspectRatio: media.aspectRatio }}
            />
          </ScrollView>
        )}
      </View>
    </View>
  )
}
