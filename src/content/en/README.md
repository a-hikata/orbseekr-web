# English content (future)

This directory mirrors `src/content/ja/` and is intentionally left as a
structural placeholder in the initial release. When an English translation is
commissioned, add the same module names here (`hero.ts`, `problem.ts`,
`solution.ts`, ...) with the same exported shape, then wire a `/en/` route
that imports from this directory instead of `src/content/ja/`.

Do not add partial/inconsistent English copy — ship the full set or none.
