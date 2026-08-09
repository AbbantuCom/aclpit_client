# ACLPIT Public Website

The public website for the **African Centre for Law and Public Interest Technology (ACLPIT)**. This is a Next.js (App Router) + TypeScript + Tailwind rebuild of a static Bootstrap site (kept for reference in [`_legacy/`](./_legacy)), wired to a separate admin/API backend.

---

## Architecture

This repo has **no database and no content editing UI**. All content (hero copy, about page, services, practice areas, publications, dialogues, contact details, footer) lives in a separate repo, **`aclpit_admin_api`**, which exposes it over a small HTTP API and provides the CMS admin panel editors write it through.

```
┌─────────────────────┐        GET  /api/content/:section        ┌──────────────────────┐
│                      │ ───────────────────────────────────────▶ │                       │
│   aclpit_client      │                                          │   aclpit_admin_api    │
│   (this repo)        │        POST /api/contact                 │   (admin + content    │
│   public website     │ ───────────────────────────────────────▶ │    API + CMS)         │
│                      │                                          │                       │
│                      │ ◀─────────────────────────────────────── │                       │
└─────────────────────┘   POST /api/revalidate (on publish)       └──────────────────────┘
```

- **Reading content** — every content page is an `async` Server Component. It calls `fetch()` against `${ADMIN_API_URL}/api/content/<section>` with `next: { tags: [section], revalidate: 3600 }`, so Next.js caches the response, serves it statically, and revalidates it in the background at most once an hour ([ISR](https://nextjs.org/docs/app/guides/incremental-static-regeneration)). No content page does client-side fetching — pages render fully on the server, with no loading spinners.
- **On-demand revalidation** — when an editor **publishes** a section in the admin panel, `aclpit_admin_api` POSTs `{ secret, tag }` to this site's `app/api/revalidate/route.ts`, which calls `revalidateTag(tag, { expire: 0 })` to drop the cached copy immediately instead of waiting out the hourly window. A plain *save* in the admin panel does not reach this site at all — see below.
- **Published vs draft content** — the admin panel stores two copies of every section, and this site normally reads only the **published** one. Editors save private drafts that visitors never see until someone publishes. To check a draft before going live, they click **Preview** in the admin panel, which opens `app/api/preview/route.ts` here with a signed, 15-minute token. That route verifies the token against the shared `PREVIEW_SECRET`, turns on Next.js [Draft Mode](https://nextjs.org/docs/app/guides/draft-mode), and redirects to the page being edited. While Draft Mode is on, `getSection()` reads `?state=draft` from the admin API (authenticating with `PREVIEW_SECRET`, uncached) and `components/PreviewBanner.tsx` pins a "Preview mode" bar to the bottom of the page with an **Exit preview** button. Every other visitor keeps getting the cached, published site throughout.
- **Graceful fallback** — `lib/content-api.ts`'s `getSection()` never throws. If `ADMIN_API_URL` is unset, the admin API is unreachable, or a section hasn't been seeded yet, it logs a warning and falls back to the matching constant in `lib/fallback-content.ts` (mirrors the admin repo's seed data). The site always renders, even if the admin API is down at build or revalidate time.
- **Writing content (the contact form)** — the one exception to "no client-side data fetching." The contact form is a Client Component using TanStack React Query's `useMutation` to `POST` directly to `${NEXT_PUBLIC_ADMIN_API_URL}/api/contact` from the browser. This is the **only** place React Query is used in this app. The admin API's `POST /api/contact` only accepts `{ name, email, subject, message }`; the form's Organisation/Address/Area of Interest fields are folded into `subject`/`message` before sending (see the comment in `components/ContactSection.tsx`). This requires the admin API to have this site's deployed origin listed in its own `CLIENT_ORIGIN` env var, or the browser's cross-origin `POST` will be rejected by CORS.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS + ACLPIT's own design-system CSS classes (`app/globals.css`) |
| Icons | `bootstrap-icons` (kept from the legacy design) |
| Data (contact form only) | TanStack React Query |
| Content source | `aclpit_admin_api` (separate repo) |

---

## Project Structure

```
aclpit_client/
├── _legacy/                   ← original static HTML/CSS/JS site, kept for reference
│                                 (excluded from the build via tsconfig "exclude")
├── app/
│   ├── page.tsx                ← Home (hero, about/services/practice-area previews, contact)
│   ├── about/page.tsx
│   ├── services/page.tsx
│   ├── practice-areas/page.tsx
│   ├── publications/page.tsx
│   ├── dialogues/page.tsx
│   ├── privacy/page.tsx        ← static, no API fetch
│   ├── terms/page.tsx          ← static, no API fetch
│   ├── cookies/page.tsx        ← static, no API fetch
│   ├── api/revalidate/route.ts ← on-demand cache invalidation, called by aclpit_admin_api
│   ├── api/preview/route.ts    ← enters Draft Mode from a signed admin preview link
│   ├── api/preview/exit/route.ts ← leaves Draft Mode (POST, from the preview banner)
│   ├── layout.tsx              ← Navbar/Footer/CookieBanner/PreviewBanner/RevealObserver/QueryProvider
│   └── globals.css             ← brand tokens + ACLPIT design-system component classes
├── components/                 ← Navbar, Footer, PageBanner, ContactCta, ContactSection,
│                                  DialoguesGrid/VideoModal, PublicationsGrid/PdfModal, etc.
├── lib/
│   ├── content-api.ts           ← getSection(): fetch + tag + graceful fallback
│   ├── fallback-content.ts      ← default content per section
│   ├── youtube.ts                ← YouTube URL → video ID
│   └── text.ts                   ← hero title/highlight splitting
├── types/index.ts                ← content types, duplicated from aclpit_admin_api
└── public/assets/                 ← brand images (logo, favicon)
```

---

## Content Sections

| Section | Where it's used |
|---|---|
| `hero` | Home |
| `about` | Home (preview) + About page |
| `services` | Home (preview) + Services page |
| `practiceAreas` | Home (preview) + Practice Areas page |
| `publications` | Publications page |
| `dialogues` | Dialogues page |
| `contact` | Home (contact section) + Footer (contact column) |
| `footer` | Footer (brand description + copyright name) |

**Known gap:** the homepage's "Why ACLPIT" section (4 items) has no corresponding field in `AboutContent` — it's hardcoded in `app/page.tsx` until the admin repo's content model grows a field for it.

---

## Environment Variables

Copy the example and fill in your values:

```bash
cp .env.example .env.local
```

| Variable | Used by | Notes |
|---|---|---|
| `ADMIN_API_URL` | Server-side content fetches | Never exposed to the browser |
| `NEXT_PUBLIC_ADMIN_API_URL` | Contact form (browser) | Same admin API, but reachable client-side — must be `NEXT_PUBLIC_`-prefixed to be inlined into the browser bundle |
| `REVALIDATE_SECRET` | `app/api/revalidate` | Must match `REVALIDATE_SECRET` in `aclpit_admin_api` |
| `PREVIEW_SECRET` | `app/api/preview`, draft fetches in `lib/content-api.ts` | Must match `PREVIEW_SECRET` in `aclpit_admin_api`. Verifies signed preview links and authenticates draft reads. If unset, preview links are refused and the site only renders published content |

---

## Running the App

```bash
npm install
npm run dev      # http://localhost:3000
npm run build
npm start
```

Without `ADMIN_API_URL` set, every content page still renders — using the fallback content in `lib/fallback-content.ts` — with a `console.warn` per section noting the fallback was used.

---

## Deployment

1. Deploy `aclpit_admin_api` first (or point at an existing deployment).
2. Set this repo's env vars: `ADMIN_API_URL` / `NEXT_PUBLIC_ADMIN_API_URL` pointing at that deployment, plus `REVALIDATE_SECRET` and `PREVIEW_SECRET` matching their values there.
3. In `aclpit_admin_api`, set `CLIENT_URL` to this site's deployed URL (used for both the revalidate webhook and preview links) and add this site's origin to `CLIENT_ORIGIN` (for CORS on content GET + contact POST).
4. Deploy this repo (`npm run build && npm start`, or any Next.js host).
