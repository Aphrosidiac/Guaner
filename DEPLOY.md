# Deploying Guaner to a VPS

Full stack on one box: **Next.js frontend** (`:3201`) + **Fastify API** (`:3200`) + **PostgreSQL**, fronted by **nginx** with **PM2** keeping the Node processes alive.

## 0. Server prerequisites (once)

```bash
# Node 20+ (or 22), PM2, nginx, certbot, PostgreSQL client
sudo apt update && sudo apt install -y nginx postgresql-client
npm i -g pm2
sudo apt install -y certbot python3-certbot-nginx
```

PostgreSQL: either a local install, a Docker container, or a managed DB. You just need a reachable `DATABASE_URL`.

## 1. Clone

```bash
cd /home/ubuntu        # or wherever you keep apps
git clone https://github.com/Aphrosidiac/Guaner.git guaner
cd guaner
```

## 2. Environment

**`backend/.env`** (copy from `backend/.env.example`, fill in real values):

```env
DATABASE_URL="postgresql://USER:PASS@HOST:5432/guaner"
JWT_SECRET="<long random string>"
PORT=3200
HOST="0.0.0.0"
FRONTEND_URL="https://guaner.com"
CORS_ORIGINS="https://guaner.com,https://www.guaner.com"
WHATSAPP_NUMBER="60xxxxxxxxx"
# Billplz / ToyyibPay keys when ready (sandbox=false for live)
```

**`frontend/.env.local`** (baked into the client at build time — set before building):

```env
NEXT_PUBLIC_API_URL=https://guaner.com
```

## 3. Database (first time)

```bash
cd backend
npm ci
npx prisma migrate deploy   # creates all tables
npx tsx prisma/seed.ts      # 5 categories, 8 products, admin@guaner.com / admin123
cd ..
```

> Change the admin password after first login.

## 4. First build + start

```bash
./deploy.sh          # builds backend + frontend, runs migrations, starts PM2
pm2 startup          # follow the printed command so PM2 survives reboots
pm2 save
```

This starts two processes: `guaner-api` (:3200) and `guaner-web` (:3201).

## 5. nginx + SSL

```bash
sudo cp deploy/nginx.conf.example /etc/nginx/sites-available/guaner
# edit the file: set your real server_name
sudo ln -s /etc/nginx/sites-available/guaner /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d guaner.com -d www.guaner.com
```

## 6. Subsequent deploys

```bash
cd /home/ubuntu/guaner
./deploy.sh
```

## Notes / gotchas

- **bcryptjs + PM2:** `guaner-api` MUST run in **fork mode** (set in `ecosystem.config.js`). Cluster mode + tsup-bundled bcryptjs v3 causes intermittent auth failures. `tsup.config.ts` already externalizes `bcryptjs`, `@prisma/client`, `@prisma/adapter-pg`, `pg`.
- **NEXT_PUBLIC_API_URL is build-time.** If you change the domain, you must rebuild the frontend, not just restart it.
- **Ports** (`3200` API, `3201` web) are set in `backend/.env` and `ecosystem.config.js`. Change them if they clash with other apps on the box.
- **Uploads** live on disk under `backend/uploads/` and are served at `/uploads/` (proxied by nginx). They are gitignored — back them up separately.
- The `/styles/*` routes are throwaway design mockups; remove them once a direction is chosen.
