# search-graphql

VTEX IO app (`vtex.search-graphql`) that publishes the **GraphQL schema** for the Intelligent Search stack — the contract for catalog, banners, suggestions, autocomplete, productSearch, facets, correction, and product queries.

This repo is **schema-only** — there is no resolver code here. Resolvers live in [`vtex.search-resolver`](https://github.com/vtex-apps/search-resolver), and the backend HTTP wrapper lives in [`vtex.intelligent-search-api`](https://github.com/vtex/intelligent-search-api).

> See [`AGENTS.md`](AGENTS.md) for the full architectural walkthrough and rules of engagement.

---

## Prerequisites

- [Node.js](https://nodejs.org/) (any LTS — used only for `graphql-markdown` and `spectaql` doc generation)
- [Yarn](https://yarnpkg.com/) (v1)
- [VTEX Toolbelt](https://github.com/vtex/toolbelt): `npm i -g vtex`
- An active VTEX account and development workspace: `vtex login <account>`

## How to run

Install dependencies and refresh VTEX IO typings:

```sh
make dev
```

Link the app to your development workspace:

```sh
make link
# or equivalently: make run
```

Linking publishes the schema to the active VTEX account/workspace so consumers (`vtex.search-resolver`, storefronts) can pick it up.

## How to test

This repo has no tests. The schema is exercised by the resolver tests in `vtex.search-resolver` and by the Cypress suite (`vtex/search-tests`).

To validate a schema change without linking:

```sh
make lint
```

Pre-PR gate:

```sh
make check
```

## How to publish

> ⚠️ These commands affect production. Always confirm the target account/workspace first.

```sh
vtex publish        # publishes a new app package to the registry
vtex deploy         # promotes a release candidate to stable
```

Version bumps use `vtex release <patch|minor|major> stable`.

> **Breaking schema changes** must be coordinated with downstream consumers (`vtex.search-resolver` at minimum, plus any storefront app reading these queries). Field-level deprecation is preferred over removal.

## Documentation

- **Architecture and platform integration:** [`AGENTS.md`](AGENTS.md)
- **Domain glossary:** [`docs/glossary.md`](docs/glossary.md)
- **Data model:** [`docs/data-model.md`](docs/data-model.md) (points at `graphql/schema.graphql` as the authoritative model)
- **SDD model guide:** [`docs/sdd/model-guide.md`](docs/sdd/model-guide.md)
- **Specs (multi-repo aggregator):** `is-io-specs/.specify/` — constitution, plans, tasks live in the parent
- **Schema reference:** the authoritative model is in `graphql/schema.graphql` and the per-type files under `graphql/types/`
- **Changelog:** [`CHANGELOG.md`](CHANGELOG.md)
