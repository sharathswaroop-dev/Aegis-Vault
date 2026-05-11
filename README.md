# FoodFlow AI

FoodFlow AI is an enterprise SaaS dashboard for AI-powered food inventory forecasting and supply chain intelligence.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- shadcn/ui primitives
- Framer Motion
- Recharts
- Lucide React
- Zustand
- Prisma
- PostgreSQL

## Local Development

```bash
npm install
npm run dev
```

Set `DATABASE_URL` for PostgreSQL-backed Prisma workflows:

```bash
DATABASE_URL="postgresql://user:password@localhost:5432/foodflow"
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
```

The app is structured for Vercel deployment.
