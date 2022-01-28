# 1.4.1 (2022-01-18)

### Native SDKs

- Giphy Android SDK [v2.1.14](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.14)
- Giphy iOS SDK [v2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

###Bug Fixes

- [Android:GiphyDialog] Fix an issue where calling GiphyDialog.show() on an Android device could cause an error ([#52](https://github.com/Giphy/giphy-react-native-sdk/issues/52)) ([860387a](https://github.com/Giphy/giphy-react-native-sdk/commit/860387a90a5cfdfba28be535ca6e7d6dc546a2ac))

# 1.4.0 (2022-01-12)

### Native SDKs

- Giphy Android SDK [v2.1.14](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.14)
- Giphy iOS SDK [v2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

###Features

- [Android:GiphyMediaView] Add the showCheckeredBackground property ([#50](https://github.com/Giphy/giphy-react-native-sdk/issues/50)) ([e50103f](https://github.com/Giphy/giphy-react-native-sdk/commit/e50103fb97a9074419d6224215440aeca5143462))
- [Android:GiphySDK] Add the videoCacheMaxBytes property ([#49](https://github.com/Giphy/giphy-react-native-sdk/issues/49)) ([8406613](https://github.com/Giphy/giphy-react-native-sdk/commit/8406613d8e4f8332ad055a00daa137a66f2bcd79))

###Build System

- [core] Bumps Giphy Android SDK from [v2.1.12](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.12) to [v2.1.14](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.14)

# 1.3.0 (2021-12-08)

### Native SDKs

- Giphy Android SDK [v2.1.12](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.12)
- Giphy iOS SDK [v2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

###Bug Fixes

- [ios] Fix the issue with reference to self in async blocks ([ca9d444](https://github.com/Giphy/giphy-react-native-sdk/commit/ca9d4448b25c24ed7ffc644b1941fd62318fa8a9))

###Features

- [GiphyMediaView] Add an API to control play/pause states ([c3ec0e2](https://github.com/Giphy/giphy-react-native-sdk/commit/c3ec0e2d329eb36c2f223dea72b6ee5f9d0d0ecd))

# 1.2.0 (2021-12-01)

### Native SDKs

- Giphy Android SDK [v2.1.12](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.12)
- Giphy iOS SDK [v2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

###Bug Fixes

- [Android] Fix NativeEventEmitter warnings in RN 0.65 ([#43](https://github.com/Giphy/giphy-react-native-sdk/issues/43)) ([1a65090](https://github.com/Giphy/giphy-react-native-sdk/commit/1a65090))
- [Android:GiphyGridView] Fix issue with rendering the recent GIFs (#41) ([11fa2ce](https://github.com/Giphy/giphy-react-native-sdk/commit/11fa2ce))

###Features

- **Captions**! A Closed Captions control is now provided for the `.Clips` content type on both the detail "confirmation" screen as well as the `GiphyVideoView`

###Build System

- [core] Bumps Giphy Android SDK from [v2.1.7](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.7) to [v2.1.12](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.12)
- [core] Bumps Giphy iOS SDK from [v2.1.12](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.12) to [v.2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

# 1.1.1 (2021-10-06)

### Native SDKs

- Giphy Android SDK [v2.1.7](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.7)
- Giphy iOS SDK [v2.1.12](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.12)

###Bug Fixes

- [Android:GiphyGridView] Fix crash on `didLongPressCell` ([#33](https://github.com/Giphy/giphy-react-native-sdk/issues/33)) @M1ST4KE

# 1.1.0 (2021-09-09)

### Native SDKs

- Giphy Android SDK [v2.1.7](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.7)
- Giphy iOS SDK [v2.1.12](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.12)

###Bug Fixes

- Bumps scripts don't update lockfile ([bd4cc43](https://github.com/Giphy/giphy-react-native-sdk/commit/bd4cc4360fdd2183e23b74ddadb01cdf89112a8c))
- Issues where state saves references only to the props for the last component ([14b9236](https://github.com/Giphy/giphy-react-native-sdk/commit/14b9236535ad9f366be36744b06a7c74a54c8ca4))
- [GiphyVideoView] Typo ([edc62ae](https://github.com/Giphy/giphy-react-native-sdk/commit/edc62ae3f80f38fac1ec17e6d9d87f979370b35d))

###Features

- [GiphyVideoManager] This is a new module that allows to mute or pause all clips. For example, you can pause all clips when a user opens a modal.
- [GiphyGridView] Add `showCheckeredBackground` prop
- [GiphyVideoView] Add callback support for `onPlaybackStateChanged`, `onMute`, `onUnmute`, and `onError` events.
- [GiphyVideoView] Add `autoPlay` prop as a replacement for `playing` prop to avoid misuse of the component.
- [GiphyVideoView] Mark `playing` prop as deprecated.

###Build System

- [core] Bumps Giphy Android SDK from [v2.1.6](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.6) to [v2.1.7](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.7)
- [core] Bumps Giphy iOS SDK from [v2.1.11](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.11) to [v2.1.12](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.12)

# 1.0.3 (2021-08-26)

### Native SDKs

- Giphy Android SDK [v2.1.6](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.6)
- Giphy iOS SDK [v2.1.11](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.11)

###Bug Fixes

- [Android:GiphyVideoViewManager] Fix the issue with viewing multiple clips
- [Android:Utils] Fix app crashes due to absent rendition in media

###Build System

- [core] Bumps `Giphy Android SDK` from [v2.1.4](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.4) to [v2.1.6](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.6)
- [core] Bumps `Giphy iOS SDK` from [v2.1.10](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.10) to [v2.1.11](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.11)

# 1.0.2 (2021-08-19)

### Native SDKs

- Giphy Android SDK [v2.1.4](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.4)
- Giphy iOS SDK [v2.1.10](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.10)

###Bug Fixes

- [GiphyDialog] Fix launch error when `rootViewController` is `nil` ([#19](https://github.com/Giphy/giphy-react-native-sdk/issues/19)) ([81ff417](https://github.com/Giphy/giphy-react-native-sdk/commit/81ff417de548d775210fd2544ebb234cebeb80ec))

# 1.0.1 (2021-08-09)

### Native SDKs

- Giphy Android SDK [v2.1.4](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.4)
- Giphy iOS SDK [v2.1.10](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.10)

###Features

- [GiphySDK] Add metadata to the configuration method
- [LICENSE] Update to Apache-2.0 license

# 1.0.0 (2021-07-21)

### Native SDKs

- Giphy Android SDK [v2.1.3](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.3)
- Giphy iOS SDK [v2.1.9](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.9)

###Features

- **Clips (GIFs with Sound!) is a brand new content type available in the SDK**
- [GiphyDialog] Add `clipsPreviewRenditionType` prop
- [GiphyGridView] Add `clipsPreviewRenditionType` and `renditionType` props

###Documentation

- [Docs] Add section for `GiphyVideoView`

###BREAKING CHANGES

- [GiphyDialog] Remove `useBlurredBackground` prop
