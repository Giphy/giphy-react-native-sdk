#!/usr/bin/env bash

set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

dry_run=0
include_lockfiles=0

usage() {
  cat <<'EOF'
Usage: scripts/clean-caches.sh [options]

Removes project-local dependency, native build, and generated output caches.

Options:
  -n, --dry-run      Print what would be removed without deleting anything.
      --lockfiles    Also remove dependency lockfiles.
  -h, --help         Show this help.

Lockfiles are intentionally opt-in because they pin dependency resolution and
are usually committed project state, not caches.
EOF
}

while (($#)); do
  case "$1" in
    -n | --dry-run)
      dry_run=1
      ;;
    --lockfiles)
      include_lockfiles=1
      ;;
    -h | --help)
      usage
      exit 0
      ;;
    *)
      echo "Unknown option: $1" >&2
      usage >&2
      exit 1
      ;;
  esac
  shift
done

cache_paths=(
  ".expo"
  ".parcel-cache"
  ".temp"
  ".turbo"
  ".yarn/cache"
  ".yarn/install-state.gz"
  ".yarn/unplugged"
  "artifacts"
  "buck-out"
  "lib"
  "node_modules"
  "android/.cxx"
  "android/.gradle"
  "android/build"
  "ios/DerivedData"
  "ios/build"
  "example/.expo"
  "example/.parcel-cache"
  "example/.turbo"
  "example/node_modules"
  "example/vendor"
  "example/android/.cxx"
  "example/android/.gradle"
  "example/android/build"
  "example/android/app/.cxx"
  "example/android/app/build"
  "example/ios/DerivedData"
  "example/ios/Pods"
  "example/ios/build"
  "example/ios/GiphyReactNativeSdkExample.xcodeproj/xcuserdata"
  "example/ios/GiphyReactNativeSdkExample.xcworkspace/xcuserdata"
)

lockfile_paths=(
  "Gemfile.lock"
  "package-lock.json"
  "pnpm-lock.yaml"
  "yarn.lock"
  "android/gradle.lockfile"
  "example/Gemfile.lock"
  "example/package-lock.json"
  "example/pnpm-lock.yaml"
  "example/yarn.lock"
  "example/android/gradle.lockfile"
  "example/ios/Podfile.lock"
)

remove_path() {
  local rel_path="$1"
  local allow_tracked="${2:-0}"
  local target="$ROOT_DIR/$rel_path"

  if [[ ! -e "$target" && ! -L "$target" ]]; then
    return
  fi

  if [[ "$allow_tracked" != "1" ]] && git -C "$ROOT_DIR" ls-files --error-unmatch -- "$rel_path" >/dev/null 2>&1; then
    echo "skip tracked: $rel_path"
    return
  fi

  if ((dry_run)); then
    echo "would remove: $rel_path"
  else
    echo "remove: $rel_path"
    rm -rf -- "$target"
  fi
}

cd "$ROOT_DIR"

for path in "${cache_paths[@]}"; do
  remove_path "$path"
done

if ((include_lockfiles)); then
  for path in "${lockfile_paths[@]}"; do
    remove_path "$path" 1
  done
else
  echo "lockfiles kept; pass --lockfiles to remove them too"
fi
