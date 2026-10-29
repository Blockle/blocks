---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

Toast Auto-dismiss now pauses while any toast is hovered or focused, or the page is hidden, and then continues with the time left. A toast added while paused starts its countdown once the stack resumes. Window blur alone doesn't pause.

Showing a toast again with the same `id` now replaces its countdown: it runs the new `duration`, or stays until closed when there is none. Before, the first timer kept running and removed the updated toast. Closing a toast or unmounting `ToastProvider` now clears its pending timer.

Leave out `duration` for a toast that contains an action, such as an "Undo" button.
