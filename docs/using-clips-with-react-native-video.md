## Using clips with React-Native-Video

[GiphyVideoView](api.md#giphyvideoview) provides basic video player functionality. But sometimes, you need more control
over playback, volume, or buffering. To handle this, you can use, for
example, [React-Native-Video](https://github.com/react-native-video/react-native-video). This component provides many
advanced features and can be easily integrated into existing or new applications.

#### Examples:

- **Using React-Native-Video with GiphyDialog**

```typescript jsx
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, ScrollView } from 'react-native'
import Video from 'react-native-video'
import { getBestVideo, getGifWidth } from '@giphy/js-util/dist/gif-utils'
import {
  GiphyDialog,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyMedia,
  GiphySDK,
  GiphyContentType,
} from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '*****************' })

GiphyDialog.configure({
  mediaTypeConfig: [GiphyContentType.Clips],
  showConfirmationScreen: true,
})

const MAX_VIDEO_HEIGHT = 400

// Get the URL of the best video for a specific height
function getBestVideoUrl(media: GiphyMedia) {
  const width = getGifWidth(media.source, MAX_VIDEO_HEIGHT)
  const bestVideo = getBestVideo(media.source.video, width, MAX_VIDEO_HEIGHT)
  return bestVideo?.url
}

export default function App() {
  const [media, setMedia] = useState<GiphyMedia | null>(null)

  // Handling GIFs selection in GiphyDialog
  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (e) => {
      setMedia(e.media)
      GiphyDialog.hide()
    }
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler,
    )
    return () => {
      listener.remove()
    }
  }, [])

  return (
    <SafeAreaView>
      <Button title='Show Giphy Dialog' onPress={() => GiphyDialog.show()} />
      {media && (
        <ScrollView
          style={{
            aspectRatio: media.aspectRatio,
            maxHeight: MAX_VIDEO_HEIGHT,
            padding: 24,
            width: '100%',
          }}
        >
          <Video
            key={media.id}
            controls={true}
            repeat={true}
            source={{ uri: getBestVideoUrl(media) }}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
```

- **Using React-Native-Video with GiphyGridView**

```typescript jsx
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, TextInput } from 'react-native'
import Video from 'react-native-video'
import { getBestVideo, getGifWidth } from '@giphy/js-util/dist/gif-utils'
import {
  GiphyContent,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaType,
  GiphySDK,
} from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '*****************' })


const MAX_VIDEO_HEIGHT = 400

// Get the URL of the best video for a specific height
function getBestVideoUrl(media: GiphyMedia) {
  const width = getGifWidth(media.source, MAX_VIDEO_HEIGHT)
  const bestVideo = getBestVideo(media.source.video, width, MAX_VIDEO_HEIGHT)
  return bestVideo?.url
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [media, setMedia] = useState<GiphyMedia | null>(null)

  return (
    <SafeAreaView>
      <TextInput
        autoFocus
        onChangeText={setSearchQuery}
        placeholder='Search...'
        value={searchQuery}
      />
      <GiphyGridView
        content={GiphyContent.search({
          searchQuery: searchQuery,
          mediaType: GiphyMediaType.Video,
        })}
        cellPadding={3}
        style={{ height: 300, marginTop: 24 }}
        onMediaSelect={(e) => setMedia(e.nativeEvent.media)}
      />
      {media && (
        <ScrollView
          style={{
            aspectRatio: media.aspectRatio,
            maxHeight: MAX_VIDEO_HEIGHT,
            padding: 24,
            width: '100%',
          }}
        >
          <Video
            key={media.id}
            controls={true}
            repeat={true}
            source={{ uri: getBestVideoUrl(media) }}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
```

- **Using React-Native-Video without Giphy React Native SDK**

```typescript jsx
import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, TextInput } from 'react-native'
import Video from 'react-native-video'
import { getBestVideo, getGifWidth } from '@giphy/js-util'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { IGif } from '@giphy/js-types'

// Configure API keys
const gf = new GiphyFetch('*******************')

const MAX_VIDEO_HEIGHT = 400

// Get the URL of the best video for a specific height
function getBestVideoUrl(media: IGif) {
  const width = getGifWidth(media, MAX_VIDEO_HEIGHT)
  const bestVideo = getBestVideo(media.video, width, MAX_VIDEO_HEIGHT)
  return bestVideo?.url
}

function getAspectRatio(media: IGif) {
  const width = getGifWidth(media, MAX_VIDEO_HEIGHT)
  return width / MAX_VIDEO_HEIGHT
}

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [media, setMedia] = useState<IGif | null>(null)

  const searchVideo = async (term: string) => {
    const resp = await gf.search(term, { type: 'videos', limit: 1 })
    setMedia(resp.data[0])
  }

  useEffect(() => {
    const tID = setTimeout(() => searchVideo(searchQuery), 1000)
    return () => {
      clearTimeout(tID)
    }
  }, [searchQuery])

  return (
    <SafeAreaView>
      <TextInput
        autoFocus
        onChangeText={setSearchQuery}
        placeholder='Search...'
        value={searchQuery}
      />
      {media && (
        <ScrollView
          style={{
            aspectRatio: getAspectRatio(media),
            maxHeight: MAX_VIDEO_HEIGHT,
            padding: 24,
            width: '100%',
          }}
        >
          <Video
            key={media.id}
            controls={true}
            repeat={true}
            source={{ uri: getBestVideoUrl(media) }}
            style={{ aspectRatio: getAspectRatio(media) }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
```
