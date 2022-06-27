# 1.9.0 (2022-06-27)

### Native SDKs
* Giphy Android SDK [v2.1.18](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.18)
* Giphy iOS SDK [v2.1.22](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.22)


### Features
* [GiphyVideoManager] Add the resume method to continue paused playback ([c2d6d1b](https://github.com/Giphy/giphy-react-native-sdk/commit/c2d6d1b03bab65896417f4893542bc2739eb0f0b))

### Bug Fixes
* [GiphyVideoView] Sound suddenly starts playing out of nowhere ([#69](https://github.com/Giphy/giphy-react-native-sdk/issues/69)) ([a7c2a03](https://github.com/Giphy/giphy-react-native-sdk/commit/a7c2a0337d29b212ee3f7ae4839376caf013ce8a))

# 1.8.0 (2022-06-21)

### Native SDKs

- Giphy Android SDK [v2.1.18](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.18)
- Giphy iOS SDK [v2.1.22](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.22)

### Features

- [GPHMediaView] Add the resizeMode property. This property determines how to resize the image when the frame doesn't match the raw image dimensions. ([6ff254a](https://github.com/Giphy/giphy-react-native-sdk/commit/6ff254aa680837dd52d66535d6b5a813930a7235))

# 1.8.0-rc.1 (2022-06-20)

### Native SDKs

- Giphy Android SDK [v2.1.18](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.18)
- Giphy iOS SDK [v2.1.22](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.22)

### Features

- [GPHMediaView] Add the resizeMode property ([6ff254a](https://github.com/Giphy/giphy-react-native-sdk/commit/6ff254aa680837dd52d66535d6b5a813930a7235))

# 1.8.0-rc.0 (2022-06-17)

### Native SDKs

- Giphy Android SDK [v2.1.18](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.18)
- Giphy iOS SDK [v2.1.22](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.22)

### Features

- [iOS:GPHMediaView] Scale the content to fill the view bounds and maintain the aspect ratio ([8cf112c](https://github.com/Giphy/giphy-react-native-sdk/commit/8cf112c7efe142c76682ff461110272dcc7d00b9))

# 1.7.2 (2022-06-15)

### Native SDKs

- Giphy Android SDK [v2.1.18](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.18)
- Giphy iOS SDK [v2.1.22](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.22)

### Build System

- [deps] Bump @giphy/js-types to 4.2.1 and type-fest to 2.13.1 ([db8d8a8](https://github.com/Giphy/giphy-react-native-sdk/commit/db8d8a8548b8db914ab277cdace8836bd455c203))
- [deps] Bump Android SDK version from 2.1.17 to 2.1.18 ([d538105](https://github.com/Giphy/giphy-react-native-sdk/commit/d53810566e928e26a548e01f493159f393b3b968))
- [deps] Bump iOS SDK version from 2.1.21 to 2.1.22 ([63fed92](https://github.com/Giphy/giphy-react-native-sdk/commit/63fed9250156070bdcdb2ccb75c4388b5519bd5a))

# 1.7.1 (2022-04-26)

### Native SDKs

- Giphy Android SDK [v2.1.17](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.17)
- Giphy iOS SDK [v2.1.21](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.21)

### Documentation

- Update the requirements section ([b615d31](https://github.com/Giphy/giphy-react-native-sdk/commit/b615d31483eae8d363dd79311863385ba99772a7))

### Build System

- [android] Update gradle and target SDK ([17dc5b6](https://github.com/Giphy/giphy-react-native-sdk/commit/17dc5b6bf29406136841ea7d1180608e959945d1))
- [deps] Bump Android SDK version from 2.1.16 to 2.1.17 ([efe7d11](https://github.com/Giphy/giphy-react-native-sdk/commit/efe7d112827887d3bc31097d3266fd50dee5b745))
- [deps] Bump iOS SDK version from 2.1.20 to 2.1.21 ([e362e28](https://github.com/Giphy/giphy-react-native-sdk/commit/e362e2805b738861d07aaae07d5f54345a582d5a))

### Continuous Integration

- Update jdk version ([175f95f](https://github.com/Giphy/giphy-react-native-sdk/commit/175f95f0cddcb58605c4de26e4047a413e50246b))

# 1.7.0 (2022-03-09)

### Native SDKs

- Giphy Android SDK [v2.1.16](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.16)
- Giphy iOS SDK [v2.1.20](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.20)

### Performance Improvements

- [ios:giphy-video-view] Reuse a single video player across multiple clips ([8c4ea74](https://github.com/Giphy/giphy-react-native-sdk/commit/8c4ea747156e52e70347586c7068e1fb6791c1aa))

### Build System

- [deps] Bump iOS SDK version from 2.1.17 to 2.1.20 ([73807b0](https://github.com/Giphy/giphy-react-native-sdk/commit/73807b0e425c7f10fb2c22be9989dd4ad1396e82))

# 1.6.0 (2022-02-15)

### Native SDKs

- Giphy Android SDK [v2.1.16](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.16)
- Giphy iOS SDK [v2.1.17](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.17)

### Features

- [GiphyContent] Add the prop to specify content rating for the search results ([#58](https://github.com/Giphy/giphy-react-native-sdk/issues/58)) ([fe22af7](https://github.com/Giphy/giphy-react-native-sdk/commit/fe22af73b67a3b61ce9eeb9d2cd3b3aa58d5e174))

# 1.5.0 (2022-02-01)

### Native SDKs

- Giphy Android SDK [v2.1.16](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.16)
- Giphy iOS SDK [v2.1.17](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.17)

### Features

- **Deep Press Previews**. This new feature enables users to "deep press" on a piece of content in the grid and view a context menu, including various options such as select, more by `@user-name`, and remove from recents, which is only shown in the case the grid is populated with previously selected content. <br/><br/> While this feature applies to all content types in the GIPHY SDK, we were motivated to develop it specifically to enhance the experience for Clips (GIFs With Sound!), so that users may much more seamlessly experience video content without having to leave the context of the grid. <br/><br/> Whereas previously the only method of hearing a Clip was to tap on its silent preview in the grid, taking the user to the detail screen, users may now "deep press" on the preview to see and hear it in inline.

### Build System

- [deps] Bump Android SDK version from 2.1.14 to 2.1.16 ([2549c6f](https://github.com/Giphy/giphy-react-native-sdk/commit/2549c6f4e70adacc9f180e83064189d11f780d35))
- [deps] Bump iOS sdk version from 2.1.16 to 2.1.17 ([5335063](https://github.com/Giphy/giphy-react-native-sdk/commit/5335063ced08c4342abc5ca116c5f7835f110191))

# 1.4.1 (2022-01-18)

### Native SDKs

- Giphy Android SDK [v2.1.14](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.14)
- Giphy iOS SDK [v2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

### Bug Fixes

- [Android:GiphyDialog] Fix an issue where calling GiphyDialog.show() on an Android device could cause an error ([#52](https://github.com/Giphy/giphy-react-native-sdk/issues/52)) ([860387a](https://github.com/Giphy/giphy-react-native-sdk/commit/860387a90a5cfdfba28be535ca6e7d6dc546a2ac))

# 1.4.0 (2022-01-12)

### Native SDKs

- Giphy Android SDK [v2.1.14](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.14)
- Giphy iOS SDK [v2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

### Features

- [Android:GiphyMediaView] Add the showCheckeredBackground property ([#50](https://github.com/Giphy/giphy-react-native-sdk/issues/50)) ([e50103f](https://github.com/Giphy/giphy-react-native-sdk/commit/e50103fb97a9074419d6224215440aeca5143462))
- [Android:GiphySDK] Add the videoCacheMaxBytes property ([#49](https://github.com/Giphy/giphy-react-native-sdk/issues/49)) ([8406613](https://github.com/Giphy/giphy-react-native-sdk/commit/8406613d8e4f8332ad055a00daa137a66f2bcd79))

### Build System

- [core] Bumps Giphy Android SDK from [v2.1.12](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.12) to [v2.1.14](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.14)

# 1.3.0 (2021-12-08)

### Native SDKs

- Giphy Android SDK [v2.1.12](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.12)
- Giphy iOS SDK [v2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

### Bug Fixes

- [ios] Fix the issue with reference to self in async blocks ([ca9d444](https://github.com/Giphy/giphy-react-native-sdk/commit/ca9d4448b25c24ed7ffc644b1941fd62318fa8a9))

### Features

- [GiphyMediaView] Add an API to control play/pause states ([c3ec0e2](https://github.com/Giphy/giphy-react-native-sdk/commit/c3ec0e2d329eb36c2f223dea72b6ee5f9d0d0ecd))

# 1.2.0 (2021-12-01)

### Native SDKs

- Giphy Android SDK [v2.1.12](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.12)
- Giphy iOS SDK [v2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

### Bug Fixes

- [Android] Fix NativeEventEmitter warnings in RN 0.65 ([#43](https://github.com/Giphy/giphy-react-native-sdk/issues/43)) ([1a65090](https://github.com/Giphy/giphy-react-native-sdk/commit/1a65090))
- [Android:GiphyGridView] Fix issue with rendering the recent GIFs (#41) ([11fa2ce](https://github.com/Giphy/giphy-react-native-sdk/commit/11fa2ce))

### Features

- **Captions**! A Closed Captions control is now provided for the `.Clips` content type on both the detail "confirmation" screen as well as the `GiphyVideoView`

### Build System

- [core] Bumps Giphy Android SDK from [v2.1.7](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.7) to [v2.1.12](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.12)
- [core] Bumps Giphy iOS SDK from [v2.1.12](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.12) to [v.2.1.16](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.16)

# 1.1.1 (2021-10-06)

### Native SDKs

- Giphy Android SDK [v2.1.7](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.7)
- Giphy iOS SDK [v2.1.12](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.12)

### Bug Fixes

- [Android:GiphyGridView] Fix crash on `didLongPressCell` ([#33](https://github.com/Giphy/giphy-react-native-sdk/issues/33)) @M1ST4KE

# 1.1.0 (2021-09-09)

### Native SDKs

- Giphy Android SDK [v2.1.7](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.7)
- Giphy iOS SDK [v2.1.12](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.12)

### Bug Fixes

- Bumps scripts don't update lockfile ([bd4cc43](https://github.com/Giphy/giphy-react-native-sdk/commit/bd4cc4360fdd2183e23b74ddadb01cdf89112a8c))
- Issues where state saves references only to the props for the last component ([14b9236](https://github.com/Giphy/giphy-react-native-sdk/commit/14b9236535ad9f366be36744b06a7c74a54c8ca4))
- [GiphyVideoView] Typo ([edc62ae](https://github.com/Giphy/giphy-react-native-sdk/commit/edc62ae3f80f38fac1ec17e6d9d87f979370b35d))

### Features

- [GiphyVideoManager] This is a new module that allows to mute or pause all clips. For example, you can pause all clips when a user opens a modal.
- [GiphyGridView] Add `showCheckeredBackground` prop
- [GiphyVideoView] Add callback support for `onPlaybackStateChanged`, `onMute`, `onUnmute`, and `onError` events.
- [GiphyVideoView] Add `autoPlay` prop as a replacement for `playing` prop to avoid misuse of the component.
- [GiphyVideoView] Mark `playing` prop as deprecated.

### Build System

- [core] Bumps Giphy Android SDK from [v2.1.6](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.6) to [v2.1.7](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.7)
- [core] Bumps Giphy iOS SDK from [v2.1.11](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.11) to [v2.1.12](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.12)

# 1.0.3 (2021-08-26)

### Native SDKs

- Giphy Android SDK [v2.1.6](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.6)
- Giphy iOS SDK [v2.1.11](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.11)

### Bug Fixes

- [Android:GiphyVideoViewManager] Fix the issue with viewing multiple clips
- [Android:Utils] Fix app crashes due to absent rendition in media

### Build System

- [core] Bumps `Giphy Android SDK` from [v2.1.4](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.4) to [v2.1.6](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.6)
- [core] Bumps `Giphy iOS SDK` from [v2.1.10](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.10) to [v2.1.11](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.11)

# 1.0.2 (2021-08-19)

### Native SDKs

- Giphy Android SDK [v2.1.4](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.4)
- Giphy iOS SDK [v2.1.10](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.10)

### Bug Fixes

- [GiphyDialog] Fix launch error when `rootViewController` is `nil` ([#19](https://github.com/Giphy/giphy-react-native-sdk/issues/19)) ([81ff417](https://github.com/Giphy/giphy-react-native-sdk/commit/81ff417de548d775210fd2544ebb234cebeb80ec))

# 1.0.1 (2021-08-09)

### Native SDKs

- Giphy Android SDK [v2.1.4](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.4)
- Giphy iOS SDK [v2.1.10](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.10)

### Features

- [GiphySDK] Add metadata to the configuration method
- [LICENSE] Update to Apache-2.0 license

# 1.0.0 (2021-07-21)

### Native SDKs

- Giphy Android SDK [v2.1.3](https://github.com/Giphy/giphy-android-sdk/releases/tag/v2.1.3)
- Giphy iOS SDK [v2.1.9](https://github.com/Giphy/giphy-ios-sdk/releases/tag/v2.1.9)

### Features

- **Clips (GIFs with Sound!) is a brand new content type available in the SDK**
- [GiphyDialog] Add `clipsPreviewRenditionType` prop
- [GiphyGridView] Add `clipsPreviewRenditionType` and `renditionType` props

### Documentation

- [Docs] Add section for `GiphyVideoView`

### BREAKING CHANGES

- [GiphyDialog] Remove `useBlurredBackground` prop
