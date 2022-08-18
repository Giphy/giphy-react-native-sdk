#!/bin/bash
set -e

ANDROID_PLATFORM_TOOLS="${ANDROID_HOME}/platform-tools"

# Launch the emulator
nohup "$ANDROID_HOME"/emulator/emulator -verbose -no-boot-anim -avd "${AVD_NAME}" &

echo "Wait for the emulator to boot up completely..."
# shellcheck disable=SC2016
"$ANDROID_PLATFORM_TOOLS"/adb wait-for-device \
  shell 'while [[ -z $(getprop sys.boot_completed) ]]; do sleep 1; done; input keyevent 82'

# Disable animations
"$ANDROID_PLATFORM_TOOLS"/adb shell "settings put global window_animation_scale 0.0"
"$ANDROID_PLATFORM_TOOLS"/adb shell "settings put global transition_animation_scale 0.0"
"$ANDROID_PLATFORM_TOOLS"/adb shell "settings put global animator_duration_scale 0.0"

# Enable on-screen indicators of taps, swipes and scroll actions.
"$ANDROID_PLATFORM_TOOLS"/adb shell settings put system show_touches 1
"$ANDROID_PLATFORM_TOOLS"/adb shell settings put system pointer_location 1

# Restart adb in root mode (i.e. allow root access to the emulator).
# Detox may need this in order to be able to install apps on the emulator in a way more
"$ANDROID_PLATFORM_TOOLS"/adb root
