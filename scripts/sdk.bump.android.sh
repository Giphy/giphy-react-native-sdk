#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"
SDK_CURRENT_VERSION="$("${SCRIPT_DIR}"/android-sdk-version-by-hash.sh HEAD)"
SDK_LATEST_VERSION="$("${SCRIPT_DIR}"/android-sdk-latest-version.sh)"

. "$SCRIPT_DIR/android-sdk-conf.sh"

sed \
  -i '' \
  -E "s/$GRADLE_FILE_SDK_VERSION_REGEX/\1$SDK_LATEST_VERSION\3/" \
  "$PROJECT_ROOT/$GRADLE_FILE"

yarn --cwd "$PROJECT_ROOT". bootstrap

COMMIT_MSG="build(deps): bump Android SDK version from $SDK_CURRENT_VERSION to $SDK_LATEST_VERSION"

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
