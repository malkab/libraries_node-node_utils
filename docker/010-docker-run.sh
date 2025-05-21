#!/bin/bash

docker run -ti --rm \
    -e NODE_ENV=development \
    -e NODE_MEMORY=2GB \
    --name=node_utils_dev \
    --hostname=node_utils_dev \
    --user 1000:1000 \
    -v $(pwd)/../node/:$(pwd)/../node/ \
    -v ~/.npmrc:/root/.npmrc \
    -v ~/.npmrc:/home/node/.npmrc \
    --entrypoint /bin/bash \
    --workdir $(pwd)/../node/ \
    malkab/nodejs-dev:16.13.2
