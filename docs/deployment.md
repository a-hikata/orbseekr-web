# Deployment guide

Static output (`npm run build` → `dist/`). No server runtime is required.
This guide covers both deployment targets named in the brief; pick one — do
not run both against the same domain.

**None of the steps below have been executed.** Domain, DNS, and production
publish are explicit-permission actions and are left for the maintainer to
run themselves (or to ask for, explicitly, one step at a time).

## Environments

| Environment | Purpose                                                           | Suggested host                                     |
| ----------- | ----------------------------------------------------------------- | -------------------------------------------------- |
| Production  | `https://orbseekr.jp`                                             | Cloudflare Pages or Vercel, apex domain            |
| Preview     | `https://preview.orbseekr.jp` (or platform-generated preview URL) | Same platform, per-PR preview deploys              |
| Staging     | `https://staging.orbseekr.jp` (optional)                          | Same platform, a dedicated branch (e.g. `staging`) |

Both Cloudflare Pages and Vercel generate a per-PR preview URL automatically
once the repo is connected — a separate "preview" subdomain is only needed if
you want a stable, non-PR-specific URL to share.

## Option A — Cloudflare Pages

1. Push this repository to GitHub (private first — see the README's license
   note and the implementation report's "remaining manual actions").
2. In the Cloudflare dashboard: **Workers & Pages → Create → Pages → Connect
   to Git**, select the repository.
3. Build settings:
   - Framework preset: **Astro**
   - Build command: `npm run build`
   - Build output directory: `dist`
   - Node version: 22 (set `NODE_VERSION=22` as an environment variable if
     Cloudflare's default differs)
4. `public/_headers` is picked up automatically by Cloudflare Pages and
   applies the security headers (CSP, HSTS, X-Frame-Options, etc.) to every
   response — no extra configuration needed.
5. Environment variables (Pages → Settings → Environment variables):
   - `PUBLIC_CONTACT_EMAIL` — optional. Leave unset until a real inbox for
     research/commercial inquiries is confirmed operational; the Contact
     section shows "available soon" copy until this is set (see the
     Privacy/Security instruction against fabricating contact addresses).
6. Custom domain: **Pages project → Custom domains → Set up a custom
   domain**, enter `orbseekr.jp`. Cloudflare issues the certificate
   automatically once DNS (below) resolves.
7. `www` → apex redirect: add `www.orbseekr.jp` as a second custom domain on
   the same Pages project, then add a Cloudflare **Redirect Rule** (or a
   Bulk Redirect) sending `www.orbseekr.jp/*` → `https://orbseekr.jp/$1`
   (301).

### DNS (Cloudflare-managed zone)

| Type  | Name  | Value                 | Proxy   |
| ----- | ----- | --------------------- | ------- |
| CNAME | `@`   | `<project>.pages.dev` | Proxied |
| CNAME | `www` | `<project>.pages.dev` | Proxied |

(Cloudflare allows a proxied `CNAME` at the zone apex; this is not standard
DNS but is a Cloudflare-specific feature — if the zone is NOT on Cloudflare,
use an `ALIAS`/`ANAME` record at the apex instead, per your DNS provider's
equivalent.)

## Option B — Vercel

1. Import the repository in the Vercel dashboard — it auto-detects Astro.
2. Build command: `npm run build`; Output directory: `dist`.
3. `vercel.json` in the repo root already defines the security headers and
   the `www` → apex redirect — no dashboard configuration needed for those.
4. Environment variables (Project → Settings → Environment Variables):
   `PUBLIC_CONTACT_EMAIL` (optional, same caveat as above).
5. Domains: **Project → Settings → Domains**, add `orbseekr.jp` and
   `www.orbseekr.jp` — Vercel's UI will show the exact DNS records to add for
   your registrar (either `A`/`ALIAS` at the apex plus `CNAME` for `www`, or
   nameserver delegation to Vercel, depending on the registrar).

## HTTPS

Both platforms provision and renew TLS certificates automatically once DNS
resolves. No manual certificate management is required.

## 404 / fallback

`src/pages/404.astro` is built to `dist/404.html`. Both Cloudflare Pages and
Vercel serve this automatically for unmatched paths on a static Astro site —
no platform configuration needed. There is no server-rendered 500 page
(nothing server-side runs), so a 5xx would only ever come from the CDN/host
itself, which each platform handles with its own status page.

## Security headers

Defined once and kept in sync in two files (only the file matching your
chosen platform is actually read at request time — keep both if you might
switch platforms later):

- `public/_headers` — Cloudflare Pages
- `vercel.json` — Vercel

Both set: `Content-Security-Policy`, `X-Content-Type-Options`,
`Referrer-Policy`, `Permissions-Policy`, `Strict-Transport-Security`,
`X-Frame-Options` (CSP also sets `frame-ancestors 'none'`, which supersedes
`X-Frame-Options` in modern browsers; both are set for older browser
coverage).

**Before going to production**, verify the CSP against the deployed site —
astro's per-component `<style>` tags require `style-src 'unsafe-inline'`
(already set), and any script added later must be added to `script-src`
explicitly rather than loosened to `'unsafe-inline'`.

## Production readiness checklist

- [ ] Repository pushed, initial review done, visibility decision made
      (private → public)
- [ ] Domain purchased/available, DNS zone accessible
- [ ] Platform project created and connected to the repository
- [ ] Custom domain + `www` redirect configured
- [ ] `PUBLIC_CONTACT_EMAIL` decided (set it, or knowingly ship the "available
      soon" fallback)
- [ ] CI green on `main` (lint, typecheck, unit, e2e, Lighthouse)
- [ ] Lighthouse CI run against the **real deployed URL** (not a local
      sandbox) confirms Performance/Accessibility/Best Practices/SEO ≥ 95
- [ ] Manual smoke test on the production URL: hero CTA → Marketplace, FAQ
      accordion, mobile nav, footer links

None of these steps should be executed without the maintainer's explicit
go-ahead at the time — this document is instructions, not a completed log.
