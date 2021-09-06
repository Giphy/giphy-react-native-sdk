#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"
SDK_VERSION="$(${SCRIPT_DIR}/latest-ios-sdk-version.sh)"

sed \
  -i '' \
  -E "s/(dependency[[:space:]]+\"Giphy\"[[:space:]]*,[[:space:]]*\"~>[[:space:]]*)([[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+)(\")/\1$SDK_VERSION\3/" \
  ${SCRIPT_DIR}/../giphy-react-native-sdk.podspec

yarn --cwd "$SCRIPT_DIR"/.. bootstrap
