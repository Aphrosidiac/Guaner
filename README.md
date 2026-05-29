# GUANER — Quality Clothing Malaysia

Full-stack e-commerce platform for a clothing brand. Built with Next.js 16, Fastify 5, Prisma 7, and PostgreSQL.

> **Live demo:** https://guaner.apdevotion.my
>
> This is currently a **working demo**, not the final site. The root (`/`) redirects to a **design-direction chooser** at `/styles`, where you can preview the store in 4 themes (Varsity, Streetwear, Minimal, Vintage) plus the **current store** at `/store`. Each themed mini-site has a working home → products → product detail (add-to-cart) → cart → about flow, all driven by the live backend. A theme has not been chosen yet; once it is, that system gets promoted store-wide and `/styles` is retired.

## Tech Stack

- **Frontend**: Next.js 16 (App Router) + Tailwind CSS v4
- **Backend**: Fastify 5 + TypeScript
- **Database**: PostgreSQL + Prisma 7
- **Payments**: Billplz / ToyyibPay (FPX, eWallets, cards) + WhatsApp manual transfer
- **Deployment**: Nginx + PM2 + Let's Encrypt SSL

## Project Structure

```
├── frontend/          Next.js app (dev :3000, prod :3201)
├── backend/           Fastify API (:3200)
├── ecosystem.config.js, deploy.sh, deploy/, DEPLOY.md   (VPS deploy tooling)
└── README.md
```

### Routes (demo)

| Path | What |
|------|------|
| `/` | Redirects to `/styles` |
| `/styles` | Design-direction chooser (5 cards) |
| `/styles/{theme}` | Themed homepage — `varsity` / `streetwear` / `minimal` / `vintage` |
| `/styles/{theme}/products`, `/products/[slug]`, `/cart`, `/about` | Shared inner pages, restyled per theme via tokens (`styles/themes.ts` + `_components/ThemedShell`) |
| `/store`, `/products`, `/cart`, `/checkout`, `/about`, `/faq`, … | The current monochrome store (global navbar/footer) |
| `/admin/*` | Admin panel |

Themed homepages are bespoke (`styles/_homes/*`); the inner pages are **one shared implementation** themed by per-theme tokens.

## Features

### Store
- Product catalog with 5 categories (T-Shirts, Hoodies, Pants, Caps, Accessories)
- Featured products (admin toggle) with showcase
- Shopping cart (localStorage, no login required)
- Dual checkout: WhatsApp manual transfer + online payment gateway
- Order tracking by phone number
- Product image uploads with admin management
- Trust badges (Quality Guaranteed, Free Shipping) on product pages

### Payment Gateway
- Full Billplz / ToyyibPay API integration
- Supports FPX, DuitNow, eWallets (TNG, GrabPay, Boost), cards
- Webhook callback with signature verification (timing-safe)
- Redirect handler with signature verification
- Auto-confirms orders on successful payment (PENDING → CONFIRMED)
- Sandbox/production toggle via env var
- Fallback: WhatsApp checkout still available for manual bank transfer

### UX
- Scroll-triggered animations (Animate/Stagger components)
- Floating WhatsApp button on all pages
- Mobile-responsive with collapsible admin sidebar

### Admin Panel (`/admin`)
- Dashboard with stats, recent orders, low stock alerts
- Product CRUD: images, pricing, stock, size, featured toggle
- Order management: status updates, payment tracking, WhatsApp customer link
- Discount codes
- Settings: WhatsApp number, business info, shipping fee, payment gateway

### Content Pages
- `/about` — Brand story
- `/faq` — Sizing, ordering, shipping, returns
- `/shipping` — Shipping policy with delivery times by region
- `/terms` — Terms & conditions
- `/privacy` — Privacy policy

## SEO

- Dynamic `sitemap.xml` (auto-generated from product catalog)
- `robots.txt` with crawl rules
- Per-page metadata
- JSON-LD structured data (Organization + Product schemas)
- Open Graph + Twitter Card tags
- Dynamic `generateMetadata` for product detail pages
- PWA manifest

## Local Development

### Prerequisites

- Node.js 20+
- PostgreSQL (or Docker)

### Database (Docker)

```bash
docker run -d --name girpack-pg \
  -e POSTGRES_USER=girpack_user -e POSTGRES_PASSWORD=girpack_pass -e POSTGRES_DB=guaner \
  -p 5433:5432 -v girpack-pg-data:/var/lib/postgresql/data postgres:16
```

### Backend

```bash
cd backend
cp .env.example .env        # edit DATABASE_URL and payment keys
npm install
npx prisma migrate deploy   # create tables
npx tsx prisma/seed.ts      # seed 8 products, 5 categories, admin user
npm run dev                 # runs on http://localhost:3200
```

### Frontend

```bash
cd frontend
echo "NEXT_PUBLIC_API_URL=http://localhost:3200" > .env.local
npm install
npm run dev                 # runs on http://localhost:3000
```

### Admin Panel

Navigate to `/admin` and log in:

- **Email**: `admin@guaner.com`
- **Password**: `admin123`

