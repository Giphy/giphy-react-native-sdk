#!/bin/bash

export ANDROID_API='31'
# shellcheck disable=SC2155
export ANDROID_ABI=$([ "$(uname -p)" == "i386" ] && echo 'x86_64' || echo 'arm64-v8a')
export ANDROID_BUILT_TOOLS='30.0.2'
export AVD_NAME="GiphyRNSDK_Pixel_4_API_${ANDROID_API}"
export NODE_OPTIONS=--openssl-legacy-provider
