## API Reference

- [GiphySDK](#giphysdk)
- [GiphyDialog](#giphydialog)
- [GiphyMediaView](#giphymediaview)
- [GiphyVideoView](#giphyvideoview)
- [GiphyVideoManager](#giphyvideomanager)
- [GiphyGridView](#giphygridview)
- [GiphyContent](#giphycontent)

## GiphySDK

Contains methods for configuring basic parameters, such as API keys.

### </> configure: `configure(options: GiphySDKConfig) => void`

Configure basic settings of GIPHY SDK.

#### Options

| Option           | Description                                                                                                                   | Type      | Default | Platform                        |
|------------------|-------------------------------------------------------------------------------------------------------------------------------|-----------|---------|---------------------------------|
| apiKey           | Android or iOS SDK key. Please remember, you should use a separate key for every platform (Android, iOS) you add our SDKs to. | `string`  | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |

#### Example

```typescript
// giphy.setup.ios.ts
import { GiphySDK } from '@giphy/react-native-sdk'

GiphySDK.configure({
  apiKey: '*************', // iOS SDK key
})
```

```typescript jsx
// giphy.setup.android.ts
import { GiphySDK } from '@giphy/react-native-sdk'

GiphySDK.configure({
  apiKey: '*************', // Android SDK key
})
```

## GiphyDialog

Singleton, which provides pre-built templates that handle the entirety of the GIPHY experience.

### </> configure: `configure(options: GiphyDialogConfig) => void`

Configure the `GiphyDialog` view and behavior.

#### Options

| Option                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | Type                                                                                                                                                    | Default                                                                                 | Platform                        |
|---------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|---------------------------------|
| clipsPreviewRenditionType | Certain renditions (cases of the [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51) enum) are not available for Clips. As a result, if you set the renditionType property of the [GiphyDialog](#giphydialog) to an unsupported rendition type, clips previews may not play back correctly in the grid. To account for this limitation, we created this property specifically to work with clips. | [`GiphyClipsRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/49b4ac5adc488133a6e84e06717f952a00d6fa3d/src/native/types.ts#L69-L83)      | `.FixedWidth`                                                                           | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| confirmationRenditionType | A rendition type for the confirmation screen.                                                                                                                                                                                                                                                                                                                                                                                                                                               | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51)           | `.Original`                                                                             | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| fileType                  | A file type for the grid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | [`GiphyFileExtension`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L59-L63)       | `.GIF`                                                                                  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| mediaTypeConfig           | Type(s) of content to be displayed in the dialog. <br/> `Note`: Emoji only is not available for the carousel layout option.                                                                                                                                                                                                                                                                                                                                                                 | [`GiphyContentType`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L7-L13) \[\]     | <details><summary>Expand</summary>`[.Recents, .Gif, .Sticker, .Emoji, .Text]`</details> | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| rating                    | A specific content rating for the search results.                                                                                                                                                                                                                                                                                                                                                                                                                                           | [`GiphyRating`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L22-L29)              | `.PG13`                                                                                 | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| renditionType             | A rendition type for the grid.                                                                                                                                                                                                                                                                                                                                                                                                                                                              | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51)           | `.FixedWidth`                                                                           | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| selectedContentType       | The default Giphy Content-Type.                                                                                                                                                                                                                                                                                                                                                                                                                                                             | [`GiphyContentType`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L7-L13)          | `.Gif`                                                                                  | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| shouldLocalizeSearch      | Option to choose whether or not to localize the search results based on phone settings.                                                                                                                                                                                                                                                                                                                                                                                                     | `boolean`                                                                                                                                               | `false`                                                                                 | ❌&nbsp;Android <br/> ✅&nbsp;iOS |
| showCheckeredBackground   | Enable/disable the checkered background for stickers and text media type.                                                                                                                                                                                                                                                                                                                                                                                                                   | `boolean`                                                                                                                                               | `false`                                                                                 | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| showConfirmationScreen    | Show a secondary confirmation screen when the user taps a GIF, which shows a larger rendition of the asset. This confirmation screen is only available for `GiphyDirection.Vertical` mode - this property will be ignored if the layout is `GiphyDirection.Horizontal`.                                                                                                                                                                                                                     | `boolean`                                                                                                                                               | `false`                                                                                 | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| showSuggestionsBar        | Show/hide a suggestions bar.                                                                                                                                                                                                                                                                                                                                                                                                                                                                | `boolean`                                                                                                                                               | `true`                                                                                  | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| stickerColumnCount        | For carousel layouts, we provide the option to set the number of columns for stickers and text. We recommend using 3 columns for blurred mode.                                                                                                                                                                                                                                                                                                                                              | [`GiphyStickersColumnCount`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L53-L57) | `.Three`                                                                                | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| theme                     | Adjust the GiphyDialog theme                                                                                                                                                                                                                                                                                                                                                                                                                                                                | [`GiphyThemePreset`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L1-L5)           | `.Light`                                                                                | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| trayHeightMultiplier      | Height for the tray's "snap point" as a ratio of the GiphyDialog's height.                                                                                                                                                                                                                                                                                                                                                                                                                  | `number`                                                                                                                                                | `0.7`                                                                                   | ❌&nbsp;Android <br/> ✅&nbsp;iOS |

### </> show: `show() => void`

Show the Giphy Dialog.

### </> hide: `hide() => void`

Hide the Giphy Dialog.

### Supported events &#x1F514;

The Giphy Dialog implements the React NativeEventEmitter interface and supports the following events:

- onMediaSelect ```GiphyDialog.addListener('onMediaSelect', (e: { media: GiphyMedia }) => ...)```
- onDismiss ```GiphyDialog.addListener('onDismiss', () => ...)```

#### Example

```typescript jsx
import React from 'react'
import { SafeAreaView, Button } from 'react-native'
import { GiphyDialog, GiphySDK } from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '*************' })

export default function App() {
  return (
    <SafeAreaView>
      <Button title="Show Giphy Dialog" onPress={() => GiphyDialog.show()} />
    </SafeAreaView>
  )
}
```

## GiphyMediaView

Designed to
render [GiphyMedia](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L65-L69)
objects.

#### Props

| Prop          | Description                                  | Type                                                                                                                                          | Default       | Platform                        |
|---------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------|
| media         | Pass a GiphyMedia object to display content. | [`GiphyMedia`](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L65-L69)     | `None`        | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| renditionType | A rendition type for the view.               | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51) | `.FixedWidth` | ✅&nbsp;Android <br/> ✅&nbsp;iOS |

#### Example

```typescript jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView, Button, ScrollView } from 'react-native'
import {
  GiphyDialog,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyMedia,
  GiphyMediaView,
  GiphySDK,
} from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '*************' })

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
      handler
    )
    return () => {
      listener.remove()
    }
  }, [])

  return (
    <SafeAreaView>
      <Button title="Show Giphy Dialog" onPress={() => GiphyDialog.show()} />
      {media && (
        <ScrollView style={{ aspectRatio: media.aspectRatio, maxHeight: 400, padding: 24, width: '100%' }}>
          <GiphyMediaView
            media={media}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
```

## GiphyVideoView

Similar to the [GiphyMediaView](#giphymediaview) which works for GIFs, Stickers, and Text, the GPHVideoView is a
component that makes it easy to play back GiphyMedia clips video assets. The GiphyVideoView will only work for
GiphyMedia where the `isVideo` property is `true`.

**Note**: `GiphyVideoView` has no advanced features for playback, volume, and buffering control. If you need some
advanced features, you can easily integrate clips with other more advanced video players. For example, we
described [how to use clips with React-Native-Video](using-clips-with-react-native-video.md).

#### Props

| Prop                   | Description                                                                                   | Type                                                                                                                                      | Default | Platform                        |
|------------------------|-----------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|---------|---------------------------------|
| autoPlay               | Set it to true to start the video automatically.                                              | `boolean`                                                                                                                                 | `false` | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| media                  | Pass a GiphyMedia object to display content.                                                  | [`GiphyMedia`](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L65-L69) | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| muted                  | Set to true or false to mute or unmute the player.                                            | `boolean`                                                                                                                                 | `false` | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| onError                | A callback function that will be called when an error occurs whilst attempting to play media. | `(e: NativeSyntheticEvent<{ description: string }>) => void`                                                                              | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| onMute                 | A callback function that will be called when media is muted.                                  | `(e: NativeSyntheticEvent<{}>) => void`                                                                                                   | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| onPlaybackStateChanged | A callback function that will be called when playback state changes.                          | `(e: NativeSyntheticEvent<{ state: GiphyVideoViewPlaybackState }>) => void`                                                               | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| onUnmute               | A callback function that will be called when media is unmuted.                                | `(e: NativeSyntheticEvent<{}>) => void`                                                                                                   | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |

#### Example

- **Using the GiphyDialog**

```typescript jsx
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, ScrollView } from 'react-native'
import {
  GiphyContentType,
  GiphyDialog,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyMedia,
  GiphySDK,
  GiphyVideoView,
} from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '************' })

GiphyDialog.configure({
  mediaTypeConfig: [GiphyContentType.Clips],
  showConfirmationScreen: true,
})

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
      handler
    )
    return () => {
      listener.remove()
    }
  }, [])

  return (
    <SafeAreaView>
      <Button title="Show Giphy Dialog" onPress={() => GiphyDialog.show()} />
      {media && (
        <ScrollView
          style={{
            aspectRatio: media.aspectRatio,
            maxHeight: 400,
            padding: 24,
            width: '100%',
          }}
        >
          <GiphyVideoView
            media={media}
            muted={true}
            autoPlay={true}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
```

- **Using the GiphyGridView**

```typescript jsx
import React, { useState } from 'react'
import { SafeAreaView, ScrollView, TextInput } from 'react-native'
import {
  GiphyContent,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaType,
  GiphySDK,
  GiphyVideoView,
} from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '************' })

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [media, setMedia] = useState<GiphyMedia | null>(null)

  return (
    <SafeAreaView>
      <TextInput
        autoFocus
        onChangeText={setSearchQuery}
        placeholder="Search..."
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
            maxHeight: 400,
            padding: 24,
            width: '100%',
          }}
        >
          <GiphyVideoView
            media={media}
            autoPlay={true}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
```

## GiphyVideoManager

The module that allows you to control GiphyVideoView players.

### </> muteAll: `muteAll() => void`

Mute all GiphyVideoView players.

### </> pauseAll: `pauseAll() => void`

Pause all GiphyVideoView players.

#### Example

- **Mute all clips when a user opens a custom dialog**

```typescript jsx
import React, { useEffect, useState } from 'react'
import { Button, SafeAreaView, ScrollView, Modal, Text } from 'react-native'
import {
  GiphyContentType,
  GiphyDialog,
  GiphyDialogEvent,
  GiphyDialogMediaSelectEventHandler,
  GiphyMedia,
  GiphySDK,
  GiphyVideoManager,
  GiphyVideoView,
} from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '*************' })

GiphyDialog.configure({
  mediaTypeConfig: [GiphyContentType.Clips],
  showConfirmationScreen: true,
})

export default function App() {
  const [media, setMedia] = useState<GiphyMedia | null>(null)
  const [customDialogVisible, setCustomDialogVisible] = useState(false)

  // Handling GIFs selection in GiphyDialog
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

  const openCustomDialog = () => {
    setCustomDialogVisible(true)
    // Mute all clips when a user opens the custom dialog
    GiphyVideoManager.muteAll()
  }

  return (
    <SafeAreaView>
      <Button title="Show Giphy Dialog" onPress={() => GiphyDialog.show()} />
      <Button title="Show Custom Dialog" onPress={openCustomDialog} />
      <Modal
        visible={customDialogVisible}
        onRequestClose={() => setCustomDialogVisible(false)}
      >
        <Text>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
          mattis est eget malesuada malesuada. Cras ullamcorper sem ut erat
          tempor, sed eleifend nisl lacinia. Etiam a eleifend tortor. Donec
          iaculis tincidunt risus eget porttitor. Nullam sed mauris felis. Nam
          ullamcorper purus a tellus blandit dictum. Praesent gravida purus ut
          nisl consectetur, a fermentum leo sagittis.
        </Text>
        <Button title="Close" onPress={() => setCustomDialogVisible(false)} />
      </Modal>
      {media && (
        <ScrollView
          style={{
            aspectRatio: media.aspectRatio,
            maxHeight: 400,
            padding: 24,
            width: '100%',
          }}
        >
          <GiphyVideoView
            media={media}
            muted={false}
            autoPlay={true}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
```

## GiphyGridView

Customizable implementation of a Giphy Grid only.

#### Props

| Prop                      | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | Type                                                                                                                                               | Default                                 | Platform                        |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------|---------------------------------|
| cellPadding               | Spacing between rendered GIFs.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | `number`                                                                                                                                           | `0`                                     | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| clipsPreviewRenditionType | Certain renditions (cases of the [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51) enum) are not available for Clips. As a result, if you set the renditionType property of the [GiphyGridView](#giphygridview) to an unsupported rendition type, clips previews may not play back correctly in the grid. To account for this limitation, we created this property specifically to work with clips. | [`GiphyClipsRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/49b4ac5adc488133a6e84e06717f952a00d6fa3d/src/native/types.ts#L69-L83) | `.FixedWidth`                           | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| content                   | A `GiphyContentRequest` object describing a content request to the Giphy API.                                                                                                                                                                                                                                                                                                                                                                                                                   | [`GiphyContentRequest`](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L84-L88) | `None`                                  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| fixedSizeCells            | Display content in equally sized cells (for stickers only).                                                                                                                                                                                                                                                                                                                                                                                                                                     | `boolean`                                                                                                                                          | `false`                                 | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| onContentUpdate           | A callback function that will be called when a content is updated.                                                                                                                                                                                                                                                                                                                                                                                                                              | `(e: NativeSyntheticEvent<{ resultCount: number }>) => void`                                                                                       | `None`                                  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| onMediaSelect             | A callback function that will be called when a media is selected.                                                                                                                                                                                                                                                                                                                                                                                                                               | `(e: NativeSyntheticEvent<{ media: GiphyMedia }>) => void`                                                                                         | `None`                                  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| onScroll                  | A callback function that will be called when a grid is being scrolled.                                                                                                                                                                                                                                                                                                                                                                                                                          | `(e: NativeSyntheticEvent<{ offset: number }>) => void`                                                                                            | `None`                                  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| orientation               | Tells the scroll direction of the grid. (e.g. `GiphyDirection.Horizontal`, `GiphyDirection.Vertical`)                                                                                                                                                                                                                                                                                                                                                                                           | [`GiphyDirection`](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L71-L74)      | `.Vertical`                             | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| renditionType             | A rendition type for the grid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51)      | `.FixedWidth`                           | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| spanCount                 | Number of lanes in the grid.                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | `number`                                                                                                                                           | Depends on orientation and content type | ✅&nbsp;Android <br/> ✅&nbsp;iOS |

#### Example

```typescript jsx
import React, { useState } from 'react'
import { SafeAreaView, TextInput, ScrollView } from 'react-native'
import {
  GiphyContent,
  GiphyGridView,
  GiphyMedia,
  GiphyMediaView,
  GiphySDK,
} from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '************' })

export default function App() {
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [media, setMedia] = useState<GiphyMedia | null>(null)

  return (
    <SafeAreaView>
      <TextInput
        autoFocus
        onChangeText={setSearchQuery}
        placeholder="Search..."
        value={searchQuery}
      />
      <GiphyGridView
        content={GiphyContent.search({ searchQuery: searchQuery })}
        cellPadding={3}
        style={{ height: 300, marginTop: 24 }}
        onMediaSelect={(e) => setMedia(e.nativeEvent.media)}
      />
      {media && (
        <ScrollView style={{ aspectRatio: media.aspectRatio, maxHeight: 400, padding: 24, width: '100%', }}>
          <GiphyMediaView
            media={media}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  )
}
```

## GiphyContent

Provides methods to describe a content request to the Giphy API.

### </> search: `(options: GiphyContentSearchOptions) => GiphyContentRequest`

#### Options

| Option      | Description                                                    | Type                                                                                                                                          | Default | Platform                        |
|-------------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|---------|---------------------------------|
| mediaType   | A media type that should be loaded (e.g. `GiphyMediaType.Gif`) | [`GiphyMediaType`](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L15-L20) | `.Gif`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| searchQuery | A custom search input (e.g. cats)                              | `string`                                                                                                                                      | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |

### </> trending: `(options: GiphyContentTrendingOptions) => GiphyContentRequest`

#### Options

| Option    | Description                                                    | Type                                                                                                                                          | Default | Platform                        |
|-----------|----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|---------|---------------------------------|
| mediaType | A media type that should be loaded (e.g. `GiphyMediaType.Gif`) | [`GiphyMediaType`](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L15-L20) | `.Gif`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |

### </> trendingGifs: `() => GiphyContentRequest`

### </> trendingStickers: `() => GiphyContentRequest`

### </> trendingText: `() => GiphyContentRequest`

### </> recents: `() => GiphyContentRequest`

### </> emoji: `() => GiphyContentRequest`

### </> animate: `(options: GiphyContentAnimateOptions) => GiphyContentRequest`

#### Options

| Option      | Description                       | Type     | Default | Platform                        |
|-------------|-----------------------------------|----------|---------|---------------------------------|
| searchQuery | A custom search input (e.g. cats) | `string` | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |

### Example

```typescript jsx
import React from 'react'
import { SafeAreaView } from 'react-native'
import { GiphySDK, GiphyGridView, GiphyContent } from '@giphy/react-native-sdk'

// Configure API keys
GiphySDK.configure({ apiKey: '*************' })

export default function App() {
  return (
    <SafeAreaView>
      <GiphyGridView
        content={GiphyContent.trendingGifs()}
        cellPadding={3}
        style={{ height: 400 }}
        onMediaSelect={(e) => {
          console.log(e.nativeEvent.media)
        }}
      />
    </SafeAreaView>
  )
}
```
