# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
