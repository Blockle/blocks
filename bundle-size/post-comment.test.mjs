import { MARKER } from './compare.mjs';
import { postReport } from './post-comment.mjs';
import assert from 'node:assert/strict';
import { test } from 'node:test';

const context = { repo: { owner: 'o', repo: 'r' }, issue: { number: 7 } };

function fakeGithub({ comments = [], failWith } = {}) {
  const calls = [];
  const maybeFail = () => {
    if (failWith) {
      throw failWith;
    }
  };
  const listComments = Symbol('listComments');

  return {
    calls,
    paginate: async (fn, params) => {
      assert.equal(fn, listComments);
      calls.push(['list', params]);
      maybeFail();

      return comments;
    },
    rest: {
      issues: {
        listComments,
        createComment: async (params) => {
          calls.push(['create', params]);
          maybeFail();
        },
        updateComment: async (params) => {
          calls.push(['update', params]);
          maybeFail();
        },
      },
    },
  };
}

const core = () => {
  const warnings = [];

  return { warnings, warning: (message) => warnings.push(message) };
};

const body = `${MARKER}\n## Bundle size`;

test('creates a comment when none carries the marker', async () => {
  const github = fakeGithub({ comments: [{ id: 1, body: 'LGTM' }] });

  await postReport({ github, context, core: core(), body });

  assert.deepEqual(github.calls.at(-1), [
    'create',
    { owner: 'o', repo: 'r', issue_number: 7, body },
  ]);
});

test('updates the comment that carries the marker instead of adding another', async () => {
  const github = fakeGithub({
    comments: [
      { id: 1, body: 'LGTM' },
      {
        id: 2,
        body: `${MARKER}\nold report`,
        user: { login: 'github-actions[bot]' },
      },
    ],
  });

  await postReport({ github, context, core: core(), body });

  assert.deepEqual(github.calls.at(-1), [
    'update',
    { owner: 'o', repo: 'r', comment_id: 2, body },
  ]);
});

test('ignores a marker in a comment by someone else', async () => {
  const github = fakeGithub({
    comments: [
      { id: 3, body: `> ${MARKER}\n> quoted`, user: { login: 'someone' } },
    ],
  });

  await postReport({ github, context, core: core(), body });

  assert.deepEqual(github.calls.at(-1), [
    'create',
    { owner: 'o', repo: 'r', issue_number: 7, body },
  ]);
});

test('warns instead of throwing when commenting is not permitted', async () => {
  const github = fakeGithub({ failWith: new Error('Resource not accessible') });
  const c = core();

  await postReport({ github, context, core: c, body });

  assert.equal(c.warnings.length, 1);
  assert.match(c.warnings[0], /Resource not accessible/);
});
