#!/bin/bash

mlkdcknoderun -q \
  -u 1000:1000 \
  -i node_utils_dev \
  -w $(pwd)/../node \
  -v $(pwd)/..:$(pwd)/.. \
  -v $(pwd)/../node/test/assets/:/assets/ \
  14.17.3
