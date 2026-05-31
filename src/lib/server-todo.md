# Server-side code dropped during the Astro port

The source (`genai/`) is a TanStack Start app with a server runtime. Astro's
`output: 'static'` model has no equivalent for these, so the server-only modules
below were **not** ported. The operator-visible UI they served has been
reproduced with static mock data (`src/lib/mock-data.ts`).

If/when ScopeGuard needs a real backend, re-introduce these behind an Astro
adapter (`@astrojs/node` / Cloudflare) as API routes under `src/pages/api/`.

## Dropped modules

- `genai/src/server.ts` — TanStack Start server entry.
  TODO: reimplement as an Astro server endpoint / adapter if SSR is needed.
- `genai/src/start.ts` — TanStack Start bootstrap.
  TODO: no Astro equivalent; Astro owns app bootstrap.
- `genai/src/router.tsx` + `genai/src/routeTree.gen.ts` — TanStack Router setup.
  TODO: replaced by Astro file-based routing under `src/pages/`.
- `genai/src/lib/api/example.functions.ts` — TanStack server functions.
  TODO: port to `src/pages/api/*` if live data is required.
- `genai/src/lib/config.server.ts` — server-only config.
  TODO: move to runtime env / Astro server context.
- `genai/src/lib/error-capture.ts`, `error-page.ts`,
  `lovable-error-reporting.ts` — Lovable/TanStack error reporting.
  TODO: drop (Lovable-specific) or replace with the project's own error tooling.

## Routing translation

| TanStack route (`genai/src/routes/`) | Astro page (`src/pages/`)     |
| ------------------------------------ | ----------------------------- |
| `index.tsx`                          | `index.astro` (Landing)       |
| `app.tsx` (layout)                   | shared `components/AppShell`   |
| `app.index.tsx`                      | `app/index.astro`             |
| `app.inventory.tsx`                  | `app/inventory.astro`         |
| `app.review.tsx`                     | `app/review.astro`            |
| `app.policies.tsx`                   | `app/policies.astro`          |
| `app.publishers.tsx`                 | `app/publishers.astro`        |
| `app.alerts.tsx`                     | `app/alerts.astro`            |
| `app.settings.tsx`                   | `app/settings.astro`          |

`__root.tsx` chrome (theme init script, `<head>` meta) → `src/layouts/Layout.astro`
and the inline `<head>` of `src/pages/index.astro`.
