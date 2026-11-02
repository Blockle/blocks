# Dialog, Drawer and Popover share one overlay stack, and only its top overlay handles Escape and clicks outside

Dialog, Drawer and Popover (with the Menu and Tooltip built on it) are all on one Overlay stack: the open overlays in the order they opened, wherever they are mounted, with the one opened last on top. Only the top overlay handles Escape and clicks outside. Before this, only Dialog and Drawer were on the stack (T675). An Escape in a Menu inside a Drawer bubbled through React to the Drawer's keydown handler first, because Popover listens for Escape on `document`, and that listener runs after React's root listener. The Drawer prevented the Escape and requested to close, and the Popover then took the prevented Escape as claimed by its content and stayed open.

## Considered Options

- **Have Popover claim Escape in the capture phase**: rejected. It would win here only because of where React and the Popover attach their listeners. A Popover opened under a Dialog would still take an Escape meant for the Dialog, and content inside the Popover could no longer claim an Escape before it.
- **Have Dialog and Drawer skip an Escape whose target is inside a Popover**: rejected. Focus often stays on a Popover's anchor, as with a Tooltip, so the target doesn't say which overlay is on top.

## Consequences

- An Escape or a click outside goes to the top overlay. With a Menu or Tooltip open in a Dialog or Drawer, it closes the Menu or Tooltip, and the next one goes to the Dialog or Drawer. A Popover under a Dialog that opened after it ignores both.
- A Tooltip that opens while a Dialog or Drawer is on top is now on top itself, so while it shows, a click outside closes the Tooltip, not the Dialog or Drawer.
- Being on the stack doesn't make a Popover modal: it doesn't lock the body's scroll, restore focus or show a backdrop.
- Content can still claim an Escape with `preventDefault()` or `stopPropagation()`, in a Popover as in a Dialog.
- The stack is internal. A future overlay, such as a Select's listbox, joins it to get the same behaviour.
