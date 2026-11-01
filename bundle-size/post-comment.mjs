import { MARKER } from './compare.mjs';

const BOT_LOGIN = 'github-actions[bot]';

/**
 * Posts the report as a PR comment, updating the previous one (found by its
 * hidden marker, and written by the Actions bot so a quoted report is not
 * edited) when it exists. Never throws: fork PRs get a read-only token,
 * and commenting must not fail the job.
 */
export async function postReport({ github, context, core, body }) {
  const { owner, repo } = context.repo;
  const issue_number = context.issue.number;

  try {
    const comments = await github.paginate(github.rest.issues.listComments, {
      owner,
      repo,
      issue_number,
    });
    const previous = comments.find(
      (comment) =>
        comment.user?.login === BOT_LOGIN && comment.body?.includes(MARKER),
    );

    if (previous) {
      await github.rest.issues.updateComment({
        owner,
        repo,
        comment_id: previous.id,
        body,
      });
    } else {
      await github.rest.issues.createComment({
        owner,
        repo,
        issue_number,
        body,
      });
    }
  } catch (error) {
    core.warning(`Could not post the bundle size comment: ${error.message}`);
  }
}
