import { compareReport, isRegression, MARKER } from './compare.mjs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const sizes = (minified, gzipped) => ({ minified, gzipped });

const measurement = (js, css = sizes(1000, 400)) => ({
  baseline: { js, css },
});

test('isRegression flags growth over both 5% and 250 B', () => {
  assert.equal(isRegression(10000, 10600), true);
});

test('isRegression ignores growth over 5% but within 250 B', () => {
  assert.equal(isRegression(1000, 1200), false);
  assert.equal(isRegression(1000, 1250), false);
});

test('isRegression ignores growth over 250 B but within 5%', () => {
  assert.equal(isRegression(100000, 100300), false);
  assert.equal(isRegression(10000, 10500), false);
});

test('isRegression never flags shrinking or unchanged sizes', () => {
  assert.equal(isRegression(10000, 5000), false);
  assert.equal(isRegression(10000, 10000), false);
});

test('isRegression flags growth from nothing once past 250 B', () => {
  assert.equal(isRegression(0, 251), true);
  assert.equal(isRegression(0, 250), false);
  assert.equal(isRegression(0, 0), false);
});

test('compareReport starts with the hidden marker', () => {
  const report = compareReport(
    measurement(sizes(1, 1)),
    measurement(sizes(1, 1)),
  );

  assert.equal(MARKER, '<!-- bundle-size -->');
  assert.ok(report.startsWith('<!-- bundle-size -->\n'));
});

test('compareReport prints a table per scenario and kind with deltas', () => {
  const report = compareReport(
    measurement(sizes(10000, 4000)),
    measurement(sizes(10500, 3800)),
  );

  assert.ok(report.includes('### baseline JS'));
  assert.ok(report.includes('### baseline CSS'));
  assert.ok(report.includes('| Size | Base | Head | Change | Change % |'));
  assert.ok(report.includes('| Minified | 10,000 | 10,500 | +500 | +5.0% |'));
  assert.ok(report.includes('| Gzipped | 4,000 | 3,800 | -200 | -5.0% |'));
});

test('compareReport marks only the gzipped row of a regression', () => {
  const report = compareReport(
    measurement(sizes(10000, 4000)),
    measurement(sizes(12000, 4400)),
  );

  assert.ok(report.includes('| Gzipped | 4,000 | 4,400 | +400 | +10.0% | ⚠️ |'));
  assert.equal(report.split('⚠️').length - 1, 1);
});

test('compareReport does not mark shrinking or unchanged rows', () => {
  const report = compareReport(
    measurement(sizes(10000, 4000), sizes(500, 200)),
    measurement(sizes(5000, 2000), sizes(500, 200)),
  );

  assert.ok(!report.includes('⚠️'));
});

test('compareReport says so when the base measurement is unavailable', () => {
  const report = compareReport({}, measurement(sizes(100, 50)));

  assert.ok(report.includes('The base measurement was unavailable'));
});

test('compareReport stays quiet about the base when it was measured', () => {
  const report = compareReport(
    measurement(sizes(100, 50)),
    measurement(sizes(100, 50)),
  );

  assert.ok(!report.includes('unavailable'));
});

test('compareReport handles a scenario missing from base', () => {
  const report = compareReport({}, measurement(sizes(100, 50)));

  assert.ok(report.includes('### baseline JS'));
  assert.ok(report.includes('| Gzipped | - | 50 | - | - |'));
});
