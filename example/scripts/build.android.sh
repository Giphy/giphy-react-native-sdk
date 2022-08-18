#!/bin/bash
set -e

./android/gradlew assembleRelease assembleAndroidTest \
  -p='./android' \
  -DtestBuildType='release'
