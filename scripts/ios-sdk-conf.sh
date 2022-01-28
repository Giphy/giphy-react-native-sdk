#!/bin/bash

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

export PROJECT_ROOT="$SCRIPT_DIR/.."
export GITHUB_REPO='Giphy/giphy-ios-sdk'
export PODSPEC='giphy-react-native-sdk.podspec'
export PODSPEC_SDK_VERSION_REGEX="(dependency[[:space:]]+\"Giphy\"[[:space:]]*,[[:space:]]*\"[[:space:]]*(~>)?[[:space:]]*)([[:digit:]]+\.[[:digit:]]+\.[[:digit:]]+)(\")"
