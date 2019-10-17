# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
