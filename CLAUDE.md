# Bifurkate

Strava-powered app that plots a user's past activities/routes on a map with filtering
(activity type, season, custom dates) and map styling options (heatmap, colors, line
weight, show routes/bike paths), plus stats (distance/elevation/time).

## Code style

- Never add comments. Code should be self-explanatory through naming; if it isn't, restructure
  it instead of explaining it with a comment.
- Formatting/linting is Biome (`bun run check`), not ESLint/Prettier.
- Keep files small and flat — one concern per file, avoid premature abstraction.

## Stack

- Bun (package manager + scripts), Vite, React 19, TypeScript.
- Frontend-only SPA — no SSR, no framework server (no Next.js/Gatsby).
- Routing: React Router (`createBrowserRouter`) — `/`, `/app`, `/callback`, `/privacy`, `*`.
- Styling: Tailwind v4 + shadcn/ui (`components.json` configured, dark theme by default).
  `src/components/ui/sheet.tsx` has one deliberate deviation from the generated version: a
  `showOverlay` prop on `SheetContent` (used by the sidebar to skip the dimming backdrop and stay
  non-modal). Re-running `bunx shadcn add sheet` will silently overwrite it — reapply that prop
  if so.
- Client state: Zustand (`src/stores/`) — e.g. `auth-store.ts` for the persisted Strava session.
- Server state: TanStack Query (`src/hooks/use-strava-data.ts`) for athlete/activities/routes —
  no manual `useEffect` fetch-and-store.
- Map: Leaflet via `react-leaflet`, `preferCanvas` so all polylines draw through one shared
  canvas (WebGL/MapLibre was tried first but re-tessellates GeoJSON on every zoom level, which
  is slow with 1000+ long GPS tracks — canvas-mode Leaflet doesn't have that cost). Basemap =
  Carto's free `dark_all` raster tiles, no API key. One `<Polyline>` per activity/route.
- Domain logic lives in `src/lib/` — `src/lib/strava/` (API client, OAuth, types) and
  `src/lib/activities/` (decode/filter/stats on Strava data), independent of React.

## Auth

Strava OAuth requires a `client_secret` that can never reach the browser. `netlify/functions/
{authenticate,refreshToken}` hold that secret and are the only server-side piece of this
otherwise frontend-only app — treat them as a fixed boundary, not something to rewrite into the
SPA. The frontend calls them via relative paths (`/.netlify/functions/...`), so
`netlify functions:serve` is needed locally alongside plain `vite` (see `vite.config.ts`'s dev
proxy to port 9999) — `vite` alone won't have working auth. Don't use `netlify dev`: it has a
redirect-rule bug with Vite 7 that blanks the page.

## Env vars

See `.env.example`. `VITE_`-prefixed vars are bundled into the browser and are not secret.
`CLIENT_SECRET` (no `VITE_` prefix) is server-side only, read by the Netlify functions — it must
never gain a `VITE_` prefix.

## Design

- Text is never smaller than `text-base` (16px) — no `text-xs`/`text-sm` for real UI copy.
  Hierarchy comes from weight and color (`font-semibold`/`font-bold`, `text-foreground` vs
  `text-muted-foreground`), not from shrinking text.
- Bias toward big and bold: bigger headings, bold labels, larger icons/touch targets, generous
  padding. Avoid dainty/cramped UI.
- Keep contrast high — use the `foreground`/`muted-foreground`/`background` tokens as intended
  (muted text still needs to read clearly against the dark theme), don't lower opacity on text
  to fake a muted look.

## Debugging: verify, don't recall

When something isn't behaving as expected, don't reason it out from memory of how a library
"should" work — that memory is often wrong or outdated, and chaining assumptions on top of it
burns far more time than checking would have. Read the actual installed source, the built
output, or the real DOM/CSS in front of you before proposing an explanation, and prefer a
concrete, decisive fix over a theory. Example: a layer rendering behind another one should be
fixed by giving every overlapping layer an explicit `position` + explicit `z-<n>` on one shared
ordered scale (map `z-10` < sidebar sheet `z-50` < navbar `z-60`) — not by speculating about a
library's (Leaflet, Radix, etc.) implicit stacking-context behavior from memory.

## Dependencies

Prefer implementing small pieces of logic ourselves (e.g. the Strava API client) over pulling in
third-party packages, especially obscure/low-adoption ones — check download counts and
maintenance status before adding a new dependency, and ask first if unsure.
