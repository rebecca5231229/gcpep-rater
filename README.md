# GC-PEP Rating Tool — GCA Prototype

A step-by-step rating tool for Global Competency Alignment. Select the teacher's stated
indicator, rate the objective/activity/assignment against it, and the score is computed
automatically using the verified rubric logic (`src/lib/gca/scoring.ts`). If the portfolio
doesn't reach a 4, the rater can optionally check a "better-fit" indicator — restricted to
indicators sharing the same Global SLO domain and developmental competency type as the stated
indicator (the same-cell rule from the matrix).

## What's in here

- `src/lib/gca/indicators.ts` — all 55 Codebook indicators, with domain + type, sourced
  directly from the Codebook's own indicator table.
- `src/lib/gca/scoring.ts` — the scoring logic, verified against the exhaustive 27-combination
  tables for both the prioritized and non-prioritized branches (54 combinations total, all
  checked to match).
- `src/app/gca/page.tsx` — the rating wizard itself.
- `src/lib/dimensions.ts` — the tab list for all seven dimensions. Only GCA is `available: true`
  right now; flip the others on as they're built, each with its own `src/app/[slug]/page.tsx`.
- `src/proxy.ts` — the password gate (see note below on why it's not `middleware.ts`).

## Running locally

```bash
npm install
cp .env.example .env.local
# edit .env.local and set RATER_PASSWORD to something real
npm run dev
```

Visit `http://localhost:3000` — it'll redirect to `/login`.

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import it into Vercel (New Project → your repo). Vercel auto-detects Next.js, no config needed.
3. Before the first deploy (or right after, then redeploy), go to **Project Settings →
   Environment Variables** and add:
   - `RATER_PASSWORD` = whatever password you want your rating team to use.
4. Deploy. The whole site is gated by that one password via `src/proxy.ts` — every route
   redirects to `/login` until the correct password is entered, which sets an `httpOnly` cookie
   for 30 days.

To change the password later, just update the env var in Vercel and redeploy — no code change
needed.

### Going fully public later

When you're ready to open this up, either:
- Delete `src/proxy.ts` entirely (removes the gate), or
- Leave it in place but make login a no-op (simplest: keep the file, but you'd want to swap this
  for real auth if you ever need per-user tracking instead of one shared password).

## A note on `middleware.ts` vs `proxy.ts`

Next.js 16 renamed the `middleware.ts` convention to `proxy.ts` (same behavior, function renamed
from `middleware` to `proxy`). This repo already uses `src/proxy.ts` — if you see older Next.js
tutorials online referencing `middleware.ts`, that's the deprecated name for the same thing.

## CSV export

Each completed rating can be downloaded as a one-row CSV via the button at the bottom of the
score screen. The column structure (`src/lib/csv.ts`) is intentionally a bit more detailed than
what's shown on screen — it's designed so that once you're ready to build the "PDF report for a
teacher" feature, the same data shape can feed it without a redesign.

## What's NOT built yet

- The other six dimensions (tabs are visible but disabled).
- Central storage of ratings (currently: local calculation + per-rater CSV download only, per
  your call on this).
- PDF generation for teacher-facing feedback.
- Any real user accounts — this is a single shared password, not per-rater login. Fine for a
  small internal rating team; worth revisiting if you want to track who rated what without
  relying on the "rater initials" free-text field.
