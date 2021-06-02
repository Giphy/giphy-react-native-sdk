## API Reference

## [GiphySDK](#giphysdk)

## GiphySDK
Contains methods for configuring basic parameters, such as API keys.

### </> configure: ```configure(options: GiphySDKConfig) => void```
Configure the basic settings of Giphy SDK
#### Options
| Option | Description                                                                                                                                | Default  | Android | iOS   |
|-----------------|-----------------------------------------------------------------------------------------------------------------------------------|----------|:--------|:-----:|
|apiKey           |Android or iOS SDK key. Please remember, you should use a separate key for every platform (Android, iOS, Web) you add our SDKs to. |`None`    |&#9989;  |&#9989;|
|verificationMode |When you're ready to get a production key from Giphy, turn on the verification mode by setting this option to `true`               |`false`   |&#9989;  |&#9989;|


