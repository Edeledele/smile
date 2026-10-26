# Buna Market

An online shop for Ethiopian coffee, spices and handmade goods. Shoppers browse, add to cart and pay with Chapa in test mode. Admins manage products and orders.
Buna Market is a working name; the team can rename it.

Part of the Zemenay Tech Intern Program 2026. Full guide: [docs/buna-market-guide.pdf](docs/buna-market-guide.pdf)

## Team

| Name | GitHub | Role |
| --- | --- | --- |
| Gizachew Dagnew Fetene | @Gech3734d | Team lead, full-stack, auth, cart, checkout |
| Beimnet Tariku Feyissa | @beimnet06 | Backend: products, orders, Chapa payments, recommendations |
| Genet Tilahun | @Edeledele | Backend: reviews and admin API, admin pages |
| Habtamu Dires Bedilu | @habtamudires4-ctrl | Frontend: shop pages, product page, cart UI |

## Stack

- Frontend: Next.js (App Router) + TypeScript + Tailwind + shadcn/ui, TanStack Query, Zustand
- Backend: Node.js (LTS) + Express + TypeScript
- Database: PostgreSQL + Prisma
- Validation: Zod. Auth: JWT + refresh token in an httpOnly cookie
- Images: Cloudinary. Payments: Chapa test mode
- Tests: Vitest + Supertest
- Deploy: Vercel (web), Render (API), Neon (database)

## Planned layout

```text
web/    Next.js frontend
api/    Express API
docs/   guide and notes
docker-compose.yml   local PostgreSQL
```

## Rules

1. Never push to `main`. One branch per task: `feature/cart-api`, `fix/cart-total`.
2. Small pull requests, one task each. Add a screenshot for UI work.
3. Every PR needs one approval before merge. Squash and merge.
4. Prices are whole santim (integers): 250.00 ETB is stored as `25000`.
5. Chapa test keys only. Secrets live in `.env`, which is never committed.

## Meetings and help

- Standup every Friday, 30 min. Demo and sprint planning every 2nd Friday, after standup.
- Stuck for more than 2 hours? Ask in the team channel first. Still stuck? Contact the program lead on Telegram: **@Kant_III**

## Your first task

Open a PR that adds your name to the list below.

### Contributors
Genet Tilahun
