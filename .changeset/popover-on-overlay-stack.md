---
'@blockle/blocks': patch
'@blockle/blocks-react': patch
---

An Escape with a `Menu`, `Tooltip` or other `Popover` open in a `Dialog` or `Drawer` closes only the `Popover`, and a `Menu` focuses its trigger again; the next Escape requests to close the `Dialog` or `Drawer`. A click outside closes only the `Popover` as well. A `Popover` under a `Dialog` or `Drawer` that opened after it leaves Escape and clicks outside to that `Dialog` or `Drawer`.
