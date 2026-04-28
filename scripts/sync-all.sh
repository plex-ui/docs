#!/bin/bash
# Full sync — main repo, .memory submodule, figma-ai-bridge plugin.
# Idempotent: safe to run any time on any maintainer machine.
#
# Cleans legacy artifacts in figma/plugin/ (figma-mcp-bridge, plex-ui,
# stale zips, .DS_Store) that aren't part of the synced product. The
# plugin lives only as a clone of plex-ui/figma-ai-bridge inside
# figma/plugin/figma-ai-bridge/.

set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT"

echo "→ Pulling main repo (plex-ui/docs)…"
prev_head=$(git rev-parse HEAD)
git pull --no-recurse-submodules
new_head=$(git rev-parse HEAD)

echo "→ Pulling .memory submodule (plex-ui/docs-memory)…"
( cd .memory && git checkout master --quiet && git pull )

echo "→ Cleaning legacy artifacts in figma/plugin/…"
mkdir -p figma/plugin
( cd figma/plugin && \
  rm -f .DS_Store figma-ai-bridge-v*.zip && \
  rm -rf figma-mcp-bridge plex-ui )

echo "→ Syncing plugin (plex-ui/figma-ai-bridge)…"
if [[ -d figma/plugin/figma-ai-bridge/.git ]]; then
  ( cd figma/plugin/figma-ai-bridge && git pull )
else
  # Stale or missing local copy → wipe and clone fresh
  rm -rf figma/plugin/figma-ai-bridge
  git clone https://github.com/plex-ui/figma-ai-bridge.git figma/plugin/figma-ai-bridge
  chmod +x figma/plugin/figma-ai-bridge/build-zip.sh \
           figma/plugin/figma-ai-bridge/start-bridge.command
fi

echo "→ packages/ui rebuild gate…"
if [[ "$prev_head" != "$new_head" ]] && \
   git diff "$prev_head" "$new_head" --name-only -- packages/ui/ | grep -q .; then
  echo "  packages/ui changed — rebuilding"
  ( cd packages/ui && npm run build )
  rm -rf .next
  echo "  ⚠ Restart the dev server via Claude Preview MCP if it was running."
else
  echo "  no packages/ui changes; nothing to rebuild"
fi

echo ""
echo "✓ Full sync complete"
echo "  main:    $(git rev-parse --short HEAD)"
echo "  .memory: $( cd .memory && git rev-parse --short HEAD )"
echo "  plugin:  $( cd figma/plugin/figma-ai-bridge && git rev-parse --short HEAD )"
