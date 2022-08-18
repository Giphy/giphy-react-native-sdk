#!/bin/bash
set -e

# Install collection of utils for Apple simulators,
# Detox uses it to query and communicate with the simulator.
brew tap wix/brew
brew list applesimutils || brew install applesimutils

xcrun simctl create "${SIM_DEVICE_NAME}" "${SIM_DEVICE_ID}" "${SIM_RUNTIME}"
