#!/bin/bash

# Script to run tests in all projects

set -e  # Exit on any error

echo "Running tests in all projects..."

# Array of services that have test scripts
services_with_tests=(
  "backend-service"
  "auth-service"
  "migration-service"
  "frontend"
)

# Root directory of the project
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

# Run tests for services that have test scripts
for service in "${services_with_tests[@]}"; do
  echo ""
  echo "==========================================="
  echo "Testing $service..."
  echo "==========================================="

  cd "$ROOT_DIR/$service"
  
  # Check if package.json exists and has test script
  if [ -f "package.json" ] && [ "$(grep -c '\"test\"' package.json)" -gt 0 ]; then
    npm run test
  else
    echo "No test script found in $service"
  fi
done

echo ""
echo "==========================================="
echo "Tests completed for all projects!"
echo "==========================================="