## Payment Gateway Setup

### Configuration

```env
BILLPLZ_API_KEY="your-api-secret-key"
BILLPLZ_COLLECTION_ID="your-collection-id"
BILLPLZ_SIGNATURE_KEY="your-x-signature-key"
BILLPLZ_SANDBOX=true          # false for production

TOYYIBPAY_SECRET_KEY="your-secret-key"
TOYYIBPAY_CATEGORY_CODE="your-category-code"
TOYYIBPAY_SANDBOX=true
```

### Payment Flow

```
Customer → Checkout (Online Payment) → Order created in DB
→ Bill created via gateway API → Customer redirected to gateway
→ Customer pays (FPX/card/eWallet) → Gateway webhook callback
→ Backend verifies signature → Order marked PAID + CONFIRMED
→ Customer redirected to /checkout/success
```

### WhatsApp Flow

```
Customer → Checkout (WhatsApp) → Order created in DB
→ Formatted message opened in WhatsApp → Customer sends bank transfer
→ Admin confirms payment manually in /admin/orders
```

## Product Categories

| Category    | Examples                          |
|-------------|-----------------------------------|
| T-Shirts    | Essential Oversized Tee, Logo Print Tee, Washed Vintage Tee |
| Hoodies     | Heavyweight Hoodie, Zip-Up Hoodie |
| Pants       | Relaxed Cargo Pants, Essential Joggers |
| Caps        | Embroidered Cap                   |
| Accessories | Bags, socks & more                |

## Deployment (VPS)

**Live on** `43.134.16.213` (Tencent, user `ubuntu`) at **guaner.apdevotion.my**. This box is **shared** with AscendPeptides + others — only additive changes (separate `guaner` DB, ports 3200/3201, own nginx site). See `DEPLOY.md` for full setup.

**Important — the frontend is built locally and rsync'd, NOT built on the box.** The VPS has only ~1.9 GB RAM, and `next build` there risks OOM-killing the co-hosted apps. `deploy.sh` builds on the box and is fine for a roomier server; for this box use the flow below.

```bash
# Backend (light build — runs on the box)
ssh -i ~/.ssh/guaner_deploy ubuntu@43.134.16.213
cd /home/ubuntu/guaner && git pull origin master
cd backend && npm ci && npx prisma migrate deploy && npx prisma generate && npm run build
pm2 restart guaner-api          # fork mode (bcryptjs)

# Frontend (build LOCALLY with prod API url, then rsync the standalone)
cd frontend
NEXT_PUBLIC_API_URL=https://guaner.apdevotion.my npm run build
cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static
rsync -az --delete -e "ssh -i ~/.ssh/guaner_deploy" \
  .next/standalone/ ubuntu@43.134.16.213:/home/ubuntu/guaner/frontend/.next/standalone/
ssh -i ~/.ssh/guaner_deploy ubuntu@43.134.16.213 'pm2 restart guaner-web'
```

> `NEXT_PUBLIC_API_URL` is inlined at build time — to change the API origin you must rebuild the frontend, not just restart it. Product images live in `frontend/public/catalog/` and are referenced as `/catalog/...`.

### PM2 Processes

| Name         | Port | Description       |
|--------------|------|-------------------|
| guaner-api   | 3200 | Fastify backend (fork mode) |
| guaner-web   | 3201 | Next.js frontend (standalone) |

### Nginx

Proxies `/api/*` and `/uploads/*` to backend, everything else to frontend. SSL via Let's Encrypt (auto-renews).

## API Endpoints

### Public

- `GET /api/v1/categories` — list categories
- `GET /api/v1/products?category=&search=&featured=true` — list products
- `GET /api/v1/products/:slug` — product detail
- `GET /api/v1/settings` — public store settings
- `POST /api/v1/orders` — create order (returns whatsappUrl or paymentUrl)
- `GET /api/v1/orders/lookup?phone=` — track orders by phone

### Payments

- `POST /api/v1/payments/billplz/callback` — Billplz webhook (signature verified)
- `GET /api/v1/payments/billplz/redirect` — Billplz redirect handler

### Admin (requires Bearer token)

- `POST /api/v1/auth/login` — admin login (JWT, 24h expiry)
- `GET /api/v1/auth/me` — current admin user
- `GET /api/v1/admin/dashboard/stats` — dashboard stats
- `GET/POST/PATCH/DELETE /api/v1/admin/products` — product CRUD (size, featured)
- `GET/PATCH /api/v1/admin/orders` — order management
- `GET/PUT /api/v1/admin/settings` — store settings
- `POST /api/v1/admin/upload/image` — product image upload (JPEG/PNG/WebP, max 5MB)

## Security

- Payment webhooks verified with HMAC signature (timing-safe comparison)
- Order creation fully transactional (no race conditions on stock or order numbers)
- File uploads: type validation, size limit enforced, truncated files deleted
- Rate limiting per-IP (100 req/min)
- CORS origins from environment variable
- JWT auth with 24h expiry on all admin routes
- Helmet security headers
- Input validation via Zod on all endpoints
