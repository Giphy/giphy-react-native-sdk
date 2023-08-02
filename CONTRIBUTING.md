# Contributing

We want this community to be friendly and respectful to each other. Please follow it in all your interactions with the
project.

## Development workflow

### Install dependencies

To get started with the project, run `yarn` in the root directory to install the required dependencies for each package:

```sh
yarn
```

> While it's possible to use [`npm`](https://github.com/npm/cli), the tooling is built
> around [`yarn`](https://classic.yarnpkg.com/), so you'll have an easier time if you use `yarn` for development.

To edit the Objective-C files, open `example/ios/GiphyReactNativeSdkExample.xcworkspace` in XCode and find the source
files at `Pods > Development Pods > giphy-react-native-sdk`.

To edit the Kotlin files, open `example/android` in Android studio and find the source files at `giphyreactnativesdk`
under `Android`.

While developing, you can run the [example app](/example/) to test your changes. Any changes you make in your library's
JavaScript code will be reflected in the example app without a rebuild. If you change any native code, then you'll need
to rebuild the example app.

### Run the example app

- To run the example application, you need to configure the API keys. To do this,
  you can copy the `.example.env` file and fill in the necessary variables:
  ```shell
  cp example/.example.env example/.env
  ```

- Start the packager:
  ```sh
  yarn example start
  ```

- Run the example app on Android:
  ```sh
  yarn example android
  ```

- Run the example app on iOS:
  ```sh
  yarn example ios
  ```

By default, the example is configured to build with the old architecture. To run the example with the new architecture,
you can do the following:

1. For Android, run:
   ```sh
   ORG_GRADLE_PROJECT_newArchEnabled=true yarn example android
   ```

   Or if you are using Android Studio, set the `newArchEnabled` property to true in
   the `example/android/gradle.properties` file and run the following command from
   the `example/android` folder:
   ```sh
   ./gradlew generateCodegenArtifactsFromSchema
   ```

2. For iOS, run:
   ```sh
   RCT_NEW_ARCH_ENABLED=1 yarn example pods
   ```

If you are building for a different architecture than your previous build, make sure to remove the build folders first.
You can run the following command to cleanup all build folders:

```sh
yarn clean
```

To confirm that the app is running with the new architecture, you can check the Metro logs for a message like this:

```sh
Running "GiphyReactNativeSdkExample" with {"fabric":true,"initialProps":{"concurrentRoot":true},"rootTag":1}
```

Note the `"fabric":true` and `"concurrentRoot":true` properties.

### Commit message convention

We follow the [conventional commits specification](https://www.conventionalcommits.org/en) for our commit messages:

- `fix`: bug fixes, e.g. fix crash due to deprecated method.
- `feat`: new features, e.g. add new method to the module.
- `refactor`: code refactor, e.g. migrate from class components to hooks.
- `docs`: changes into documentation, e.g. add usage example for the module..
- `test`: adding or updating tests, e.g. add integration tests using detox.
- `chore`: tooling changes, e.g. change CI config.

Our pre-commit hooks verify that your commit message matches this format when committing.

### Linting and tests

[ESLint](https://eslint.org/), [Prettier](https://prettier.io/), [TypeScript](https://www.typescriptlang.org/), [Detox](https://github.com/wix/Detox)

We use [TypeScript](https://www.typescriptlang.org/) for type checking, [ESLint](https://eslint.org/)
with [Prettier](https://prettier.io/) for linting and formatting the code, and [Detox](https://github.com/wix/Detox)
with [Jest](https://jestjs.io/) for e2e testing.

Make sure your code passes TypeScript and ESLint. Run the following to verify:

```sh
yarn typescript
yarn lint
```

To fix formatting errors, run the following:

```sh
yarn lint --fix
```

Also before doing release you should run e2e tests locally by:

```sh
# Android
yarn detox:build:android
yarn detox:test:android
# iOS
yarn detox:build:ios
yarn detox:test:ios
```

Commands listed above expects the test environment to be configured. Here is a quick guide on how this can be done:

#### Android

Prerequisites:

- ✅ Detox Command Line Tools. This can be done by running this command: `npm install -g detox-cli`
- ✅ Java’s runtime
- ✅ The Android SDK

If all of the above are ready, you need to load the necessary packages and configure the AVD device for the e2e test.
Fortunately, you can do this simply by running the following command:

`yarn detox:bootstrap:android`

#### iOS

Prerequisites:

- ✅ Detox Command Line Tools. This can be done by running this command: `npm install -g detox-cli`
- ✅ MacOS Catalina or newer
- ✅ Xcode v12.x or newer (v13 support - see [here](https://github.com/wix/Detox/issues/2895)), with Xcode command-line
  tools installed

If all of the above is ready, you need to configure the iOS Simulator to run the e2e test. This can be done by running
the following command:

`yarn detox:bootstrap:ios`

### Publishing to npm

We use [release-it](https://github.com/release-it/release-it) to make it easier to publish new versions. It handles
common tasks like bumping version based on semver, creating tags and releases etc.

To publish new versions, run the following:

```sh
yarn release
```

### Scripts

The `package.json` file contains various scripts for common tasks:

- `yarn bootstrap`: setup project by installing all dependencies and pods.
- `yarn clean`: cleanup all build folders.
- `yarn detox:bootstrap:android`: prepare the environment for e2e-tests on the Android platform.
- `yarn detox:bootstrap:ios`: prepare the environment for e2e-tests on the iOS platform.
- `yarn detox:build:android`: create a build of the example app ready for e2e-testing on the Android platform.
- `yarn detox:build:ios`: create a build of the example app ready for e2e-testing on the iOS platform.
- `yarn detox:test:android`: run e2e-tests on the Android platform.
- `yarn detox:test:ios`: run e2e-tests on the iOS platform.
- `yarn example android`: run the example app on Android.
- `yarn example ios`: run the example app on iOS.
- `yarn example start`: start the Metro server for the example app.
- `yarn licenses:check`: check that all licenses of all dependencies used in the package are correct.
- `yarn licenses:generate`: generate license lists of all dependencies used in the package.
- `yarn lint`: lint files with ESLint.
- `yarn release`: release the new version of the package in NPM and prepare a release on GitHub.
- `yarn sdk:bump:android`: update the GIPHY Android SDK to the latest version.
- `yarn sdk:bump:ios`: update the GIPHY iOS SDK to the latest version.
- `yarn typescript`: type-check files with TypeScript.

### Sending a pull request

> **Working on your first pull request?** You can learn how from this _free_
>
series: [How to Contribute to an Open Source Project on GitHub](https://egghead.io/series/how-to-contribute-to-an-open-source-project-on-github).

When you're sending a pull request:

- Prefer small pull requests focused on one change.
- Verify that linters and tests are passing.
- Review the documentation to make sure it looks good.
- Follow the pull request template when opening a pull request.
- For pull requests that change the API or implementation, discuss with maintainers first by opening an issue.
