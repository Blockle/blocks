# Issue tracker: Tandembike

Issues and specs for this repo live as Tickets in the Tandembike project **@blockle/blocks**; pass it as `projectName` wherever a tool takes a Project. Use the `tandembike` MCP tools for every operation, not `gh issue`, even where a skill describes another tracker; never call the database or write requests by hand. Refer to Tickets as `T<number>`; `#<number>` is a GitHub PR.

## Conventions

- **Create a ticket**: `create_ticket` with `projectName: "@blockle/blocks"`. Put acceptance criteria in the `acceptanceCriteria` field, never as a checklist in the description.
- **Create several related tickets**: `create_tickets`, listed in dependency order, with `blockedByPositions` for blockers.
- **Read a ticket**: `get_ticket`, plus `list_comments` for discussion.
- **List tickets**: `list_tickets` filtered by `status`, labels, `blocked`, `claimed`, `cycleId`.
- **Parent/child**: create an Epic (`type: "Epic"`) and attach children with `epicNumber` or `attach_to_epic`.
- **Comment**: `add_comment`. Share progress and findings as comments; don't rewrite the description.
- **Apply / remove labels**: `add_ticket_labels` / `remove_ticket_labels`. Reuse labels from `list_labels`.
- **Status**: move to In progress when starting and Done when finished (`update_ticket`).
- **Close as won't-do**: label `wontfix`, comment why, then `archive_ticket`.

## Specs and cycles

- **A spec is an Epic** titled `Spec: <name>`. The tickets split from it are its children (`epicNumber`).
- **The Epic is the source of truth for its tickets.** Where a ticket or its acceptance criteria say less than a spec line, build the spec line and comment on the ticket saying so.
- **Plan new tickets into the Active cycle** when one exists, the Epic included: find it with `list_cycles` (`projectName: "@blockle/blocks"`), then `plan_tickets`.

## Pull requests as a triage surface

**PRs as a request surface: no.** _(Set to `yes` if this repo treats external PRs as feature requests; `/triage` reads this flag.)_

## When a skill says "publish to the issue tracker"

Create a Tandembike ticket in @blockle/blocks.

## When a skill says "fetch the relevant ticket"

Use `get_ticket` and `list_comments`.

## Wayfinding operations

Used by `/wayfinder`. The **map** is a single Epic with **child** tickets.

- **Map**: an Epic labelled `wayfinder:map`, holding Notes / Decisions-so-far / Fog in its description.
- **Child ticket**: a child of that Epic, labelled `wayfinder:<type>` (`research`/`prototype`/`grilling`/`task`).
- **Blocking**: `add_blocker`. A blocker is resolved once it's Done or archived.
- **Frontier query**: `list_tickets` with `status: "Todo"`, `blocked: false`, `claimed: false`, scoped to the Epic's children; first in order wins.
- **Claim**: `claim_ticket` with a unique agent-run ID, as the session's first write.
- **Resolve**: `add_comment` with the answer, move to Done, and append a pointer to the map's Decisions-so-far.
