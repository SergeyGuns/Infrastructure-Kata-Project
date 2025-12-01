#!/bin/bash

# Script to run lint in all projects

set -e  # Exit on any error

echo "Running lint in all projects..."

# Array of services that have lint scripts
services_with_lint=(
  "backend-service"
  "auth-service" 
  "migration-service"
)

# Root directory of the project
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Run lint for services that have lint scripts
for service in "${services_with_lint[@]}"; do
  echo ""
  echo "==========================================="
  echo "Linting $service..."
  echo "==========================================="
  
  cd "$ROOT_DIR/$service"
  npm run lint
done

# Special handling for frontend which doesn't have a lint script but has ESLint configured
echo ""
echo "==========================================="
echo "Linting frontend..."
echo "==========================================="

cd "$ROOT_DIR/frontend"
npx eslint "src/**/*.{js,jsx,ts,tsx}" --max-warnings 0

echo ""
echo "==========================================="
echo "Lint completed for all projects!"
echo "==========================================="