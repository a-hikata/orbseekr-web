import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = new URL('../../', import.meta.url);
const read = (path: string) => readFileSync(fileURLToPath(new URL(path, root)), 'utf8');

/**
 * A staging build was once published to the production domain. It answered 200,
 * so no status check noticed: the assets were addressed under the project
 * subpath and 404ed, the canonical named github.io, and robots said noindex.
 *
 * The build output itself is asserted by scripts/assert-production-build.mjs,
 * which runs in the deploy workflow. These tests guard the two decisions that
 * would put the wrong origin into that output in the first place.
 */
describe('deployment target', () => {
  const astroConfig = read('astro.config.mjs');
  const deployWorkflow = read('.github/workflows/deploy.yml');

  it('defaults to the production origin, so an unconfigured build is publishable', () => {
    expect(astroConfig).toMatch(/SITE_URL\s*=\s*process\.env\.SITE_URL\s*\?\?\s*'https:\/\/www\.orbseekr\.jp'/);
    expect(astroConfig).toMatch(/BASE_PATH\s*=\s*process\.env\.BASE_PATH\s*\?\?\s*'\/'/);
  });

  it('does not let the deploy workflow override the origin into a staging build', () => {
    const assignments = [...deployWorkflow.matchAll(/^\s*(SITE_URL|BASE_PATH):\s*(.+)$/gm)];
    expect(assignments.map((m) => `${m[1]}: ${m[2].trim()}`)).toEqual([]);
  });

  it('gates the deploy on the built artifact, not only on the config', () => {
    expect(deployWorkflow).toContain('scripts/assert-production-build.mjs');
  });

  it('keeps staging reachable, but only by explicit override', () => {
    // Overriding the two variables is still supported for local preview; the
    // point is that it takes a deliberate act rather than being the default.
    expect(astroConfig).toContain('process.env.SITE_URL');
    expect(astroConfig).toContain('process.env.BASE_PATH');
  });
});
