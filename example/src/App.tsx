import React, { useEffect, useRef, useState } from 'react'
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

function useLatest<V>(value: V) {
  const ref = useRef<V>(value)
  ref.current = value
  return ref
}

export default function App() {
  const [dialogSettingsVisible, setDialogSettingsVisible] = useState(false)
  const [searchVisible, setSearchVisible] = useState(false)
  const [medias, setMedias] = useState<GiphyMedia[]>(GIPHY_MEDIA_FIXTURE)
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [giphyDialogSettings, setGiphyDialogSettings] =
    useState<GiphyDialogConfig>(DEFAULT_DIALOG_SETTINGS)

  const addMedia = (media: GiphyMedia) => {
    setMedias([media, ...medias])
  }

  // Apply Giphy Dialog settings
  useEffect(() => {
    GiphyDialog.configure(giphyDialogSettings)
  }, [giphyDialogSettings])

  // Mute all clips when a user opens the settings dialog
  useEffect(() => {
    if (dialogSettingsVisible) {
      GiphyVideoManager.muteAll()
    }
  }, [dialogSettingsVisible])

  const addMediaRef = useLatest(addMedia)
  useEffect(() => {
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      (e) => {
        addMediaRef.current(e.media)
        GiphyDialog.hide()
      }
    )
    return () => {
      listener.remove()
    }
  }, [addMediaRef])

  return (
    <View testID="app" style={styles.container}>
      {/* Displaying Giphy Dialog & settings for it  */}
      <View style={styles.card}>
        <TouchableOpacity
          style={styles.cardButton}
          testID="show-gph-dialog-settings"
          onPress={() => setDialogSettingsVisible(true)}
        >
          <Text style={styles.cardButtonText}>Dialog Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cardButton}
          testID="show-gph-dialog"
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

      {/* Displaying Giphy Grid View with the custom search bar */}
      <View style={styles.card}>
        <TextInput
          autoFocus={false}
          onFocus={() => setSearchVisible(true)}
          onTouchEnd={() => setSearchVisible(true)}
          placeholder="Search..."
          style={styles.textInput}
          testID="gph-grid_search-stub"
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
            testID="gph-grid_search-input"
            value={searchQuery}
          />
          {searchVisible && (
            <GiphyGridView
              content={GiphyContent.search({
                searchQuery: searchQuery,
                mediaType: GiphyMediaType.Sticker,
              })}
              cellPadding={3}
              clipsPreviewRenditionType={GiphyClipsRendition.FixedHeight}
              fixedSizeCells={false}
              orientation={GiphyDirection.Vertical}
              renditionType={GiphyRendition.FixedWidth}
              spanCount={1}
              showCheckeredBackground={false}
              style={styles.giphyGridView}
              testID="gph-grid-view"
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

      {/* Displaying selected media */}
      <View style={styles.card}>
        <Text style={styles.header}>Preview</Text>
        <ScrollView style={styles.previewContainer}>
          {medias.map((media) => (
            <View
              key={media.id}
              style={[styles.previewCell, { aspectRatio: media.aspectRatio }]}
            >
              {media.isVideo ? (
                <GiphyVideoView
                  autoPlay={false}
                  media={media}
                  muted={true}
                  style={{ aspectRatio: media.aspectRatio }}
                  testID={`gph-video-view-${media.id}`}
                  onError={(e) => console.error(e.nativeEvent.description)}
                  onPlaybackStateChanged={(e) =>
                    console.log(
                      'onPlaybackStateChanged',
                      JSON.stringify(e.nativeEvent, null, 2)
                    )
                  }
                />
              ) : (
                <GiphyMediaView
                  media={media}
                  style={{ aspectRatio: media.aspectRatio }}
                  testID={`gph-media-view-${media.id}`}
                />
              )}
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}
