# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]
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
