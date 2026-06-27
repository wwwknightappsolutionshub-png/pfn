# 148Inspirations (PLN)

Premium editorial website and headless CMS for **148Inspirations** — a Christian mission teaching godly and profitable living through practical wisdom.

Built as a **standalone project** (separate from StreetRank).

## Stack

- **Frontend:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, GSAP
- **CMS:** Payload CMS 3 + PostgreSQL
- **UI:** shadcn-style components (Radix + CVA)

## Project structure

```
profitable-living-network/
├── payload.config.ts       # Payload CMS config
├── docker-compose.yml      # Local PostgreSQL
├── media/                  # Local uploads (S3-ready architecture)
├── src/
│   ├── app/
│   │   ├── (frontend)/     # Public website
│   │   ├── (payload)/      # Admin + Payload API
│   │   └── api/            # Contact & newsletter
│   ├── collections/        # CMS collections
│   ├── globals/            # Homepage, About, Site settings
│   └── components/         # Premium UI components
```

## Quick start

### 1. Environment

```bash
cp .env.example .env
```

Edit `.env` — set `PAYLOAD_SECRET` to a long random string.

### 2. Database

**Default (recommended for local dev):** SQLite — no Docker required. The database file is created automatically at `data/pln.db`.

**Optional PostgreSQL:** Uncomment `DATABASE_URI` in `.env` and run:

```bash
docker compose up -d
```

### 3. Install & run

```bash
npm install
npm run dev
```

- **Website:** http://localhost:3010  
- **Admin:** http://localhost:3010/admin  

> PLN uses port **3010** so it does not conflict with other apps (e.g. StreetRank) on port 3000.

### 4. Seed admin user & demo content

**Admin only** (dev server must be running):

```bash
npm run dev
npm run seed:admin
```

Default login at http://localhost:3010/admin:

- **Email:** `admin@profitableliving.network` (override with `SEED_ADMIN_EMAIL` in `.env`)
- **Password:** `PLNAdminDev2026!` (override with `SEED_ADMIN_PASSWORD`)

**Full demo seed** (with the dev server running):

```bash
npm run dev
npm run seed
```

Or open http://localhost:3010/api/seed in your browser. This creates/updates the admin user plus articles, events, services, resources, testimonials, YouTube videos, images, and globals. Replace YouTube video IDs in **Admin → YouTube Videos** with Peter's real channel uploads.

**Placeholder images** (when CMS media is missing) live in `public/images/` (JPEG + SVG). They work without seeding. After a fresh clone, if photos are missing, run:

```bash
npm run placeholders
```

### Troubleshooting

| Problem | Fix |
|---------|-----|
| Blank page on `localhost:3000` | PLN runs on **3010**, not 3000. Open http://localhost:3010 |
| “Another next dev server is already running” | Close other terminals, delete `.next/dev/lock`, run `npm run dev` again |
| Slow first load (~5s) | Normal on first run while SQLite creates `data/pln.db` |
| Postgres errors in logs | Remove or comment `DATABASE_URI` in `.env` to use SQLite |

### 4. Generate types (optional)

```bash
npm run generate:types
npm run generate:importmap
```

## CMS collections

| Collection | Purpose |
|------------|---------|
| Users | Admin authentication |
| Articles | Teachings, blog, SEO |
| Events | Wisdom Snippets, School of Wisdom, conferences |
| Services | Mentoring, consultancy, speaking |
| Resources | Videos, downloads, archives |
| Testimonials | Social proof |
| Contact Submissions | Form inquiries |
| Newsletter Subscribers | Email list |

**Globals:** Homepage, About Page, Site Settings

## Pages

- `/` — Cinematic home, constellation, wisdom journey
- `/about` — Editorial profile, credentials
- `/services` — CMS-managed services
- `/events` — Calendar & agenda views
- `/resources` — Search & filter knowledge hub
- `/contact` — Inquiry form → CMS + optional email

## Production

1. Provision PostgreSQL and set `DATABASE_URI`
2. Set `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL`
3. Configure SMTP for contact notifications (optional)
4. `npm run build && npm start`
5. For media at scale, migrate to AWS S3 via Payload storage adapter

## Design

- **Colors:** Deep navy, gold, ivory, charcoal  
- **Typography:** Cormorant Garamond, Source Serif 4, DM Sans  
- **Motion:** GSAP scroll storytelling + Framer Motion  

No generic church/ministry template — editorial, asymmetric, premium layout.
