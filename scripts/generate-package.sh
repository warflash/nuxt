#!/bin/bash

set -xe

# Restore all git changes
git restore -s@ -SW  -- packages examples

# Bump versions to edge
pnpm jiti ./scripts/bump-edge

# Create packed .tgz files without publishing
for p in packages/* ; do
  if [[ $p == "packages/nuxi" ]] ; then
    continue
  fi
  pushd $p
  echo "Packing $p"
  cp ../../LICENSE .
  cp ../../README.md .
  pnpm pack
  popd
done
