#!/bin/bash

mlkdcknoderun \
  -u 1000:1000 \
  -i node_utils_dev \
  -w $(pwd)/../node \
  -v $(pwd)/..:$(pwd)/.. \
  -v $(pwd)/../node/test/assets/:/assets/ \
  16.13.2
