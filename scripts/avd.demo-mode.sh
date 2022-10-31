#!/bin/bash
set -e

ANDROID_PLATFORM_TOOLS="${ANDROID_SDK_ROOT}/platform-tools"

# enter demo mode
"$ANDROID_PLATFORM_TOOLS"/adb shell settings put global sysui_demo_allowed 1
# display time 12:00
"$ANDROID_PLATFORM_TOOLS"/adb shell am broadcast -a com.android.systemui.demo -e command clock -e hhmm 1200
# Display full mobile data with 4g type and no wifi
"$ANDROID_PLATFORM_TOOLS"/adb shell am broadcast -a com.android.systemui.demo -e command network -e mobile show -e level 4 -e datatype 4g -e wifi false
# Hide notifications
"$ANDROID_PLATFORM_TOOLS"/adb shell am broadcast -a com.android.systemui.demo -e command notifications -e visible false
# Show full battery but not in charging state
"$ANDROID_PLATFORM_TOOLS"/adb shell am broadcast -a com.android.systemui.demo -e command battery -e plugged false -e level 100
