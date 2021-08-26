#!/bin/bash

curl --silent "https://api.github.com/repos/$1/releases/latest" |
    grep '"tag_name":' |
    sed -E 's/.*"[vV]?([^"]+)".*/\1/'
