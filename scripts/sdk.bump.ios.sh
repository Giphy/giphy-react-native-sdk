#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
SDK_CURRENT_VERSION="$("${SCRIPT_DIR}"/sdk.version-by-hash.ios.sh HEAD)"
SDK_LATEST_VERSION="$("${SCRIPT_DIR}"/sdk.latest-version.ios.sh)"

. "$SCRIPT_DIR/sdk.conf.ios.sh"

sed \
  -i '' \
  -E "s/$PODSPEC_SDK_VERSION_REGEX/\1\2$SDK_LATEST_VERSION\4/" \
  "$PROJECT_ROOT/$PODSPEC"

cd "$PROJECT_ROOT"/example/ios && pod update
yarn --cwd "$PROJECT_ROOT" bootstrap

COMMIT_MSG="build(deps): bump iOS SDK version from $SDK_CURRENT_VERSION to $SDK_LATEST_VERSION"

while true; do
  read -rp "Commit \"$COMMIT_MSG\"? " yn
  case $yn in
  [Yy]*)
    git add -A
    git commit -m "$COMMIT_MSG" 1> /dev/null 2> /dev/null
    break
    ;;
  [Nn]*) exit ;;
  *) echo "Please answer yes or no." ;;
  esac
done
