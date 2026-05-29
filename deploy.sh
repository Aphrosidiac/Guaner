#!/usr/bin/env bash
# Guaner deploy script — run from the repo root on the VPS:  ./deploy.sh
# Pulls latest, builds backend + frontend, runs migrations, (re)starts PM2.
#
# Prerequisites (first time only — see DEPLOY.md):
#   - backend/.env  with production DATABASE_URL, JWT_SECRET, CORS_ORIGINS, etc.
#   - frontend/.env.local (or .env.production) with NEXT_PUBLIC_API_URL=https://<domain>
#     NOTE: NEXT_PUBLIC_* is baked in at build time, so it MUST be set before building.
set -euo pipefail

echo "==> git pull"
git pull origin master

echo "==> backend: install, migrate, generate, build"
cd backend
npm ci
npx prisma migrate deploy
npx prisma generate
npm run build
cd ..

echo "==> frontend: install, build (standalone), assemble static assets"
cd frontend
if [ ! -f .env.local ] && [ ! -f .env.production ]; then
  echo "!! WARNING: no frontend/.env.local or .env.production found."
  echo "!! NEXT_PUBLIC_API_URL will be empty and the store can't reach the API."
fi
npm ci
npm run build
# Next standalone needs public/ and .next/static copied alongside server.js
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static
cd ..

echo "==> pm2 (re)start"
pm2 startOrReload ecosystem.config.js --update-env
pm2 save

echo "==> done. pm2 status:"
pm2 status
