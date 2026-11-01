# Bundle size

Tooling that measures what a consumer app ships after its own Vite build. It is not a package: it is not in the root `workspaces`, Turbo or changesets, and is never published.

Why not measure `dist`? Packages are built unminified with vanilla-extract in `transform` mode, so the CSS only exists after a consumer's build. Each scenario is built with real Vite, `@vanilla-extract/vite-plugin` and minification against the built `packages/*/dist` (run `npm run build` first). `react` and `react-dom` are external.

## Usage

```sh
npm run build
npm run size                              # print the table
npm run size -- --json results.json       # also write JSON
npm run size:test                         # unit tests
```

## Comparing two measurements

```sh
npm run size -- --json base.json          # on the base commit
npm run size -- --json head.json          # on the head commit
node bundle-size/compare.mjs base.json head.json > report.md
```

The report is markdown on stdout, ready to post as a PR comment. It starts with the hidden marker `<!-- bundle-size -->` (exported as `MARKER` from `compare.mjs`) so a workflow can find and update its previous comment. It has one table per scenario and JS/CSS with base, head, and the change in bytes and % for minified and gzipped. A gzipped row gets a warning sign only when it grows by more than 5% and more than 250 B; shrinking is never flagged. The command only reports: it exits 0 whatever the sizes (exit 2 only for missing arguments, non-zero if a file cannot be read).

## Scenarios

Entries live in `scenarios/`. The theme gets its own import in each, because `@blockle/blocks` does not re-export it.

- `baseline`: theme + reset, no components (fixed cost of using Blocks).
- `button`: baseline + `Button` (shows tree-shaking works).
- `everything`: baseline + `export * from '@blockle/blocks'` (upper bound).

## JSON shape

Sizes are bytes. `minified` is the size of the built output, `gzipped` its gzip size. JS and CSS are summed over all emitted `.js` / `.css` files of the scenario.

```json
{
  "baseline": {
    "js": { "minified": 4638, "gzipped": 1368 },
    "css": { "minified": 145607, "gzipped": 16915 }
  },
  "button": { "js": {}, "css": {} },
  "everything": { "js": {}, "css": {} }
}
```

Keys are scenario names, then `js` / `css`, each with `minified` and `gzipped` integers.

## CI

`.github/workflows/bundle-size.yml` runs on pull requests against `main`. In one job it measures the PR head, then the merge base (in a git worktree that uses the head's `bundle-size/` scripts, since the base may predate them), compares them, and posts the report with `actions/github-script` via `post-comment.mjs`, updating the previous comment found by the marker. A base that cannot be measured is reported as missing. Commenting failures (for example fork PRs, whose token is read-only) only log a warning; the report is also written to the job summary.
