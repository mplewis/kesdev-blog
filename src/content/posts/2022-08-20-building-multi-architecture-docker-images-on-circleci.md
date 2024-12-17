---
title: Building multi-architecture Docker images on CircleCI
slug: building-multi-architecture-docker-images-on-circleci
date: 2022-08-20T22:35:42.000Z
---
<p>I spent a couple of hours today working to build my Docker images for ARM and x64 machines in my hosted CI provider, CircleCI. Here is the solution I came up with. I hope this saves you some time if you have to do the same thing in the future.</p><p>This solution:</p><ul><li>builds ARM and x64 images</li><li>runs on commits on the <code>main</code> branch of your repo</li><li>pushes <code>your_app:latest</code> and <code>your_app:&lt;1234567&gt;</code> image tags to Docker Hub (where <code>&lt;1234567&gt;</code> are the first 7 characters of the commit SHA)</li><li>if the commit is tagged, pushes <code>your_app:&lt;commit_tag&gt;</code> as well</li></ul><figure class="kg-card kg-code-card"><pre><code class="language-yaml">version: 2.1

jobs:
  build:
    # We must use a machine image to get multi-arch support;
    # this doesn't work inside a Docker image
    resource_class: medium
    machine:
      image: ubuntu-2204:2022.07.1
    steps:
      - checkout
      - run:
          # Configure the "Docker Hub" for your organization, and set the DOCKER_LOGIN and DOCKER_PASSWORD env vars
          name: Sign in to Docker Hub
          command: docker login -u $DOCKER_LOGIN -p $DOCKER_PASSWORD
      - run:
        # required for multi-arch builds
          name: Create Docker builder
          command: docker buildx create --use
      - run:
          name: Build and push image
          command: bin/build-and-push-image
          environment:
            IMAGE_NAME: your_username/your_image_name

workflows:
  build:
    jobs:
      - build:
          context:
            - Docker Hub
          filters:
            branches:
              only: main</code></pre><figcaption>Contents of <code>.circleci/config.yml</code></figcaption></figure><figure class="kg-card kg-code-card"><pre><code class="language-bash">#!/bin/bash

if [ -z "$CI" ]; then # protective magick
  echo "This script must be run inside a CI environment."
  exit 0
fi

export BUILD_CMD="docker buildx build --progress plain --platform linux/amd64,linux/arm64 --push"
BUILD_SHA="$(echo "$CIRCLE_SHA1" | cut -c1-7)"
export BUILD_SHA

set -euxo pipefail

$BUILD_CMD -t "$IMAGE_NAME:latest" .
$BUILD_CMD -t "$IMAGE_NAME:$BUILD_SHA" .

set +u
if [ -n "$CIRCLE_TAG" ]; then
  $BUILD_CMD -t "$IMAGE_NAME:$CIRCLE_TAG" .
fi
set -u</code></pre><figcaption>Contents of <code>bin/build-and-push-image</code> script</figcaption></figure>