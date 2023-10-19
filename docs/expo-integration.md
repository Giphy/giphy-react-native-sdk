# Expo Installation

> This package cannot be used in the "Expo Go" app
> because [it requires custom native code](https://docs.expo.dev/workflow/customizing/).

First install the package with yarn, npm, or [`npx expo install`](https://docs.expo.dev/more/expo-cli/#installation).

```sh
expo install @giphy/react-native-sdk
```

After installing this npm package, add the [config plugin](https://docs.expo.io/guides/config-plugins/) to
the [`plugins`](https://docs.expo.io/versions/latest/config/app/#plugins) array of your `app.json` or `app.config.js`:

```json
{
  "expo": {
    "plugins": [
      "@giphy/react-native-sdk"
    ]
  }
}
```

Next, rebuild your app as described in the ["Adding custom native code"](https://docs.expo.dev/workflow/customizing/)
guide.
