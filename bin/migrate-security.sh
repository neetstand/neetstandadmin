#!/bin/bash

# Ensure we are in the apps/admin directory or handle root execution
# This script assumes it's run from apps/admin or project root where package.json defines the context.
# But simply, let's just use executed path.

echo "Running Security Migration..."
# Using tsx to run the typescript file directly
npx tsx scripts/migrate-security.ts
