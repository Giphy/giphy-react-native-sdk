## API Reference

* [GiphySDK](#giphysdk)
* [GiphyDialog](#giphydialog)

<br/>

## GiphySDK
Contains methods for configuring basic parameters, such as API keys.

### </> configure: `configure(options: GiphySDKConfig) => void`
Configure the basic settings of Giphy SDK
#### Options
| Option           | Description                                                                                                                        | Type      | Default | Platform            |
|------------------|------------------------------------------------------------------------------------------------------------------------------------|-----------|---------|---------------------|
| apiKey           | Android or iOS SDK key. Please remember, you should use a separate key for every platform (Android, iOS, Web) you add our SDKs to. | `string`  | `None`  | ✅Android <br/> ✅iOS |
| verificationMode | When you're ready to get a production key from Giphy, turn on the verification mode by setting this option to `true`.              | `boolean` | `false` | ✅Android <br/> ✅iOS |
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
| Option                    | Description                                                                                                                                                                                                                                                             | Type                                                                                                                                                    | Default                                                                                                                                                                | Platform            |
|---------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------|
| mediaTypeConfig           | Type(s) of content to be displayed in the dialog. <br/> `Note`: Emoji only is not available for the carousel layout option.                                                                                                                                             | [`GiphyContentType`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L7-L13) \[\]     | <details><summary>Expand</summary>`[GiphyContentType.Recents, GiphyContentType.Gif,GiphyContentType.Sticker, GiphyContentType.Emoji, GiphyContentType.Text]`</details> | ✅Android <br/> ✅iOS |
| rating                    | A specific content rating for the search results.                                                                                                                                                                                                                       | [`GiphyRating`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L22-L29)              | `GiphyRating.PG13`                                                                                                                                                     | ✅Android <br/> ✅iOS |
| renditionType             | A rendition type for the grid.                                                                                                                                                                                                                                          | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51)           | `GiphyRendition.FixedWidth`                                                                                                                                            | ✅Android <br/> ✅iOS |
| showConfirmationScreen    | Show a secondary confirmation screen when the user taps a GIF, which shows a larger rendition of the asset. This confirmation screen is only available for `GiphyDirection.Vertical` mode - this property will be ignored if the layout is `GiphyDirection.Horizontal`. | `boolean`                                                                                                                                               | `false`                                                                                                                                                                | ✅Android <br/> ✅iOS |
| stickerColumnCount        | For carousel layouts, we provide the option to set the number of columns for stickers and text.                                                                                                                                                                         | [`GiphyStickersColumnCount`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L53-L57) | `GiphyStickersColumnCount.Three`                                                                                                                                       | ✅Android <br/> ✅iOS |
| theme                     | Adjust the GiphyDialog theme                                                                                                                                                                                                                                            | [`GiphyThemePreset`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L1-L5)           | `GiphyThemePreset.Light`                                                                                                                                               | ✅Android <br/> ✅iOS |
| fileType                  | A file type for the grid.                                                                                                                                                                                                                                               | [`GiphyFileExtension`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L59-L63)       | `GiphyFileExtension`                                                                                                                                                   | ✅Android <br/> ✅iOS |
| confirmationRenditionType | A rendition type for the confirmation screen.                                                                                                                                                                                                                           | [`GiphyRendition`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L31-L51)           | `GiphyRendition.Original`                                                                                                                                              | ✅Android <br/> ❌iOS |
| selectedContentType       | The default Giphy Content-Type.                                                                                                                                                                                                                                         | [`GiphyContentType`](https://github.com/Giphy/giphy-react-native-sdk/blob/5c4586c09acc6ebbc760feecede4b740f55e4d9a/src/native/types.ts#L7-L13)          | `GiphyContentType.Gif`                                                                                                                                                 | ✅Android <br/> ❌iOS |
| showCheckeredBackground   | Enable/disable the checkered background for stickers and text media type.                                                                                                                                                                                               | `boolean`                                                                                                                                               | `false`                                                                                                                                                                | ✅Android <br/> ❌iOS |
| showSuggestionsBar        | Show/hide a suggestions bar.                                                                                                                                                                                                                                            | `boolean`                                                                                                                                               | `true`                                                                                                                                                                 | ✅Android <br/> ❌iOS |
| useBlurredBackground      | Use a translucent blurred background of the template container.                                                                                                                                                                                                         | `boolean`                                                                                                                                               | `false`                                                                                                                                                                | ✅Android <br/> ❌iOS |
| shouldLocalizeSearch      | Option to choose whether or not to localize the search results based on phone settings.                                                                                                                                                                                 | `boolean`                                                                                                                                               | `false`                                                                                                                                                                | ❌Android <br/> ✅iOS |
| trayHeightMultiplier      | Height for the tray's "snap point" as a ratio of the GiphyDialog's height.                                                                                                                                                                                              | `number`                                                                                                                                                | `0.7`                                                                                                                                                                  | ❌Android <br/> ✅iOS |
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
