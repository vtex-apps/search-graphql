<!-- managed-by: golden-path v1 -->
# AGENTS.md — search-graphql

## Repository Purpose

`vtex.search-graphql` is a VTEX IO app whose only deliverable is the **GraphQL schema contract** for the Intelligent Search stack. It publishes catalog, banner, suggestion, autocomplete, productSearch, facets, correction, and product queries to the storefront — but contains no resolver code, no runtime, and no tests.

> **Schema-only repo.** Resolvers live in [`vtex.search-resolver`](https://github.com/vtex-apps/search-resolver). The IS backend client lives in [`vtex.intelligent-search-api`](https://github.com/vtex/intelligent-search-api).

## Where it sits in the IS topology

| App | Role |
|---|---|
| **`vtex.search-graphql`** (this repo) | App-owned GraphQL **schema** (the contract) |
| `vtex.search-resolver` | GraphQL **resolvers** that implement this schema |
| `vtex.intelligent-search-api` | Backend HTTP wrapper around the IS platform service |
| `vtex.search-result` | Store Framework PLP consuming the GraphQL surface |
| `vtex.delivery-promise-components` | Storefront blocks |

## Sources of Truth

| File | What it defines |
|---|---|
| `manifest.json` | App identity (`vtex.search-graphql@0.69.4`), builders (`graphql`, `docs`), dependencies (`vtex.messages`, `vtex.catalog-api-proxy`), policies (`vtex.messages:translate-messages`, `vtex.catalog-api-proxy:catalog-proxy`, `vbase-read-write`, `colossus-fire-event`) |
| `graphql/schema.graphql` | The **root `Query` schema** — every public catalog/search query lives here |
| `graphql/directives.graphql` | Custom directives: `@cacheControl(scope, maxAge)`, `@withSegment` |
| `graphql/types/*.graphql` | One file per domain area: `Product`, `ProductSearch`, `Facets`, `Banners`, `Autocomplete`, `SearchSuggestions`, `Suggestions`, `Correction`, `Brand`, `Category`, `Benefits`, `ItemMetadata`, `Advertisement`, `PageType`, `SearchURLStats` |
| `node/package.json` | **Placeholder only** — the `graphql` builder uses it to emit TypeScript typings consumed by `vtex.search-resolver`. Comment in the file: *"Don't delete this file, it's necessary to generate the TypeScript types of the GraphQL"* |
| `lint.sh` | Linter wrapper: `cd node/ && yarn --frozen-lockfile && yarn lint`. `node/package.json` only defines a placeholder `lint` script that prints a notice and exits 0 — the repo is schema-only so there is no executable code to lint today. |
| `package.json` | Doc-tooling only: `graphql-markdown`, `@graphql-tools/load-files`, `@graphql-tools/merge`, `graphql@15` |
| `spectaql-config.yml` | Spectaql renderer config (Markdown → HTML) — note `servers: https://{{accountname}}.myvtex.com/_v/public/graphql/v1`. Currently no in-repo generator wires this up; treat it as a hand-run reference. |
| `spectaql-documentation/` | Spectaql template overrides |
| `policies.json` | Per-account policy declarations (parallel to `manifest.json` policies) |
| `CHANGELOG.md` | Per-release changelog |
| `CODEOWNERS` | `* @vtex-apps/search-engagement-team @vtex-apps/intelligent-search-apps` |

## Architecture

This repo has **no runtime**. At publish time, the VTEX IO `graphql` builder:

1. Loads `graphql/schema.graphql` + `graphql/types/*.graphql` + `graphql/directives.graphql`.
2. Validates them against `graphql@15`.
3. Generates TypeScript typings.
4. Packages the schema into the published app.

At runtime, on every storefront, `vtex.search-resolver` (which lists `vtex.search-graphql` as a dependency) imports the schema via `import schema from 'vtex.search-graphql/graphql'` and registers its resolvers + schema directives against it.

There is no Node service, no Jest config, no test files, and no `.github/workflows/` (a minimal lint workflow has been added by golden-path).

## Schema contract rules

- **Every `Query` field uses `@cacheControl` + `@withSegment`** (unless trivially public). Removing or changing these breaks shopper isolation and CDN behavior.
- **Field-level deprecation** (`@deprecated(reason: "...")`) is preferred over field removal. Removal requires a major version bump + downstream PRs.
- **Required argument additions** are breaking — they fail existing storefront queries. Always make new arguments optional and provide a default.
- **Type renames** are breaking — they fail the platform validator on link/publish.
- **`SelectedFacetInput`** is the canonical filter input shape across the schema. Adding new facet semantics should extend this rather than introduce parallel inputs.

## Verified Commands

```sh
make dev           # yarn install (root) + vtex setup
make lint          # bash lint.sh (cd node && yarn lint — no-op script today)
make test          # no-op for schema-only repo
make check         # lint
make link          # vtex link (publishes schema to active VTEX workspace)
make run           # alias for make link
```

> The repo also has an old `lint.sh` shell wrapper at the root. Prefer `make lint` for parity with other apps in the stack.

## Expected Skills

- `vtex-io-cli` · `vtex-io-app-structure` · `vtex-io-graphql-api`
- `specification` + `implementing` (vtex-agent-skills) for SDD Lite
- For SDD Full work (breaking schema changes), use the spec-kit pipeline against the parent Specs repo

## Expected MCPs

- **GitHub MCP** — cross-repo references (especially `vtex.search-resolver` to verify the resolver-side impact, and any private storefront repos that consume the schema), issues, PRs.
- **Atlassian MCP** — Jira/Confluence context.

## Multi-repo Specs

Part of the **`is-io-specs`** multi-repo workspace. SpecKit artifacts live at the parent aggregator (`is-io-specs/.specify/`, `is-io-specs/specs/`). This repo intentionally has no local `.specify/`. See the [Multi-repo spec-kit extension](https://github.com/vtex/speckit-multi-repo).

## Autonomy Limits

### Toolbelt and platform
- **Never** run `vtex link`, `vtex publish`, `vtex deploy`, or any workspace-changing Toolbelt command without explicit confirmation.
- **Never** modify `manifest.json` `version` directly — use `vtex release <patch|minor|major> stable`.
- Treat the published schema as a **public API** — every account that has `vtex.search-graphql` installed sees the same schema.

### Schema contract
- **Never** remove a field, type, or directive without:
  1. Coordinated PRs in `vtex.search-resolver` (and any private storefront consumer) marked WIP.
  2. A deprecation cycle (`@deprecated(reason: "...")`) of at least one minor version.
  3. A major version bump (`vtex release major stable`).
- **Never** add a required argument to an existing field — make it optional with a sensible default.
- **Never** change the semantics of `@cacheControl` or `@withSegment` directives here — they are implemented in `vtex.search-resolver/node/directives/`. The schema declaration must match the implementation.
- **Schema additions** (new optional fields, new types, new enum values) are safe — proceed under SDD Lite.

### Documentation
- The authoritative schema lives in `graphql/schema.graphql` and `graphql/types/*.graphql` — that is the source of truth for consumers (storefront apps, `vtex.search-resolver`).
- `docs/README.md` is a **static** human-readable schema reference (no longer auto-generated; the `utils/generateDoc.js` script that produced it cannot run outside VTEX IO platform context).
- `spectaql-config.yml` and `spectaql-documentation/` are reference assets for rendering the schema to HTML; no in-repo generator wires them up today.

### Tooling / build
- The `node/package.json` placeholder must not be deleted — the `graphql` builder relies on it for typings emission. Comment in the file says so.
- `lint.sh` currently calls `cd node && yarn lint`, but `node/package.json` has **no `lint` script defined**. If you adopt golden-path's `make lint`, verify the script exists; otherwise the lint step is a no-op.
