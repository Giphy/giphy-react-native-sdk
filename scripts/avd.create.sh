#!/bin/bash
set -e

AVD_CONFIG="${HOME}/.android/avd/${AVD_NAME}.avd/config.ini"
ANDROID_CMD_TOOLS="${ANDROID_HOME}/cmdline-tools/latest/bin"
ANDROID_SYSTEM_IMAGE="system-images;android-${ANDROID_API};default;${ANDROID_ABI}"

# Install the emulator tool
yes Y | "$ANDROID_CMD_TOOLS"/sdkmanager --install \
  "platform-tools" \
  "${ANDROID_SYSTEM_IMAGE}" \
  "platforms;android-${ANDROID_API}" \
  "build-tools;${ANDROID_BUILT_TOOLS}" \
  "emulator"

# Accept all licenses...
"$ANDROID_CMD_TOOLS"/sdkmanager --licenses
yes | "$ANDROID_CMD_TOOLS"/sdkmanager --licenses

# Create an AVD with the image we've previously installed
echo "no" | "$ANDROID_CMD_TOOLS"/avdmanager --verbose create avd \
  --force \
  --name "${AVD_NAME}" \
  --abi "${ANDROID_ABI}" \
  --device 'pixel' \
  --package "${ANDROID_SYSTEM_IMAGE}" \

# Update AVD’s config
cat >>"${AVD_CONFIG}" <<-EOM
hw.lcd.density=440
hw.lcd.height=2280
hw.lcd.width=1080
vm.heapSize=576
hw.ramSize=2048
disk.dataPartition.size=4G
EOM

# Verify installation
"$ANDROID_CMD_TOOLS"/avdmanager list avd
