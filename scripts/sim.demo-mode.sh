#!/bin/bash
set -e

xcrun simctl status_bar booted override \
  --time "12:00" \
  --batteryState charged \
  --batteryLevel 100 \
  --wifiBars 3 \
  --cellularMode active \
  --cellularBars 4
