# Bundle size

Tooling that measures what a consumer app ships after its own Vite build. It is not a package: it is not in the root `workspaces`, Turbo or changesets, and is never published.

Why not measure `dist`? Packages are built unminified with vanilla-extract in `transform` mode, so the CSS only exists after a consumer's build. Each scenario is built with real Vite, `@vanilla-extract/vite-plugin` and minification against the built `packages/*/dist` (run `npm run build` first). `react` and `react-dom` are external.

## Usage

```sh
npm run build
npm run size                              # print the table
npm run size -- --json results.json       # also write JSON
npm run size:test                         # unit tests for the table logic
```

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
