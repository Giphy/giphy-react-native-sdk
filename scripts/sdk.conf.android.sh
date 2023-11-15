#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

export PROJECT_ROOT="$SCRIPT_DIR/.."
export GITHUB_REPO='Giphy/giphy-android-sdk'
export GRADLE_FILE='android/build.gradle'
export GRADLE_FILE_SDK_VERSION_REGEX="(implementation[[:space:]]+'com.giphy.sdk:ui:)([[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+.*)(')"
