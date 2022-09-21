## Dealing with ExoPlayer issues

Under the hood in the [GIPHY Android SDK](https://github.com/Giphy/giphy-android-sdk), we
use [ExoPlayer](https://github.com/google/ExoPlayer) to create components
for [GIPHY Clips content](https://developers.giphy.com/docs/clips). This works well
until you add another package to your project using ExoPlayer. If the GIPHY SDK and the new package use different
versions of ExoPlayer, you may encounter dependency resolution issues and crashes on one of the packages using
ExoPlayer.

Unfortunately, solving problems with ExoPlayer may not be that trivial. To help you solve the most common issues, we
prepared some scenarios with possible solutions. Before going to them, we recommend that you run the following command
from the `android` folder to see which version of ExoPlayer is resolved in your dependencies graph:

```shell
./gradlew app:androidDependencies | egrep -i 'exoplayer-(ui|core)'
```

#### Forcing the ExoPlayer version

ExoPlayer changes its API quite often. But sometimes packages can work with previews or new versions without problems.
To try this method, you can force a downgrade or upgrade ExoPlayer. To do that, you can add the following lines above
the `dependencies` block in the app `build.gradle` file, which is usually placed in the `android/app` folder:

```groovy
configurations.all {
  resolutionStrategy {
    force 'com.google.android.exoplayer:exoplayer-core:YOUR_VERSION'
    force 'com.google.android.exoplayer:exoplayer-ui:YOUR_VERSION'
  }
}
```

#### Disabling the GIPHY Clips components

If you do not use [GIPHY Clips](https://developers.giphy.com/docs/clips) in your application, you can disable
the [GIPHY Clips](https://developers.giphy.com/docs/clips) components. To do this, you can add
the following task to the app `build.gradle` file, which is usually located in the `android/app` folder:

```groovy
task replaceGiphyExoPlayerAdapter {
  String gphExoPlayerAdapter = "exoplayeradapter@stub"
  // Your path may be different. If so, replace it with the relative path to the GIPHY SDK folder.
  String gphSDKLoc = new File(project.rootDir, "../node_modules/@giphy/react-native-sdk")
  String gphExoPlayerAdapterLoc = new File(gphSDKLoc, "android/src/main/java/com/giphyreactnativesdk/exoplayeradapter")
  String gphSDKResourcesLoc = new File(gphSDKLoc, "android/resources")

  project.delete(gphExoPlayerAdapterLoc)
  project.copy {
    from new File(gphSDKResourcesLoc, gphExoPlayerAdapter)
    include "**/*.*"
    into gphExoPlayerAdapterLoc
  }
}

preBuild.dependsOn replaceGiphyExoPlayerAdapter
```

And then you need to force the ExoPlayer version to the version used in another package. To do that, you can add the
following lines above the `dependencies` block in the same `build.gradle` file:

```groovy
configurations.all {
  resolutionStrategy {
    force 'com.google.android.exoplayer:exoplayer-core:YOUR_VERSION'
    force 'com.google.android.exoplayer:exoplayer-ui:YOUR_VERSION'
  }
}
```

#### Changing the GIPHY ExoPlayer adapter

The GIPHY SDK contains adapters for some versions of ExoPlayer, which means that the GIPHY SDK can work with different
versions of ExoPlayer by changing the ExoPlayer adapter. You can view existing adapters
at [this link](../android/resources). If you find an
adapter with the desired version, you can update the Gradle configuration to use it. To do this, you can add the
following task to the app `build.gradle` file, which is usually located in the `android/app` folder:

```groovy
task replaceGiphyExoPlayerAdapter {
  // ex: String gphExoPlayerAdapter = "exoplayeradapter@2.18.1"
  String gphExoPlayerAdapter = "YOUR_EXO_PLAYER_ADAPTER_VERSION"
  // Your path may be different. If so, replace it with the relative path to the GIPHY SDK folder.
  String gphSDKLoc = new File(project.rootDir, "../node_modules/@giphy/react-native-sdk")
  String gphExoPlayerAdapterLoc = new File(gphSDKLoc, "android/src/main/java/com/giphyreactnativesdk/exoplayeradapter")
  String gphSDKResourcesLoc = new File(gphSDKLoc, "android/resources")

  project.delete(gphExoPlayerAdapterLoc)
  project.copy {
    from new File(gphSDKResourcesLoc, gphExoPlayerAdapter)
    include "**/*.*"
    into gphExoPlayerAdapterLoc
  }
}

preBuild.dependsOn replaceGiphyExoPlayerAdapter
```

And then you need to force the ExoPlayer version to the version used in adapter. To do that, you can add the
following lines above the `dependencies` block in the same `build.gradle` file:

```groovy
configurations.all {
  resolutionStrategy {
    force 'com.google.android.exoplayer:exoplayer-core:YOUR_VERSION'
    force 'com.google.android.exoplayer:exoplayer-ui:YOUR_VERSION'
  }
}
```

If you don't find the adapter version you want, you can implement your own or even create a PR with a new
implementation. This requires more work, but allows you to control all aspects of ExoPlayer.
