#!/bin/bash
set -e

IOS_SDK_VERSION_REGEX="iphonesimulator([[:digit:]]+\.[[:digit:]]+)"
while read -r line; do
  if [[ "$line" =~ $IOS_SDK_VERSION_REGEX ]]; then
    IOS_SDK_VERSION="${BASH_REMATCH[1]}"
    break
  fi
done <<<"$(xcodebuild -showsdks)"

if [ -z ${IOS_SDK_VERSION+x} ]; then
  echo 'iOS SDK version could not be determined'
  exit 1
fi

export SIM_RUNTIME="iOS${IOS_SDK_VERSION}"
export SIM_SDK="iphonesimulator${IOS_SDK_VERSION}"
export SIM_DEVICE_NAME='GiphyRNSDK iPhone 12 Pro'
export SIM_DEVICE_ID='iPhone 12 Pro'
export NODE_OPTIONS=--openssl-legacy-provider
