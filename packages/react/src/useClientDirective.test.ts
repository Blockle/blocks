import ts from 'typescript';
import { describe, expect, it } from 'vitest';

import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';

// A module that calls or defines a hook, or calls createContext, must start
// with 'use client'. See docs/agents/code-conventions.md.

const srcDir = resolve(__dirname);
const distDir = resolve(__dirname, '../dist');

const hookName = /^use[A-Z]/;

function getCalleeName(expression: ts.Expression) {
  if (ts.isIdentifier(expression)) {
    return expression.text;
  }

  if (ts.isPropertyAccessExpression(expression)) {
    return expression.name.text;
  }

  return undefined;
}

function getDeclaredFunctionName(node: ts.Node) {
  if (ts.isFunctionDeclaration(node)) {
    return node.name?.text;
  }

  if (
    ts.isVariableDeclaration(node) &&
    ts.isIdentifier(node.name) &&
    node.initializer &&
    (ts.isArrowFunction(node.initializer) ||
      ts.isFunctionExpression(node.initializer))
  ) {
    return node.name.text;
  }

  return undefined;
}

function parse(fileName: string, code: string) {
  return ts.createSourceFile(
    fileName,
    code,
    ts.ScriptTarget.Latest,
    false,
    ts.ScriptKind.TSX,
  );
}

function needsUseClient(fileName: string, code: string) {
  let found = false;

  function visit(node: ts.Node) {
    if (found) {
      return;
    }

    if (ts.isCallExpression(node)) {
      const name = getCalleeName(node.expression);

      if (name && (hookName.test(name) || name === 'createContext')) {
        found = true;

        return;
      }
    }

    const declared = getDeclaredFunctionName(node);

    if (declared && hookName.test(declared)) {
      found = true;

      return;
    }

    ts.forEachChild(node, visit);
  }

  visit(parse(fileName, code));

  return found;
}

function hasUseClient(fileName: string, code: string) {
  const [first] = parse(fileName, code).statements;

  return (
    first !== undefined &&
    ts.isExpressionStatement(first) &&
    ts.isStringLiteral(first.expression) &&
    first.expression.text === 'use client'
  );
}

function listFiles(dir: string, pattern: RegExp) {
  return readdirSync(dir, { recursive: true, encoding: 'utf8' })
    .filter((file) => pattern.test(file))
    .map((file) => join(dir, file));
}

function isSourceModule(file: string) {
  const path = relative(srcDir, file);

  return !/\.(test|stories)\.tsx?$/.test(path) && !path.startsWith('testUtils');
}

function findSourceFor(distFile: string) {
  const base = join(srcDir, relative(distDir, distFile)).replace(/\.js$/, '');

  return [`${base}.tsx`, `${base}.ts`].find((file) => existsSync(file));
}

describe('needsUseClient', () => {
  it('flags a hook call', () => {
    expect(
      needsUseClient('a.tsx', 'const a = useState<string | null>(null);'),
    ).toBe(true);
  });

  it('flags a hook definition', () => {
    expect(
      needsUseClient('a.ts', 'export function useThing() { return 1; }'),
    ).toBe(true);
    expect(needsUseClient('a.ts', 'export const useThing = () => 1;')).toBe(
      true,
    );
  });

  it('flags a createContext call', () => {
    expect(
      needsUseClient('a.ts', 'export const ctx = React.createContext(null);'),
    ).toBe(true);
  });

  it('ignores hooks that are only imported, typed or mentioned in comments', () => {
    const code = [
      "import { useTheme } from './useTheme';",
      '// call useTheme() here',
      'type UseThing = typeof useTheme;',
      "export const label = 'useTheme()';",
    ].join('\n');

    expect(needsUseClient('a.ts', code)).toBe(false);
  });
});

describe('hasUseClient', () => {
  it('accepts a leading directive', () => {
    expect(hasUseClient('a.ts', "'use client';\nimport a from 'a';")).toBe(
      true,
    );
    expect(hasUseClient('a.js', '"use client";\nimport a from "a";')).toBe(
      true,
    );
  });

  it('rejects a directive after an import', () => {
    expect(hasUseClient('a.ts', "import a from 'a';\n'use client';")).toBe(
      false,
    );
  });
});

describe("'use client' directive", () => {
  it('starts every source module that calls or defines a hook, or calls createContext', () => {
    const missing = listFiles(srcDir, /\.tsx?$/)
      .filter(isSourceModule)
      .filter((file) => {
        const code = readFileSync(file, 'utf8');

        return needsUseClient(file, code) && !hasUseClient(file, code);
      })
      .map((file) => relative(srcDir, file));

    expect(
      missing,
      "These modules need 'use client' as their first statement",
    ).toEqual([]);
  });

  it.skipIf(!existsSync(distDir))(
    'starts every built module whose source needs it (skipped without dist, run npm run build)',
    () => {
      const checked: string[] = [];
      const missing: string[] = [];

      for (const file of listFiles(distDir, /\.js$/)) {
        const source = findSourceFor(file);

        if (!source || !needsUseClient(source, readFileSync(source, 'utf8'))) {
          continue;
        }

        checked.push(file);

        if (!hasUseClient(file, readFileSync(file, 'utf8'))) {
          missing.push(relative(distDir, file));
        }
      }

      expect(
        checked.length,
        'no built module was matched to its source',
      ).toBeGreaterThan(0);
      expect(
        missing,
        'These built modules lost their leading "use client"',
      ).toEqual([]);
    },
  );
});
