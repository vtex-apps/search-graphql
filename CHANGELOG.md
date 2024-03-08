# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Parameter `groupBy` into recommendations in `Product` type and `productRecommendations` query.

## [0.58.0] - 2023-12-07

### Added

- Created query parameter `anonymousId` for `sponsoredProducts` used on A/B testing.

## [0.57.0] - 2023-09-20

### Added
- `advertisement` field in `Product` type.

## [0.56.0] - 2023-09-15

## [0.55.0] - 2023-08-22

### Added
- sponsoredProducts query.

## [0.54.0] - 2023-08-03

### Added
- `additionalInfo` to `product` query.

## [0.53.1] - 2023-06-26

### Changed
- Documentation in the README.md file

## [0.53.0] - 2023-06-02

### Added
- `generalValues` to `product` query.

## [0.52.0] - 2023-04-25

### Added
- `shippingOptions` to `products` query. 

## [0.51.0] - 2023-03-03

### Added
- `shippingOptions` to filter autocomplete suggestions. 

## [0.50.0] - 2022-07-20

### Added
- `rule` to the `Product` object.

## [0.49.0] - 2022-06-30

### Added
- `count` to `productSuggestions` query.

## [0.48.4] - 2022-05-26

## [0.48.3] - 2022-05-18

## [0.48.2] - 2022-05-18

### Fixed
- Remove duplicated directives

## [0.48.1] - 2022-05-16

### Added
- Documentation page with `graphql-markdown`.

## [0.48.0] - 2022-01-18

### Added
- `orderBy` to the `productSuggestions` query.

## [0.47.3] - 2021-12-28

### Fixed
- Error when the `selectedFacets` prop is `undefined`.

## [0.47.2] - 2021-11-03

### Changed
- Update `orderBy` documentation.

## [0.47.1] - 2021-10-18

### Fixed
- `orderBy` default value.

## [0.47.0] - 2021-09-09

### Added
- `only1P` as a `SimulationBehavior` option.

## [0.46.0] - 2021-07-15

### Added
- `sampling` to `facets` response.

## [0.45.0] - 2021-07-08

### Added

- `initialAttributes` to `facets` query.

## [0.44.0] - 2021-06-14

### Added 

- `Options` object with `allowRedirect` flag to `ProductSearch` query.

## [0.43.0] - 2021-03-22

### Added
 
- `RegionId` and `SalesChannel` to `Product` query.
- `SalesChannel` to `ProductSuggestion` query.

## [0.42.0] - 2021-03-22

### Added
- `categoryTreeBehavior` field to the `facets` query.

## [0.41.0] - 2021-03-17

### Added 
- `RegionId` to the `ProductSuggestion` query.

## [0.40.0] - 2021-02-11
### Added
- `removeHiddenFacets` to the `facets` query.

## [0.39.0] - 2021-02-01
### Added
- `hideUnavailableItems` to the `productSuggestions` query.

## [0.38.0] - 2020-12-30
### Added
- Disables automatic translation in brand translatable fields which are related to the brand's name. Now these fileds are user only translatable.

## [0.37.0] - 2020-12-10
### Added
- Add `originalName` to `Properties` schema.

## [0.36.2-beta] - 2020-12-07

## [0.36.1] - 2020-12-03
### Fixed
- TypeScript type generation.

## [0.36.0] - 2020-10-05
### Added
- `quantity` on type `Facet`.
- Parameters on `values` on `Facet`.

## [0.35.0] - 2020-09-25
### Added
- `misspelled` and `operator` to the `productSuggestions` query.

## [0.34.0] - 2020-09-18
### Added
- Add `async` to the `simulationBehavior`

## [0.33.0] - 2020-09-16
### Added
- `excludedPaymentSystems` and `includedPaymentSystems` arguments to `Installments` type.

## [0.32.0] - 2020-09-08
### Added
- `salesChannel` argument to `productsByIdentifier` query.

## [0.31.0] - 2020-07-31

### Added
- `productOriginVtex` to the `productSuggestions` query.
- `simulationBehavior` to the `productSuggestions` query.

