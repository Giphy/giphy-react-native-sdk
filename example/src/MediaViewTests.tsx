import React, { useState } from 'react'
import { Keyboard, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { GiphyMediaView, GiphyVideoManager, GiphyVideoView, GiphyVideoViewPlaybackState } from '@giphy/react-native-sdk'

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    paddingVertical: 16,
  },
  input: {
    backgroundColor: '#fff',
    fontSize: 16,
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  buttons: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  button: {
    backgroundColor: '#fff',
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  status: {
    fontSize: 14,
    marginTop: 4,
  },
  preview: {
    backgroundColor: '#fff',
    height: 200,
    marginTop: 8,
  },
})

const PLAYBACK_STATE_NAMES: Record<number, string> = {
  [GiphyVideoViewPlaybackState.Unknown]: 'Unknown',
  [GiphyVideoViewPlaybackState.ReadyToPlay]: 'ReadyToPlay',
  [GiphyVideoViewPlaybackState.Playing]: 'Playing',
  [GiphyVideoViewPlaybackState.Paused]: 'Paused',
}

type Shown = { kind: 'media' | 'video'; id: string }

type ButtonProps = { testID: string; title: string; onPress: () => void }

function Button({ testID, title, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={styles.button}
      testID={testID}
      onPress={() => {
        Keyboard.dismiss()
        onPress()
      }}
    >
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  )
}

// Renders a media view or a video view for a media ID and shows what the view reports,
// so Detox can check the events on screen.
export function MediaViewTests() {
  const [mediaId, setMediaId] = useState('')
  const [shown, setShown] = useState<Shown | null>(null)
  const [error, setError] = useState('none')
  const [load, setLoad] = useState('none')
  const [playbackState, setPlaybackState] = useState('none')
  const [muteEvent, setMuteEvent] = useState('none')

  const resetStatus = () => {
    setError('none')
    setLoad('none')
    setPlaybackState('none')
    setMuteEvent('none')
  }

  const show = (kind: Shown['kind']) => {
    resetStatus()
    setShown({ kind, id: mediaId.trim() })
  }

  // Shows each step 50 ms after the previous one, so a view gets new media (or is replaced)
  // before it has loaded the old one.
  // The status shows what the last step reports.
  const showQuickly = (steps: Shown[]) => {
    steps.forEach((step, index) =>
      setTimeout(() => {
        resetStatus()
        setShown(step)
      }, index * 50)
    )
  }
  const ids = () => mediaId.split(',').map((id) => id.trim())

  // Each action clears the status it changes, so a test can wait for the new value.
  const muteAll = () => {
    setMuteEvent('none')
    GiphyVideoManager.muteAll()
  }
  const pauseAll = () => {
    setPlaybackState('none')
    GiphyVideoManager.pauseAll()
  }
  const resume = () => {
    setPlaybackState('none')
    GiphyVideoManager.resume()
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Media View Tests</Text>
      <TextInput
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Media ID"
        // The e2e tests set the text directly; a soft keyboard would resize the dialog on Android.
        showSoftInputOnFocus={false}
        style={styles.input}
        testID="media-tests_id-input"
        value={mediaId}
        onChangeText={setMediaId}
      />
      <View style={styles.buttons}>
        <Button testID="media-tests_show-media" title="Media view" onPress={() => show('media')} />
        <Button testID="media-tests_show-video" title="Video view" onPress={() => show('video')} />
        <Button testID="media-tests_mute-all" title="Mute all" onPress={muteAll} />
        <Button testID="media-tests_pause-all" title="Pause all" onPress={pauseAll} />
        <Button testID="media-tests_resume" title="Resume" onPress={resume} />
        <Button
          testID="media-tests_video-then-media"
          title="Video, then media"
          onPress={() =>
            showQuickly([
              { kind: 'video', id: ids()[0] },
              { kind: 'media', id: ids()[0] },
            ])
          }
        />
        <Button
          testID="media-tests_switch-media"
          title="Switch media"
          onPress={() => showQuickly(ids().map((id) => ({ kind: 'media', id })))}
        />
      </View>
      <Text style={styles.status} testID="media-tests_error">
        {error}
      </Text>
      <Text style={styles.status} testID="media-tests_load">
        {load}
      </Text>
      <Text style={styles.status} testID="media-tests_playback-state">
        {playbackState}
      </Text>
      <Text style={styles.status} testID="media-tests_mute-event">
        {muteEvent}
      </Text>
      {shown?.kind === 'media' && (
        <GiphyMediaView
          key={shown.kind}
          media={{ id: shown.id }}
          resizeMode="contain"
          style={styles.preview}
          testID="media-tests_media-view"
          onError={(e) => setError(e.nativeEvent.description || 'empty description')}
          onLoad={() => setLoad('loaded')}
        />
      )}
      {shown?.kind === 'video' && (
        <GiphyVideoView
          key={shown.kind}
          autoPlay={true}
          media={{ id: shown.id }}
          muted={false}
          style={styles.preview}
          testID="media-tests_video-view"
          onError={(e) => setError(e.nativeEvent.description || 'empty description')}
          onMute={() => setMuteEvent('mute')}
          onPlaybackStateChanged={(e) =>
            setPlaybackState(PLAYBACK_STATE_NAMES[e.nativeEvent.state] ?? `${e.nativeEvent.state}`)
          }
          onUnmute={() => setMuteEvent('unmute')}
        />
      )}
    </View>
  )
}
