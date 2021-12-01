#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SDK_VERSION="$("${SCRIPT_DIR}"/latest-android-sdk-version.sh)"

sed \
  -i '' \
  -E "s/(implementation[[:space:]]+'com.giphy.sdk:ui:)([[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+)(')/\1$SDK_VERSION\3/" \
  "${SCRIPT_DIR}"/../android/build.gradle

yarn --cwd "$SCRIPT_DIR"/.. bootstrap
