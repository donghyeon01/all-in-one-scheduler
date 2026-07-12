#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

ENV_FILE="${1:-.env.production}"
if [[ ! -f "$ENV_FILE" ]]; then
  echo "Environment file not found: $ENV_FILE"
  echo "Create .env.production from .env.production.example and try again."
  exit 1
fi

echo "Using environment file: $ENV_FILE"
docker compose --env-file "$ENV_FILE" up -d --build

echo "Deployment started."
docker compose --env-file "$ENV_FILE" ps
