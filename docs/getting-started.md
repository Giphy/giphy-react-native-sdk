## Getting Started

### Requirements

- React Native 0.83.0 or later
- Android:
  - Giphy SDK only supports projects that have been upgraded
    to [androidx](https://developer.android.com/jetpack/androidx/)
  - Requires minSdkVersion 24
  - A Giphy Android SDK key from the [Giphy Developer Portal](https://developers.giphy.com/dashboard/?create=true).
    Please remember, you should use a separate key for every platform (Android, iOS, Web) you add our SDKs to.
- iOS:
  - iOS 15.1 or later
  - Xcode 16 and later
  - A Giphy iOS SDK key from the [Giphy Developer Portal](https://developers.giphy.com/dashboard/?create=true).
    Please remember, you should use a separate key for every platform (Android, iOS, Web) you add our SDKs to.

### Installation

> 🚨 Expo: This package is not available in the [Expo Go](https://expo.io/client) app. Learn how you can use it
> with [custom dev clients](./expo-integration.md).

```bash
yarn add @giphy/react-native-sdk
```

or using npm

```bash
npm install @giphy/react-native-sdk --save
```

Go to your ios folder and run:

```bash
pod install
```

### New architecture setup (Fabric)

This library supports new architecture!
In order to use the new architecture some extra steps are needed.

#### iOS

Install pods with this flag inside `ios` folder:

```sh
RCT_NEW_ARCH_ENABLED=1 bundle exec pod install
```

#### Android

Set `newArchEnabled` to `true` inside `android/gradle.properties` and then run:

```sh
yarn android
```

If you have issues with running android build you can try to generate codegen before the build using this command:

```sh
cd android && ./gradlew generateCodegenArtifactsFromSchema
```

### Troubleshooting

#### Why do I get iOS linker errors
This [StackOverflow thread](https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios)
may be helpful if you experience issues linking your iOS project.

#### GIFs Are Not Playing on Android
If you encounter an issue where GIFs appear as static images instead of animating, this may be due to a dependency conflict between 
React Native and the Fresco library used by our SDK.

The current SDK supports React Native 0.83.0 and later. If you are using an older SDK version, upgrade first.
If you still need to force Fresco versions, use the Fresco version that matches your React Native version.
**Please check the exact version of Fresco used by the specific React Native version you are working with**, as this may vary. 
Add a block like this to `android/build.gradle(:app)` right before `dependencies`:

```gradle
configurations.configureEach {
    resolutionStrategy {
        forcedModules = [
            'com.facebook.fresco:fresco:3.2.0',
            'com.facebook.fresco:animated-gif:3.2.0',
            'com.facebook.fresco:animated-base:3.2.0',
            'com.facebook.fresco:animated-drawable:3.2.0',
            'com.facebook.fresco:animated-webp:3.2.0',
            'com.facebook.fresco:webpsupport:3.2.0',
            'com.facebook.fresco:imagepipeline-okhttp3:3.2.0',
            'com.facebook.fresco:middleware:3.2.0',
            'com.facebook.fresco:nativeimagetranscoder:3.2.0'
        ]
    }
}
```

#### Feel free to open an [issue](https://github.com/Giphy/giphy-react-native-sdk/issues) here in this repo if you run into any problems.

### Basic Usage

We offer two solutions for the SDK user interface - pre-built templates which handle the entirety of the GIPHY
experience, and a [Grid-Only implementation](https://developers.giphy.com/docs/sdk#grid) which allows for endless
customization.

See [customization](https://developers.giphy.com/docs/sdk#grid) to determine what's best for you.

- use [Giphy Dialog](api.md#giphydialog) for the plug and play GIPHY experience ([example](api.md#example-2)).
- use [Giphy Grid View](api.md#giphygridview) for a more customizable solution ([example](api.md#example-3)).
