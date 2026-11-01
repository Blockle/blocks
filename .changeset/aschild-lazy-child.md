---
'@blockle/blocks': patch
'@blockle/blocks-react-slot': patch
---

Render the child of an `asChild` component when it is a lazy element, such as a Server Component child that streams in later: it now renders with the merged props on the server and in the browser, so the markup matches on hydration, and suspends to the nearest `Suspense` while it is still pending. When `asChild` can't render its child, the development error now says whether there is no child, more than one, or a child that isn't an element.
