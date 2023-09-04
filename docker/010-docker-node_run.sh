#!/bin/bash

docker run -ti --rm \
    --name node_utils_dev \
    --hostname node_utils_dev \
    --user 1000:1000 \
    --workdir $(pwd)/../node \
    -v $(pwd)/..:$(pwd)/.. \
    -v ~/.npmrc:/root/.npmrc \
    -v ~/.npmrc:/home/node/.npmrc \
    malkab/nodejs-dev:16.13.2
