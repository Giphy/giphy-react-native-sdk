## Migrating to GIPHY React Native SDK 2

If you are not using GIPHY Clips in your application, no changes are required, and the SDK can be smoothly migrated to
v2.x.x.

### Breaking Changes

- The `playing` property has been removed from the `GiphyVideoView` component. Please replace it with [the autoPlay
  property](api.md#giphyvideoview) if you use it.
- In v2, GIPHY Clips are disabled by default on the Android platform. If you use clips on Android,
  follow [this guide](clips.md#giphy-clips-setup-android-only) to
  set them up.
