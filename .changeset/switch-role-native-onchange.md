---
'@blockle/blocks': minor
'@blockle/blocks-react': minor
---

`Switch` now has `role="switch"`, so assistive technology and `getByRole('switch', { name })` see a switch instead of a checkbox. Its checked state comes from the native `checked`.

`Switch`'s `onChange` is now the native input change handler (`React.ChangeEventHandler<HTMLInputElement>`), like the other form controls. Clicking the track, clicking an associated label and pressing Space each call it exactly once, also under `React.StrictMode`. A controlled `Switch` (`checked` + `onChange`) now only changes when its `checked` prop does.

**Migration:** read the new value from the event:

```diff
- <Switch checked={show} onChange={setShow} />
+ <Switch checked={show} onChange={(event) => setShow(event.target.checked)} />
```

Tests that queried the `checkbox` role should query `switch` instead.
