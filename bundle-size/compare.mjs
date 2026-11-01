import { readFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

export const MARKER = '<!-- bundle-size -->';

const MAX_GROWTH_RATIO = 0.05;
const MAX_GROWTH_BYTES = 250;

const KINDS = [
  ['js', 'JS'],
  ['css', 'CSS'],
];

const METRICS = [
  ['minified', 'Minified'],
  ['gzipped', 'Gzipped'],
];

/** True when a gzipped size grows by more than 5% and more than 250 B. */
export function isRegression(base, head) {
  const growth = head - base;

  return growth > MAX_GROWTH_BYTES && growth > base * MAX_GROWTH_RATIO;
}

const KILOBYTE = 1000;

const kilobytes = new Intl.NumberFormat('en-US', {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

/** Formats a byte count as `B` below 1 kB and as `kB` (1,000 bytes) above. */
export function formatSize(bytes) {
  if (Math.abs(bytes) < KILOBYTE) {
    return `${bytes} B`;
  }

  return `${kilobytes.format(bytes / KILOBYTE)} kB`;
}

function withSign(value, text) {
  return value > 0 ? `+${text}` : text;
}

function formatComparisonRow(label, base, head, flagged) {
  if (base === undefined || head === undefined) {
    const cell = (value) => (value === undefined ? '-' : formatSize(value));

    return `| ${label} | ${cell(base)} | ${cell(head)} | - | - | |`;
  }

  const delta = head - base;
  const bytes = withSign(delta, formatSize(delta));
  const percent =
    base === 0 ? '-' : withSign(delta, `${((delta / base) * 100).toFixed(1)}%`);

  return `| ${label} | ${formatSize(base)} | ${formatSize(head)} | ${bytes} | ${percent} | ${flagged ? '⚠️' : ''} |`;
}

/** Builds the markdown report comparing a base and a head measurement. */
export function compareReport(base, head) {
  const names = [...new Set([...Object.keys(base), ...Object.keys(head)])];
  const sections = [];

  for (const name of names) {
    for (const [kind, kindLabel] of KINDS) {
      const rows = METRICS.map(([metric, label]) => {
        const before = base[name]?.[kind]?.[metric];
        const after = head[name]?.[kind]?.[metric];
        const flagged =
          metric === 'gzipped' &&
          before !== undefined &&
          after !== undefined &&
          isRegression(before, after);

        return formatComparisonRow(label, before, after, flagged);
      });

      sections.push(
        [
          `### ${name} ${kindLabel}`,
          '',
          '| Size | Base | Head | Change | Change % | |',
          '| --- | ---: | ---: | ---: | ---: | --- |',
          ...rows,
        ].join('\n'),
      );
    }
  }

  const note =
    'Gzipped rows flagged with a warning sign grew by more than 5% and more than 250 B. This check only reports and never fails.';

  const baseNote =
    Object.keys(base).length === 0
      ? 'The base measurement was unavailable, so there is nothing to compare the head against.'
      : undefined;
  const parts = [MARKER, '## Bundle size', baseNote, ...sections, note];

  return `${parts.filter(Boolean).join('\n\n')}\n`;
}

function main(args) {
  const [basePath, headPath] = args;

  if (!basePath || !headPath) {
    console.error(
      'Usage: node bundle-size/compare.mjs <base.json> <head.json>',
    );
    process.exitCode = 2;

    return;
  }

  const base = JSON.parse(readFileSync(basePath, 'utf8'));
  const head = JSON.parse(readFileSync(headPath, 'utf8'));

  process.stdout.write(compareReport(base, head));
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main(process.argv.slice(2));
}
