/* eslint-disable no-undef */
/* eslint-disable unicorn/prefer-module */
/**
 * This script is used to add the 'use client' pragma to the top of the dist/index.mjs file.
 * For consumers of next js ssr apps.
 */
const fs = require('node:fs');
const { Buffer } = require('node:buffer');

const targetFile = './dist/index.mjs';

const data = fs.readFileSync(targetFile);
const fd = fs.openSync(targetFile, 'w+');
const insert = Buffer.from("'use client';\n\n");
fs.writeSync(fd, insert, 0, insert.length, 0);
fs.writeSync(fd, data, 0, data.length, insert.length);
fs.close(fd, (err) => {
  if (err) throw err;
});
