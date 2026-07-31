# Deployment guide

Static output (`npm run build` → `dist/`). No server runtime is required.

## Current state

**Adopted host: GitHub Pages.** The site is built and published by
`.github/workflows/deploy.yml` on every push to `main`.

|                     |                                                  |
| ------------------- | ------------------------------------------------ |
| Live (staging)      | <https://a-hikata.github.io/orbseekr-web/>       |
| Intended production | `https://www.orbseekr.jp` — **not yet cut over** |

The staging build is deliberately not indexable: `robots.txt` disallows
crawling and every page carries `noindex, nofollow`. Both flip automatically
once the build runs against the production origin.

### Why GitHub Pages rather than Cloudflare Pages

Cloudflare Pages is the better host on the merits — it applies `public/_headers`,
serves from the domain root, and can express the apex/www redirect as a rule.
GitHub Pages was adopted anyway, for one reason that outweighs those: **DNS for
`orbseekr.jp` lives at GMO/お名前.com and carries records this project does not
own.** Cloudflare Pages wants the zone on Cloudflare nameservers, which would
migrate _every_ record — mail included — to make a marketing page load. GitHub
Pages needs one `CNAME` on `www` and touches nothing else.

The cost of that choice is real and is recorded below.

### What GitHub Pages cannot do

`public/_headers` is inert here — GitHub Pages serves no custom response
headers. Measured on the live site:

| Header                                                            | Status                                                                |
| ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| `Strict-Transport-Security`                                       | present (`max-age=31556952`), supplied by GitHub                      |
| `Content-Security-Policy`                                         | **absent** as a header; a reduced policy ships as `<meta http-equiv>` |
| `Referrer-Policy`                                                 | **absent** as a header; ships as `<meta name="referrer">`             |
| `X-Frame-Options`, `X-Content-Type-Options`, `Permissions-Policy` | **absent**, header-only, no meta equivalent                           |
| `Cache-Control`                                                   | fixed at `max-age=600`; not configurable                              |

This is acceptable for a static page with no forms, cookies, authentication, or
third-party embeds. **Move to Cloudflare Pages when any of those appear** — that
is the trigger, not a date.

## Cutting over to www.orbseekr.jp

`www.orbseekr.jp` currently serves an unrelated default WordPress install on
お名前.com shared hosting. Cutting over replaces it. Three steps, in order:

1. **DNS** — at the GMO / お名前.com control panel, point `www` at Pages:

   | Type  | Name  | Value                 |
   | ----- | ----- | --------------------- |
   | CNAME | `www` | `a-hikata.github.io.` |

   Leave the apex `A` record alone until step 3, so the old site keeps
   answering while the certificate is issued.

2. **Custom domain** — repository → Settings → Pages → Custom domain →
   `www.orbseekr.jp` → Save, then wait for the check to pass and tick
   **Enforce HTTPS**. GitHub writes a `CNAME` file to the repository root.

3. **Build for production** — in `.github/workflows/deploy.yml` set:

   ```yaml
   env:
     SITE_URL: https://www.orbseekr.jp
     BASE_PATH: /
   ```

   Push. Canonical URLs, `og:image`, the sitemap, and `robots.txt` follow
   automatically, and the `noindex` comes off.

4. **Apex** — decide whether `orbseekr.jp` should redirect to `www` (it does
   today, via the WordPress host). GitHub Pages can serve the apex through
   `A` records to `185.199.108–111.153`, but it cannot issue a redirect
   between the two; that has to happen at the DNS or hosting layer.

Note that `vercel.json` still redirects `www` → apex, the opposite of the
direction adopted here. It is unused on GitHub Pages; reconcile it before
deploying to Vercel.

---

The two options below are kept for reference. **Neither has been executed.**

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
