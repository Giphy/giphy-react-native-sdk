## Getting Started

### Requirements

- Android:
  - Giphy SDK only supports projects that have been upgraded
    to [androidx](https://developer.android.com/jetpack/androidx/)
  - Requires minSdkVersion 19
  - A Giphy Android SDK key from the [Giphy Developer Portal](https://developers.giphy.com/dashboard/?create=true)
- iOS:
  - iOS 10.2 or later
  - Xcode 12 and later
  - A Giphy iOS SDK key from the [Giphy Developer Portal](https://developers.giphy.com/dashboard/?create=true)

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

### Troubleshooting

If you have issues linking your iOS project check out
this [StackOverflow thread](https://stackoverflow.com/questions/52536380/why-linker-link-static-libraries-with-errors-ios)
on how to fix it.

### Basic Usage

You have two common ways to integrate GIPHY into your project:

- use [Giphy Dialog](api.md#giphydialog), which handles the entire GIPHY experience, [example](api.md#example-2).
- use [Giphy Grid View](api.md#giphygridview) to create your own solution, [example](api.md#example-3).

You can also find more complex examples in
the [demo app](https://github.com/Giphy/giphy-react-native-sdk/tree/main/example).
