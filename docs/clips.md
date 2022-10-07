## GIPHY Clips: GIFs with Sound

Introducing GIPHY Clips, aka GIFs with Sound.

Millions of people use GIPHY to communicate and express themselves every day. GIPHY Clips is our newest content format
at the intersection of GIFs and Video.

The Clips Library is built with all of the unforgettable quotes, cultural moments, reactions and characters that we need
to express how we are feeling, what we think and who we are. Everyday you’ll find new Clips from the biggest names in
Entertainment, Sports, News, Pop Culture and viral moments. If your favorite quote isn’t a Clip yet, it will be soon...

Integrating the GIPHY Clips SDK will allow your users to seamlessly express themselves with this new format, all while
staying in the experience in your app.

### Requirements

- GIPHY Clips is available for integration into our community of messaging and social apps for users to search and
  share. Clips is not approved to be integrated into creation experience where derivative works can be created.

### GIPHY Clips setup (Android only)

The GIPHY React Native SDK under the hood uses ExoPlayer for clips on the Android platform. But we don't enable clips
functionality by default to optimize bundle size and avoid dependency resolution issues. If you use clips on Android,
you need to tell the GIPHY SDK to use a special adapter that will add ExoPlayer to dependencies and make the clips
available. To do this, add the following line to the `gradle.properties` file in the android folder of your project and
replace `VIDEO_PLAYER_ADAPTER` with the name of the selected adapter:

```groovy
GiphyReactNativeSDK.videoPlayerAdapter=<VIDEO_PLAYER_ADAPTER>
```

You can browse the available adapters at [this link](../android/resources) or select one from the following list:

- `exoplayeradapter@2.18.1` - provides integration with ExoPlayer@2.18.1.
- `videoplayeradapter` - this adapter is used by default, is just a stub, and does not make clips available in the SDK.

We recommend choosing the latest version of the adapter. Thus, your configuration might look as follows:

```groovy
GiphyReactNativeSDK.videoPlayerAdapter=exoplayeradapter@2.18.1
```

Other adapters may be helpful when using another library that also uses ExoPlayer under the hood, such as [React Native
Video](https://github.com/react-native-video/react-native-video). In this case, to avoid problems with different
versions of ExoPlayer, you can choose an adapter that satisfies
the version of ExoPlayer in the other library.

In case you have not found an adapter that meets your requirements, you can create your own or, even better, send a PR
with an implementation. This will require more work but will allow you to control the video player at a low level. You
can copy [any existing adapter](../android/resources) and then modify it. Then in the `gradle.properties` file, in addition to the name of the
adapter, you need to specify the path to the folder where the adapter is located, for example:
```groovy
GiphyReactNativeSDK.videoPlayerAdaptersPath=/root/custom-video-player-adapters/
```
