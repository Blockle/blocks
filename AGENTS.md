## Agent skills

### Issue tracker

Tickets live in the Tandembike project `@blockle/blocks`, handled through the `tandembike` MCP tools. See `docs/agents/issue-tracker.md`.

### Triage labels

Use the five default labels: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`. See `docs/agents/triage-labels.md`.

### Domain docs

Use a single-context layout: root `GLOSSARY.md` and `docs/adr/`. See `docs/agents/domain.md`.

### Design system

When changing React components, styling, theming, or tokens, follow the project context in `docs/agents/design-system.md`.

## Code conventions

For TypeScript and TSX changes, follow the project-specific conventions in [docs/agents/code-conventions.md](docs/agents/code-conventions.md), especially its rules for control-flow braces and function spacing. Biome remains the source of truth for formatting and lint rules.
