#!/bin/bash
set -e

react-native start &
RN_SERVER_PID=$!

export ENTRY_FILE='index.tsx'
xcodebuild \
  -workspace 'ios/GiphyReactNativeSdkExample.xcworkspace' \
  -configuration 'Release' \
  -scheme 'GiphyReactNativeSdkExample' \
  -sdk 'iphonesimulator15.5' \
  -derivedDataPath 'ios/build'

if ps -p $RN_SERVER_PID >/dev/null; then
  kill $RN_SERVER_PID
fi