## [0.30.0] - 2020-07-21
### Added
- `originalName` to `SpecificationGroup`.
- `originalName` to `SpecificationGroupProperty`.
- `originalName` to `SKUSpecificationField`.
- `originalName` to `SKUSpecificationValue`.

## [0.29.0] - 2020-07-09

### Added
- `selectedProperties` field to the `product` object.

## [0.28.1] - 2020-07-07
### Added
- Translation directive to `SKUSpecificationField` and `SKUSpecificationValue`

## [0.28.0] - 2020-06-15
### Added
- Redirect to `productSearch`.
- Breadcrumb to `facets`.

### Changed
- Split `suggestions`, `correction` and `banners` into three new queries.

## [0.27.2] - 2020-06-09
### Changed
- Make fiels of `Property` type be translatable.

## [0.27.1] - 2020-06-02
### Changed
- Make metaTagDescription on SearchMetadata be translatable.

## [0.27.0] - 2020-05-22

### Added
- Add hidden property to facets.

## [0.26.1] - 2020-05-13
### Changed
- Update the documentation on docs/README.md.

## [0.26.0] - 2020-05-07
### Added
-  `taxPercentage` on the `Offer` type.

## [0.25.1] - 2020-04-29
### Changed
- Remove the remaining resolvers implementation.

## [0.25.0] - 2020-04-27

## [0.24.1] - 2020-04-22
### Added
- Add web framework team as code owners.

### Fixed
- Use `productName` as fallback to `titleTag` if there is no `productTitle`.

## [0.24.0] - 2020-04-17
### Added
- Context to product translatable fields added

## [0.23.1] - 2020-04-14
### Fixed
- Problem caused by `0.23.0`.

## [0.23.0] - 2020-04-13 [YANKED]
### Added
- `spotPrice` on `Offer`.

## [0.22.0] - 2020-04-09
### Added
- Field `releaseDate` on type Product

## [0.21.1] - 2020-03-25
### Fixed
- isLegacySearch only when map and query segments have the same length

## [0.21.0] - 2020-03-24
### Added
- `facets` field to the `facets` query.
- `fullText`, `productOriginVTEX`, `operator`, `fuzzy` and `searchState` query inputs.
- `operator`, `fuzzy`, `searchState`, `suggestion`, `banner` and `correction` query outputs.
- `topSearches`, `searchSuggestions`, `productSuggestions` placeholders.

### Changed
- Change from `map` to `selectedFacets`.

## [0.20.4] - 2020-03-18
### Fixed
- Encode order for searchEncodeURI

## [0.20.3] - 2020-03-18
### Fixed
- Append category segments with rest of unresolved segments

## [0.20.2] - 2020-03-16

## [0.20.1] - 2020-03-16
### Fixed
- Brand discovery for new URLs format

## [0.20.0] - 2020-03-11
### Added
- Add `estimatedDateArrival` to SKU schema.

## [0.19.4] - 2020-03-09
### Fixed
- Fix logic of finding maps in compatibility function.

## [0.19.3] - 2020-03-09

## [0.19.2] - 2020-03-09
### Fixed
- Error would be thrown in case `gifts` field tried to fetch information for a product that could not be found by `productSearch` query.

## [0.19.1] - 2020-03-03
### Changed
- Remove default quantity of images in Product images resolver.

## [0.19.0] - 2020-03-02
### Added
- Add Search URLs access count statistics
- Add new Search URLs structure

## [0.18.0] - 2020-03-02
### Added
- `MAX_WITH_INTEREST` and `MAX_WITHOUT_INTEREST` as possibilities on the InstallmentCriteria enum to clarify behavior on the offers api.

## [0.17.1] - 2020-02-28
### Changed
- Make product calls that are fired to warm api-cache not cache results in memory.

## [0.17.0] - 2020-02-27
### Added
- New `gift` field to `Product` type.

## [0.16.3] - 2020-02-18
### Changed
- Uses messages loader instead of directly using messages client. This should increase performance

## [0.16.2] - 2020-02-13
### Changed
- Turn on toVtexAssets directive.

## [0.16.1] - 2020-02-07 [YANKED]
### Fixed
- Facets bad args checking

