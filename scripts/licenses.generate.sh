#!/bin/bash
set -e

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )"

cd "$SCRIPT_DIR/.."
yarn bootstrap

cd "$SCRIPT_DIR/../example/android"
./gradlew generateLicenseReport
