export function formatBytes(bytes) {
  return bytes.toLocaleString('en-US');
}

/**
 * Format results (see README.md for the shape) as a plain-text table.
 */
export function formatTable(results) {
  const header = ['scenario', 'kind', 'minified', 'gzipped'];
  const rows = [];

  for (const [scenario, kinds] of Object.entries(results)) {
    for (const [kind, sizes] of Object.entries(kinds)) {
      rows.push([
        scenario,
        kind,
        formatBytes(sizes.minified),
        formatBytes(sizes.gzipped),
      ]);
    }
  }

  const widths = header.map((title, column) =>
    Math.max(title.length, ...rows.map((row) => row[column].length)),
  );

  const formatTableRow = (row) =>
    row
      .map((cell, column) =>
        column < 2
          ? cell.padEnd(widths[column])
          : cell.padStart(widths[column]),
      )
      .join('  ');

  return [
    formatTableRow(header),
    widths.map((width) => '-'.repeat(width)).join('  '),
    ...rows.map(formatTableRow),
  ].join('\n');
}
