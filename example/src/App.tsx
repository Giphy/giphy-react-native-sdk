import React, { useEffect, useState } from 'react'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  GiphyContent,
  GiphyDialog,
  GiphyDialogConfig,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyDirection,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaView,
  GiphyVideoView,
} from '@giphy/react-native-sdk'

import './giphy.setup'
import { GiphyDialogSettings, DEFAULT_DIALOG_SETTINGS } from './Settings'
import { Dialog } from './Dialog'

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
  textInput: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    marginHorizontal: 8,
  },
  giphyGridView: {
    height: 400,
    marginHorizontal: 8,
  },
  preview: {
    alignSelf: 'center',
    backgroundColor: '#fff',
    maxHeight: 400,
    padding: 4,
    width: '100%',
  },
})

export default function App() {
  const [dialogSettingsVisible, setDialogSettingsVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [media, setMedia] = useState<GiphyMedia | null>(null)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [giphyDialogSettings, setGiphyDialogSettings] =
    useState<GiphyDialogConfig>(DEFAULT_DIALOG_SETTINGS)

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
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => setDialogSettingsVisible(true)}
        >
          <Text style={styles.cardButtonText}>Dialog Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          onPress={() => GiphyDialog.show()}
        >
          <Text style={styles.cardButtonText}>Show Dialog</Text>
        </TouchableOpacity>
      </View>
      <Dialog
        visible={dialogSettingsVisible}
        onRequestClose={() => setDialogSettingsVisible(false)}
      >
        <GiphyDialogSettings
          settings={giphyDialogSettings}
          onSettingsChange={setGiphyDialogSettings}
        />
      </Dialog>

      <View style={styles.card}>
        <TextInput
          autoFocus={false}
          onFocus={() => setSearchVisible(true)}
          placeholder="Search..."
          style={styles.textInput}
          value={searchQuery}
        />
        <Dialog
          visible={searchVisible}
          onRequestClose={() => setSearchVisible(false)}
        >
          <TextInput
            autoFocus
            onChangeText={setSearchQuery}
            placeholder="Search..."
            style={styles.textInput}
            value={searchQuery}
          />
          {searchVisible && (
            <GiphyGridView
              content={GiphyContent.search({ searchQuery: searchQuery })}
              cellPadding={3}
              fixedSizeCells={false}
              orientation={GiphyDirection.Vertical}
              spanCount={1}
              style={styles.giphyGridView}
              onContentUpdate={(e) =>
                console.log(
                  'onContentUpdate',
                  JSON.stringify(e.nativeEvent, null, 2)
                )
              }
              onScroll={(e) =>
                console.log('onScroll', JSON.stringify(e.nativeEvent, null, 2))
              }
              onMediaSelect={(e) => {
                setSearchVisible(false)
                setMedia(e.nativeEvent.media)
              }}
            />
          )}
        </Dialog>
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Preview</Text>
        {media && (
          <ScrollView
            style={[styles.preview, { aspectRatio: media.aspectRatio }]}
          >
            {media.isVideo ? (
              <GiphyVideoView
                media={media}
                playing={true}
                muted={false}
                style={{ aspectRatio: media.aspectRatio }}
              />
            ) : (
              <GiphyMediaView
                media={media}
                style={{ aspectRatio: media.aspectRatio }}
              />
            )}
          </ScrollView>
        )}
      </View>
    </View>
  )
}
