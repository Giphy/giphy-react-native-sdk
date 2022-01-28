#!/bin/bash

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

. "$SCRIPT_DIR/android-sdk-conf.sh"

"${SCRIPT_DIR}"/github-latest-release.sh "$GITHUB_REPO"
