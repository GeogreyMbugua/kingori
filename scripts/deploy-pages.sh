#!/usr/bin/env bash
# Builds the static preview and publishes it to the gh-pages branch.
# Indexing stays off: SITE_ALLOW_INDEXING is deliberately not set here.
set -euo pipefail

cd "$(dirname "$0")/.."

remote_url="$(git remote get-url origin)"
repo="$(basename -s .git "$remote_url")"
owner="$(basename "$(dirname "${remote_url/://}")")"

STATIC_EXPORT=true \
NEXT_PUBLIC_BASE_PATH="/$repo" \
NEXT_PUBLIC_SITE_URL="https://${owner,,}.github.io" \
  npx next build

# GitHub Pages runs Jekyll by default, which drops the _next/ directory.
touch out/.nojekyll

publish_dir="$(mktemp -d)"
trap 'rm -rf "$publish_dir"' EXIT
cp -r out/. "$publish_dir"

git -C "$publish_dir" init -q -b gh-pages
git -C "$publish_dir" add -A
git -C "$publish_dir" commit -q -m "Deploy $(git rev-parse --short HEAD)"
git -C "$publish_dir" push -q --force "$remote_url" gh-pages

echo "Published to https://${owner,,}.github.io/$repo/"