## [0.16.0] - 2020-02-07 [YANKED]
### Added
- Add Search URLs access count statistics
- Add new Search URLs structure

## [0.15.1] - 2020-02-05

## [0.15.0] - 2020-01-23
### Added
- `simulationBehavior` param ins productSearch and products queries.

## [0.14.0] - 2020-01-14
### Added
- `skuSpecifications` on the `Product` query.

## [0.13.2] - 2020-01-06
### Changed
- Minor performance improvements in facets and some product resolvers.

## [0.13.1] - 2020-01-03
### Changed
- Stop using bluebird methods and promises. Use native promises instead.

## [0.13.0] - 2020-01-02
### Added
- `behavior` to the `facets`'s query resolver.

## [0.12.4] - 2019-12-11
### Added
- Docs builder, create docs.

## [0.12.3] - 2019-12-11

## [0.12.2] - 2019-12-11
### Fixed
- Fix translating to wrong language when locale is different than tenant default language.

## [0.12.1] - 2019-12-04
### Fixed
- Check args provided in facets query to avoid catalog call that returns 405.

## [0.12.0] - 2019-11-27
### Changed
- Migrates to node 6.x
- Decreases min replicas

## [0.11.0] - 2019-11-12
### Added
- Logic to filter query and map arguments (moved from `search-result`)

## [0.10.0] - 2019-11-11
### Added
- Resolver for priceRange in Product type.

## [0.9.2] - 2019-11-11
### Changed
- Make searchMetadata cache be PUBLIC.

## [0.9.1] - 2019-11-11
### Fixed
- Stop sorting installments, find max or min in O(N).

## [0.9.0] - 2019-11-08
### Added
- Filter argument with "FIRST_AVAILABLE" and "ALL_AVAILBALE" value for sku list in product type.

## [0.8.3] - 2019-10-31
### Changed
- Rename catalog to search everywhere since we actually use search, instead of catalog API

## [0.8.2] - 2019-10-31
### Changed
- Uses `x-vtex-locale` and `x-vtex-tenant` headers for not making unecessary IO while translating search queries

## [0.8.1] - 2019-10-31
### Changed
- Make `WithSegment` directive decode the segment token locally, avoid calling API.

## [0.8.0] - 2019-10-29

## [0.7.3] - 2019-10-25
### Changed
- Change min replicas to 20.

## [0.7.2] - 2019-10-25
### Fixed
- Don't encode characters `/` and `&` in `searchEncodeURI`.

## [0.7.1] - 2019-10-24
### Fixed
- Encode characters to prevent `Scripts are not allowed` error.

## [0.7.0] - 2019-10-24

## [0.6.5] - 2019-10-23

## [0.6.4] - 2019-10-17
### Fixed
- Prevent cache problems, implement custom cacheId for products from crossselling apis.

## [0.6.3] - 2019-10-15
### Refactor
- removes old routing

## [0.6.2] - 2019-10-15
### Fixed
- Prevents empty answer in categoryTree if categoryId for product is not found in categoriesIds.

## [0.6.1] - 2019-10-15
### Fixed
- Get only the product main category tree at the category tree resolver for `Product`.

## [0.6.0] - 2019-10-14
### Added
- Add `TeaserCondition` and `TeaserEffects` to `Teaser` type on `Product`.

## [0.5.1] - 2019-10-09

## [0.5.0] - 2019-10-02
### Changed
- removes translatableV2 usage in favor of messages api refactor

## [0.4.0] - 2019-09-24
### Changed
- Use translatableV2
- Use translateV2 in search term

## [0.3.0] - 2019-09-20
### Added
- `defaultValue` to `InputValue`.

## [0.2.3] - 2019-09-18
### Fixed
- Remove leftover console.log.

## [0.2.2] - 2019-09-17
### Fixed
- Throw errors on `products` and `productSearch` queries when the `to` arg is greater than 2500.

## [0.2.1] - 2019-09-16
### Changed
- Decrease min replicas.

## [0.2.0] - 2019-09-12

## [0.1.0] - 2019-09-12
### Added
- `InputValues` to `AssemblyOption`

## [0.0.1] - 2019-09-05
### Added
- First version.
