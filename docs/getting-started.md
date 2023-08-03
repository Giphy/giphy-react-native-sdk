## Getting Started

### Requirements

- Android:
  - Giphy SDK only supports projects that have been upgraded
    to [androidx](https://developer.android.com/jetpack/androidx/)
  - Requires minSdkVersion 21
  - A Giphy Android SDK key from the [Giphy Developer Portal](https://developers.giphy.com/dashboard/?create=true).
    Please remember, you should use a separate key for every platform (Android, iOS, Web) you add our SDKs to.
- iOS:
  - iOS 13.0 or later
  - Xcode 12 and later
  - A Giphy iOS SDK key from the [Giphy Developer Portal](https://developers.giphy.com/dashboard/?create=true).
    Please remember, you should use a separate key for every platform (Android, iOS, Web) you add our SDKs to.

### Installation

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

This [StackOverflow thread](https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios)
may be helpful if you experience issues linking your iOS project.

Feel free to open an [issue](https://github.com/Giphy/giphy-react-native-sdk/issues) here in this repo if you run into
any problems.

### Basic Usage

We offer two solutions for the SDK user interface - pre-built templates which handle the entirety of the GIPHY
experience, and a [Grid-Only implementation](https://developers.giphy.com/docs/sdk#grid) which allows for endless
customization.

See [customization](https://developers.giphy.com/docs/sdk#grid) to determine what's best for you.

- use [Giphy Dialog](api.md#giphydialog) for the plug and play GIPHY experience ([example](api.md#example-2)).
- use [Giphy Grid View](api.md#giphygridview) for a more customizable solution ([example](api.md#example-3)).
