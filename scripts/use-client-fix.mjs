/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/**
 * This script is used to add the 'use client' pragma to the top of the dist/index.mjs file.
 * For consumers of next js ssr apps.
 */
import { Buffer } from 'node:buffer';
import fs from 'node:fs';

// const targetFiles = ['./dist/index.mjs'];
const targetFiles = [
  './dist/components/form/Slider/Slider.mjs',
  './dist/components/form/Switch/Switch.mjs',
  './dist/components/other/BlocksProvider/BlocksProvider.mjs',
  './dist/components/other/BlocksProvider/context.mjs',
  './dist/components/overlay/Dialog/Dialog.mjs',
  './dist/components/overlay/Tooltip/Tooltip.mjs',
  './dist/hooks/useIsomorphicLayoutEffect/useIsomorphicLayoutEffect.mjs',
  './dist/hooks/useKeyboard/useKeyboard.mjs',
];

targetFiles.forEach((targetFile) => {
  const data = fs.readFileSync(targetFile);
  const fd = fs.openSync(targetFile, 'w+');
  const insert = Buffer.from("'use client';\n\n");
  fs.writeSync(fd, insert, 0, insert.length, 0);
  fs.writeSync(fd, data, 0, data.length, insert.length);
  fs.close(fd, (err) => {
    if (err) throw err;
  });
});
