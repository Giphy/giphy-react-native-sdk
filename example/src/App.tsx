import React, { useCallback, useEffect, useRef, useState } from 'react'
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
  GiphyClipsRendition,
  GiphyContent,
  GiphyDialog,
  GiphyDialogConfig,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyDirection,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaType,
  GiphyMediaView,
  GiphyRendition,
  GiphyVideoManager,
  GiphyVideoView,
} from '@giphy/react-native-sdk'

import './giphy.setup'
import { DEFAULT_DIALOG_SETTINGS, GiphyDialogSettings } from './Settings'
import { Dialog } from './Dialog'
import { GIPHY_MEDIA_FIXTURE } from './fixtures'

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
  previewContainer: {
    backgroundColor: '#fff',
    maxHeight: 450,
    paddingHorizontal: 15,
  },
  previewCell: {
    alignSelf: 'center',
    margin: 10,
    maxHeight: 300,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.4,
    shadowRadius: 4,
    width: '100%',
  },
})

export default function App() {
  const [dialogSettingsVisible, setDialogSettingsVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [medias, setMedias] = useState<GiphyMedia[]>(GIPHY_MEDIA_FIXTURE)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [giphyDialogSettings, setGiphyDialogSettings] =
    useState<GiphyDialogConfig>(DEFAULT_DIALOG_SETTINGS)

  const mediasRef = useRef(medias)
  mediasRef.current = medias

  const addMedia = useCallback((media: GiphyMedia) => {
    setMedias([media, ...mediasRef.current])
  }, [])

  useEffect(() => {
    GiphyDialog.configure(giphyDialogSettings)
  }, [giphyDialogSettings])

  // Mute all Giphy clips when settings dialog is opened
  useEffect(() => {
    if (dialogSettingsVisible) {
      GiphyVideoManager.muteAll()
    }
  }, [dialogSettingsVisible])

  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (e) => {
      addMedia(e.media)
      GiphyDialog.hide()
    }
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler
    )
    return () => {
      listener.remove()
    }
  }, [addMedia])

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
          onTouchEnd={() => setSearchVisible(true)}
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
              content={GiphyContent.search({
                searchQuery: searchQuery,
                mediaType: GiphyMediaType.Video,
              })}
              cellPadding={3}
              clipsPreviewRenditionType={GiphyClipsRendition.FixedHeight}
              fixedSizeCells={false}
              orientation={GiphyDirection.Vertical}
              renditionType={GiphyRendition.FixedWidth}
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
                addMedia(e.nativeEvent.media)
              }}
            />
          )}
        </Dialog>
      </View>

      <View style={styles.card}>
        <Text style={styles.header}>Preview</Text>
        <ScrollView style={styles.previewContainer}>
          {medias.map((media, idx) => (
            <View
              key={media.id}
              style={[styles.previewCell, { aspectRatio: media.aspectRatio }]}
            >
              {media.isVideo ? (
                <GiphyVideoView
                  media={media}
                  muted={true}
                  playing={idx === 0}
                  style={{ aspectRatio: media.aspectRatio }}
                />
              ) : (
                <GiphyMediaView
                  media={media}
                  style={{ aspectRatio: media.aspectRatio }}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
