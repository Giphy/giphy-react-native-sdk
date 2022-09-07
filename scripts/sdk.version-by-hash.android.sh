#!/bin/bash
set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" &>/dev/null && pwd)"

. "$SCRIPT_DIR/sdk.conf.android.sh"

while read -r line; do
  if [[ "$line" =~ $GRADLE_FILE_SDK_VERSION_REGEX ]]; then
    echo "${BASH_REMATCH[2]}"
    break
  fi
done <<<"$(git show "$1":"$GRADLE_FILE")"
