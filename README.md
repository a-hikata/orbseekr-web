# orbseekr-web

The official website for **OrbSeekr** — an open-source project for making Earth
observation claims traceable, reviewable, and verifiable before publication.
The current site is a single Japanese-language landing page introducing the
first shipped product, [eo-claim-lint](https://github.com/a-hikata/eo-claim-lint).

## Purpose

This site exists to explain, in under three minutes, what OrbSeekr is and how
`eo-claim-lint` works — without overstating what is actually shipped. Content,
copy, and design decisions are governed by `OrbSeekr_Design_Book_v1.pptx`
(REV 1.0, 2026-07); see [Design Book compliance](#design-book-compliance)
below.

## Stack

- [Astro](https://astro.build) (static output) + TypeScript
- Vanilla CSS with custom properties as design tokens (no CSS framework)
- [`@fontsource`](https://fontsource.org) self-hosted IBM Plex Sans / IBM Plex
  Sans JP / IBM Plex Mono (subset-scoped imports only — see
  [Fonts](#fonts))
- [Lucide](https://lucide.dev) line icons, inlined at build time
  (`lucide-static`)
- ESLint + Prettier, Vitest (unit), Playwright (e2e), Lighthouse CI
- GitHub Actions for CI, security scanning, and Dependabot

No CMS, no server-side backend, no client-side framework, and no third-party
tracking. The only JavaScript shipped is the header's mobile-nav toggle, the
FAQ accordion (native `<details>`, no JS), and the tabbed code-sample viewer.

## Local setup

```bash
npm install
npm run dev
```

The dev server runs at `http://localhost:4321`.

## Build

```bash
npm run build      # outputs static site to ./dist/
npm run preview    # serve the production build locally
```

## Test

```bash
npm run typecheck   # astro check
npm run lint        # eslint
npm run format:check
npm run test:unit   # vitest — content/brand guardrails, CTA URLs, FAQ data, roadmap
npm run test:e2e    # playwright — desktop/tablet/mobile, header, hero, FAQ, footer, keyboard nav
```

`npm run test:e2e` needs Playwright's browsers installed once per machine:

```bash
npx playwright install chromium webkit
```

Lighthouse CI config lives in `lighthouserc.json` (`npx lhci autorun` after a
build). Local sandboxed runs of Lighthouse's simulated-throttling performance
score are noisy (CPU-contention-sensitive) — treat the CI run against a real
deployment as authoritative, not a laptop/sandbox run.

## Content update

Section copy lives in `src/content/ja/*.ts` as plain typed objects (one module
per landing-page section: `hero.ts`, `problem.ts`, `solution.ts`, ...). Update
copy there, not in the `.astro` section files — the `.astro` files under
`src/sections/` only lay out and style whatever the content module exports.

`src/content/en/` is a placeholder for a future English translation (see its
README) — do not add partial English copy without also wiring a `/en/` route.

Every factual claim in `src/content/ja/` (test counts, rule counts, license,
URLs) must be re-verified against the actual
[eo-claim-lint repository](https://github.com/a-hikata/eo-claim-lint) before
changing it — `tests/unit/content-guardrails.test.ts` and
`tests/unit/openSource.test.ts` encode the facts verified at the time this
site was built (Apache-2.0, v0.1.0, 776 tests passed / 1 skipped — verified
with a from-clean `python -m build` at the published commit, not just a raw
CI log — 10 rules, 0 runtime dependencies) and will fail if copy drifts from
what those tests assert. If the upstream project's real numbers change,
update both the content **and** the test expectations in the same change.

## Accessibility

Target: WCAG 2.2 AA, Lighthouse Accessibility ≥ 95 (currently 100 in local
Lighthouse runs). Notable choices:

- Skip link, visible focus rings, semantic landmarks, heading hierarchy
  (`h1` in the hero only, `h2` per section).
- The FAQ accordion uses native `<details>`/`<summary>` — keyboard support
  and screen-reader semantics come from the platform, not custom script.
- All icons are decorative (`aria-hidden`) and always paired with visible
  text — no icon carries meaning on its own (Design Book rule).
- `prefers-reduced-motion: reduce` disables every motion token, including the
  hero's ambient arc animation.
- Minimum 44px touch targets on interactive controls.

## Security

- No cookies, no client-side tracking, no third-party analytics.
- Static output only — no server-side attack surface beyond the CDN/host.
- Recommended response headers are defined in `public/_headers` (Cloudflare
  Pages) and `vercel.json` (Vercel) — see [Deployment](#deployment).
- `npm audit` and CodeQL run on every push via
  `.github/workflows/security.yml`; Dependabot is configured in
  `.github/dependabot.yml`.
- Report a vulnerability in this **website's** code via GitHub Security
  Advisories on this repository. Vulnerabilities in `eo-claim-lint` itself go
  to [its own security policy](https://github.com/a-hikata/eo-claim-lint/security),
  not here.

## Design Book compliance

Design tokens (`src/styles/tokens.css`) are a direct encoding of the Design
Book: 3 brand colors (Orbit Navy / Signal Blue / Verify Teal) plus Ink, an
8px-based spacing scale with no intermediate values, 6px/8px border radius
only, no shadows, and the five named motion tokens. Two colors have
"-text" variants (`--color-signal-blue-text`, `--color-verify-teal-text`) —
these are darkened copies of the same brand hue used only for text-on-white,
so paragraph/label text clears the Design Book's 7:1 contrast target; they
are not a 4th and 5th brand color. See `src/styles/tokens.css`'s file header
for the full rationale.

Before shipping a content or design change, re-run the Design Book's own
10-point review (R01–R10 in the Design Book, §26) against the changed
section.

## Deployment

Published to **GitHub Pages** by `.github/workflows/deploy.yml` on every push
to `main`.

|                     |                                              |
| ------------------- | -------------------------------------------- |
| Live (staging)      | <https://a-hikata.github.io/orbseekr-web/>   |
| Intended production | `https://www.orbseekr.jp` — not yet cut over |

The staging build is not indexable by design: `robots.txt` disallows crawling
and pages carry `noindex, nofollow`. Both flip automatically once `SITE_URL` is
set to the production origin.

The build's identity comes from two environment variables, so a build always
describes the host it is actually served from:

| Variable    | Staging                      | Production                |
| ----------- | ---------------------------- | ------------------------- |
| `SITE_URL`  | `https://a-hikata.github.io` | `https://www.orbseekr.jp` |
| `BASE_PATH` | `/orbseekr-web`              | `/`                       |

See [`docs/deployment.md`](docs/deployment.md) for the DNS cutover, what
GitHub Pages cannot do about response headers, and the Cloudflare Pages /
Vercel alternatives.

## License

Site code is under the [Apache License 2.0](LICENSE), the same licence as
`eo-claim-lint`.

The licence covers the code, not the identity. Apache-2.0 section 6 withholds
trademark rights, so the OrbSeekr name and logo, the Design Book brand system,
and the site copy are not licensed for reuse — see [NOTICE](NOTICE). Building a
different site from this code is fine; presenting something else as OrbSeekr is
not.
