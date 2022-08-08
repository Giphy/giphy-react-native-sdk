#!/bin/bash
set -e

ROOT_DIR="$(pwd)"

react-native start &
RN_SERVER_PID=$!

export ENTRY_FILE="${ROOT_DIR}/index.tsx"
xcodebuild \
  -workspace "${ROOT_DIR}/ios/GiphyReactNativeSdkExample.xcworkspace" \
  -configuration Release \
  -scheme GiphyReactNativeSdkExample \
  -sdk iphonesimulator15.5 \
  -derivedDataPath "${ROOT_DIR}/ios/build"

if ps -p $RN_SERVER_PID >/dev/null; then
  kill $RN_SERVER_PID
fi
