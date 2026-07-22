#!/bin/bash
set -e

# Keep Node dependencies in sync after a task merge. The Express server
# (server/) creates/updates its own Postgres tables on startup, so no
# separate migration step is needed here.
if [ -f package.json ]; then
  npm install --no-audit --no-fund
fi
