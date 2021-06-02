## API Reference

* [GiphySDK](#giphysdk)
* [GiphyDialog](#giphydialog)

<br/>

## GiphySDK
Contains methods for configuring basic parameters, such as API keys.

### </> configure: `configure(options: GiphySDKConfig) => void`
Configure the basic settings of Giphy SDK
#### Options
| Option           | Description                                                                                                                        | Type      | Default | Platform                        |
|------------------|------------------------------------------------------------------------------------------------------------------------------------|-----------|---------|---------------------------------|
| apiKey           | Android or iOS SDK key. Please remember, you should use a separate key for every platform (Android, iOS, Web) you add our SDKs to. | `string`  | `None`  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| verificationMode | When you're ready to get a production key from Giphy, turn on the verification mode by setting this option to `true`.              | `boolean` | `false` | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
#### Example
```typescript
// giphy.setup.ios.ts

GiphySDK.configure({
  apiKey: '*************', // iOS SDK key
  verificationMode: false
})
```

## GiphyDialog
Singleton, which provides pre-built templates that handle the entirety of the GIPHY experience
### </> configure: `configure(options: GiphyDialogConfig) => void`
Configure the `GiphyDialog` view and behavior
#### Options
| Option                    | Description                                                                                                                                                                                                                                                             | Type                                                                                                                                                    | Default                                                                                 | Platform                        |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------|---------------------------------|
| mediaTypeConfig           | Type(s) of content to be displayed in the dialog. <br/> `Note`: Emoji only is not available for the carousel layout option.                                                                                                                                             | [`GiphyContentType`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L7-L13) \[\]     | <details><summary>Expand</summary>`[.Recents, .Gif, .Sticker, .Emoji, .Text]`</details> | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| rating                    | A specific content rating for the search results.                                                                                                                                                                                                                       | [`GiphyRating`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L22-L29)              | `.PG13`                                                                                 | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| renditionType             | A rendition type for the grid.                                                                                                                                                                                                                                          | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51)           | `.FixedWidth`                                                                           | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| showConfirmationScreen    | Show a secondary confirmation screen when the user taps a GIF, which shows a larger rendition of the asset. This confirmation screen is only available for `GiphyDirection.Vertical` mode - this property will be ignored if the layout is `GiphyDirection.Horizontal`. | `boolean`                                                                                                                                               | `false`                                                                                 | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| stickerColumnCount        | For carousel layouts, we provide the option to set the number of columns for stickers and text.                                                                                                                                                                         | [`GiphyStickersColumnCount`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L53-L57) | `.Three`                                                                                | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| theme                     | Adjust the GiphyDialog theme                                                                                                                                                                                                                                            | [`GiphyThemePreset`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L1-L5)           | `.Light`                                                                                | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| fileType                  | A file type for the grid.                                                                                                                                                                                                                                               | [`GiphyFileExtension`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L59-L63)       | `.GIF`                                                                                  | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| confirmationRenditionType | A rendition type for the confirmation screen.                                                                                                                                                                                                                           | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51)           | `.Original`                                                                             | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| selectedContentType       | The default Giphy Content-Type.                                                                                                                                                                                                                                         | [`GiphyContentType`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L7-L13)          | `.Gif`                                                                                  | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| showCheckeredBackground   | Enable/disable the checkered background for stickers and text media type.                                                                                                                                                                                               | `boolean`                                                                                                                                               | `false`                                                                                 | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| showSuggestionsBar        | Show/hide a suggestions bar.                                                                                                                                                                                                                                            | `boolean`                                                                                                                                               | `true`                                                                                  | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| useBlurredBackground      | Use a translucent blurred background of the template container.                                                                                                                                                                                                         | `boolean`                                                                                                                                               | `false`                                                                                 | ✅&nbsp;Android <br/> ❌&nbsp;iOS |
| shouldLocalizeSearch      | Option to choose whether or not to localize the search results based on phone settings.                                                                                                                                                                                 | `boolean`                                                                                                                                               | `false`                                                                                 | ❌&nbsp;Android <br/> ✅&nbsp;iOS |
| trayHeightMultiplier      | Height for the tray's "snap point" as a ratio of the GiphyDialog's height.                                                                                                                                                                                              | `number`                                                                                                                                                | `0.7`                                                                                   | ❌&nbsp;Android <br/> ✅&nbsp;iOS |
### </> show: `show() => void`
Show the Giphy Dialog
### </> hide: `hide() => void`
Hide the Giphy Dialog
### Supported events &#x1F514;
Giphy Dialog implements the React NativeEventEmitter interface and supports the following events:
* onMediaSelect ```on('onMediaSelect', (e: { media: GiphyMedia }) => ...)```
* onMediaSelect ```on('onDismiss', () => ...)```
#### Example
```typescript jsx
import React from 'react';
import { SafeAreaView, Button } from 'react-native';
import { GiphyDialog, GiphySDK } from '@giphy/react-native-sdk';

// Configure API keys
GiphySDK.configure({ apiKey: '*************' });

export default function App() {
  return (
    <SafeAreaView>
      <Button title="Show Giphy Dialog" onPress={() => GiphyDialog.show()} />
    </SafeAreaView>
  );
};
```

## GiphyMediaView
Designed to render [GiphyMedia](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L65-L69) objects
#### Props
| Option        | Description                                  | Type                                                                                                                                          | Default       | Platform                        |
|---------------|----------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|---------------|---------------------------------|
| media         | Pass a GiphyMedia object to display content. | [`GiphyMedia`](https://github.com/Giphy/giphy-react-native-sdk/blob/4b0f2d614abb9a7116bdc530e7a39bf52d5424e2/src/native/types.ts#L65-L69)     | `None`        | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
| renditionType | A rendition type for the view.               | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51) | `.FixedWidth` | ✅&nbsp;Android <br/> ✅&nbsp;iOS |
#### Example

```typescript jsx
import React, { useState, useEffect } from 'react'
import { SafeAreaView, Button, ScrollView } from 'react-native';
import { GiphyDialog, GiphySDK, GiphyMedia, GiphyMediaView } from '@giphy/react-native-sdk';

// Configure API keys
GiphySDK.configure({ apiKey: '*************' });

export default function App() {
  const [media, setMedia] = useState<GiphyMedia | null>(null);

  useEffect(() => {
    const handler: GiphyDialogMediaSelectEventHandler = (e) => {
      setMedia(e.media);
      GiphyDialog.hide();
    };
    const listener = GiphyDialog.addListener(
      GiphyDialogEvent.MediaSelected,
      handler
    );
    return () => {
      listener.remove();
    }
  }, []);

  return (
    <SafeAreaView>
      <Button title="Show Giphy Dialog" onPress={() => GiphyDialog.show()} />
      {media && (
        <ScrollView
          style={{ aspectRatio: media.aspectRatio, maxHeight: 400, width: '100%' }}
        >
          <GiphyMediaView
            media={media}
            style={{ aspectRatio: media.aspectRatio }}
          />
        </ScrollView>
      )}
    </SafeAreaView>
  );
};
```
