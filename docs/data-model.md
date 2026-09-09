<!-- managed-by: golden-path v1 -->
# Data Model

`vtex.search-graphql` owns no runtime data — it owns the **GraphQL schema contract** for the search domain. The authoritative model is the schema itself:

- **Root schema:** [`graphql/schema.graphql`](../graphql/schema.graphql) — the `Query` root and shared scalars/enums (`SORT`).
- **Directives:** [`graphql/directives.graphql`](../graphql/directives.graphql) — `@cacheControl`, `@withSegment`.
- **Type modules:** [`graphql/types/`](../graphql/types/)

## Type modules

| File | Owns |
|---|---|
| `Product.graphql` | `Product`, `Item` (SKU), `ProductUniqueIdentifier`, related types |
| `ProductSearch.graphql` | `ProductSearchResult`, search-result wrapping |
| `Facets.graphql` | `Facets`, `SelectedFacetInput`, facet dimensions |
| `Banners.graphql` | `Banners`, banner items |
| `Autocomplete.graphql` | Autocomplete responses |
| `SearchSuggestions.graphql` | Search-term suggestions |
| `Suggestions.graphql` | Related-search suggestions |
| `Correction.graphql` | Query correction |
| `Brand.graphql` | `Brand` entity |
| `Category.graphql` | `Category` entity |
| `Benefits.graphql` | Promotion / discount-list metadata |
| `ItemMetadata.graphql` | Cart-style metadata for `Item` |
| `Advertisement.graphql` | Sponsored / ad fields on products |
| `PageType.graphql` | URL slug → entity-type resolver |
| `SearchURLStats.graphql` | Analytics queries (top searches, etc.) |

## Resolution sites

Each `Query` field in `schema.graphql` is resolved at runtime by [`vtex.search-resolver`](https://github.com/vtex-apps/search-resolver). The mapping is:

| Schema query | Resolver module (in `search-resolver`) |
|---|---|
| `product`, `productSearch`, `facets`, `banners`, `correction`, `searchSuggestions`, `autocompleteSearchSuggestions` | `node/resolvers/search/` |
| `topSearches` and related | `node/resolvers/stats/` |
| benefit / promotion fields on `Product` / `Offer` | `node/resolvers/benefits/` |

## Directive contracts

```graphql
# graphql/directives.graphql (effective contract)
enum CacheControlScope { PUBLIC, SEGMENT }
enum MaxAge { SHORT, MEDIUM, LONG }

directive @cacheControl(scope: CacheControlScope, maxAge: MaxAge) on FIELD_DEFINITION
directive @withSegment on FIELD_DEFINITION
```

- `@cacheControl(scope: SEGMENT, ...)` is the default for queries that vary per shopper (most of them).
- Removing `@withSegment` from a field changes its caching semantics — agents should not do this without coordinating with the resolver team.

## Source: `node/package.json`

The `node/package.json` in this repo (`{ "name": "search-graphql", "description": "Don't delete this file, it's necessary to generate the TypeScript types of the GraphQL" }`) is a placeholder used by the VTEX IO `graphql` builder to generate TypeScript typings consumed by `vtex.search-resolver`. **Do not extend it with scripts or dependencies** — it is not the runtime.
