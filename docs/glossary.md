<!-- managed-by: golden-path v1 -->
# Glossary

Domain vocabulary surfaced by the `vtex.search-graphql` schema.

| Term | Definition |
|---|---|
| **Schema** | The GraphQL contract for catalog/search/orders surfaced by VTEX Intelligent Search. Lives in `graphql/schema.graphql` plus modular type files under `graphql/types/`. |
| **Directive** | Custom GraphQL directive declared in `graphql/directives.graphql`. Notable: `@cacheControl(scope, maxAge)` and `@withSegment`. Implementation lives in `vtex.search-resolver/node/directives/`. |
| **`@cacheControl(scope, maxAge)`** | Per-field HTTP cache control. `scope`: `PUBLIC` or `SEGMENT` (segment-aware caching). `maxAge`: enum `SHORT` / `MEDIUM` / `LONG`. Used liberally — most query fields are segment-scoped. |
| **`@withSegment`** | Ensures the resolver sees the shopper's segment (country, currency, region, sales channel). Required for any field whose response varies by segment. |
| **Trade Policy** / **Sales Channel** (`salesChannel: Int`) | Storefront segmentation key. Controls catalog tree, prices, inventory. Argument on most `Query` fields. |
| **Region ID** (`regionId: String`) | Encoded logistic context. May be base64-encoded seller id (format `SW#{sellerId}`). |
| **Product** | The top-level catalog entity. Defined in `graphql/types/Product.graphql`. Has `items` (SKUs), `categoriesIds`, `clusterHighlights`, `specifications`, `priceRange`, etc. |
| **SKU** (a.k.a. `Item`) | A variant of a product. Carries seller offers, inventory, price tables. |
| **Selected Facet** (`SelectedFacetInput { key, value }`) | A filter applied to a query (e.g. `category=apparel`, `brand=adidas`, `priceRange=10:50`). Repeatable per `key`. |
| **Facet** | A filter dimension surfaced by Intelligent Search. Output type `Facets` in `graphql/types/Facets.graphql`. |
| **Banner** | Promotional content keyed to a facet path. `banners` query in `graphql/types/Banners.graphql`. |
| **Correction** | Query correction provided when the original term is misspelled. `correction` query in `graphql/types/Correction.graphql`. |
| **Autocomplete** | Type-ahead suggestions while a shopper types. `graphql/types/Autocomplete.graphql`. |
| **Suggestions** | Related-search and search-term suggestions. `graphql/types/Suggestions.graphql`, `SearchSuggestions.graphql`. |
| **Page Type** | Resolves a URL slug to its entity type (product, brand, category, search). `graphql/types/PageType.graphql`. |
| **Advertisement** | Sponsored product fields. `graphql/types/Advertisement.graphql`. |
| **Item Metadata** | Cart-style product metadata (used in assemblyOptions, item compatibility). `graphql/types/ItemMetadata.graphql`. |
| **Benefits** | Promotion / discount-list metadata attached to products. `graphql/types/Benefits.graphql`. |
| **Spectaql** | Static schema documentation generator (`spectaql-config.yml`). Reference config for rendering the schema to HTML; no in-repo generator wires it up today. |
