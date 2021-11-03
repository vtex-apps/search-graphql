# VTEX Search GraphQL

This app exports a GraphQL schema for search results on VTEX Stores.

The default implementation for this schema is on [vtex.search-resolver](https://github.com/vtex-apps/search-resolver) app.

### Usage

To use it in your app, decalre it on your manifest file like:
```
"dependencies": {
  "vtex.search-graphql": "0.x"
}
```

You may then use it in your front end component queries, for example, write file `productQuery.gql`:
```graphql
query ProductQuery($slug: String) {
  product(identifier: { field: slug, value: $slug}) @context(provider: "vtex.search-graphql") {
    productName
  }
}
```

To resolve this query, you need to have a app that implements the schema declared in this app, such as: [vtex.search-resolver](https://github.com/vtex-apps/search-resolver)

### Queries

Check the [Product](/graphql/Product.graphql) to know what fields you can query in the type product.

```graphql
product(
    """
    Product slug
    """
    slug: String
    """
    Product identifier
    """
    identifier: ProductUniqueIdentifier
  ): Product
```
Relevant types:
```graphql
input ProductUniqueIdentifier {
  field: ProductUniqueIdentifierField!
  value: ID!
}

enum ProductUniqueIdentifierField {
  id
  slug
  ean
  reference
  sku
}
```

The product query returns a propduct.

You may get a product with its slug (using the slug arg) or by passing other type of identification like id.

```graphql
query {
  product(identifier: { field: slug, value: "my-slug"}) {
    productName
  }
```

or

```graphql
query {
  product(identifier: { field: id, value: "1"}) {
    productName
  }
```

Product Search:

```graphql
  productSearch(
    """
    Terms that is used in search e.g.: eletronics/samsung
    """
    query: String = ""
    """
    Text inputed by user as the search term
    """
    fullText: String = ""
    """
    Defines terms types: Brand, Category, Department e.g.: c,b
    """
    map: String = ""
    """
    Selected facets
    """
    selectedFacets: [SelectedFacet]
    """
    Filter by category. {a}/{b} - {a} and {b} are categoryIds
    """
    category: String = ""
    """
    Array of product specification. specificationFilter_{a}:{b} - {a} is the specificationId, {b} = specification value
    """
    specificationFilters: [String]
    """
    Filter by price range. e.g.: {a} TO {b} - {a} is the minimum price "from" and {b} is the highest price "to"
    """
    priceRange: String = ""
    """
    Filter by collection. where collection also know as productClusterId
    """
    collection: String = ""
    """
    Filter by availability at a specific sales channel. e.g.: salesChannel:4 if want filter by available products for the sales channel 4
    """
    salesChannel: String = ""
    """
    Order by a criteria. OrderByPriceDESC/OrderByPriceASC, OrderByTopSaleDESC, OrderByReviewRateDESC, OrderByNameASC/OrderByNameDESC, OrderByReleaseDateDESC, OrderByBestDiscountDESC, OrderByScoreDESC.
    If you want to sort by a specification, use the format {specification key}:{asc|desc}. For example: "pricePerUnit:asc" or "size:desc" (this only works on `vtex.search-resolver@1.x`)
    """
    orderBy: String = "OrderByScoreDESC"
    """
    Pagination item start
    """
    from: Int = 0
    """
    Pagination item end
    """
    to: Int = 9
    """
    If true, uses isAvailablePerSalesChannel_ parameter on query with segment's sales channel. Will override any given salesChannel arg
    """
    hideUnavailableItems: Boolean = false
    """
    If true, remove hidden facets from the result.
    """
    removeHiddenFacets: Boolean = false
    """
    If you want faster searches and do not care about most up to date prices and promotions, use skip value.
    """
    simulationBehavior: SimulationBehavior = default
    """
    If true, all the products will be solved by VTEX API.
    """
    productOriginVtex: Boolean = false
    """
    Indicates how the search-engine will deal with the fullText.
    """
    operator: Operator
    """
    Indicates how the search engine will correct misspeled words.
    """
    fuzzy: String
    """
    It is similar to fuzzy and operator but is used for scenarios where fuzzy and operator are not enough.
    """
    searchState: String
  ): ProductSearch
  ```

  ```graphql
  type ProductSearch {
    products: [Product]
    recordsFiltered: Int
    titleTag: String
    metaTagDescription: String
    breadcrumb: [SearchBreadcrumb]
    canonical: String
    suggestion: SearchSuggestions
    correction: SearchCorrection
    operator: Operator
    fuzzy: String
    searchState: String
    banners: [SearchBanner]
  }
```

  It returns a list of products, the breadcrumb associated for that search, the number of items in total, and SEO related data.

  ```graphql
  query {
    productSearch(query: "clothing", map:"c", hideUnavailableItems: true) {
      products {
        productName
      }
      recordsFiltered
      breadcrumb {
        name
        href
      }
    } 
  }
```

Other examples:

```graphql
  query {
    productSearch(query: "clothing/Brand", map:"c,b", hideUnavailableItems: true, from: 10, to: 20, ) {
      products {
        productName
      }
      recordsFiltered
      breadcrumb {
        name
        href
      }
    } 
  }
```

Search Metadata:

```graphql
searchMetadata(
    """
    Terms that is used in search e.g.: eletronics/samsung
    """
    query: String = ""
    """
    Text inputed by user as the search term
    """
    fullText: String = ""
    """
    Defines terms types: Brand, Category, Department e.g.: c,b
    """
    map: String = ""
    """
    Selected facets
    """
    selectedFacets: [SelectedFacet]
  ): SearchMetadata
```
```graphql
type SearchMetadata {
  titleTag: String
  metaTagDescription: String
}
```

This query returns SEO related data.

Example:
```graphql
query {
  searchMetadata(query: "clothing/Brand", map:"c,b") {
    titleTag
    metaTagDescription
  }
}
```

Products (list)

```graphql
"""
  Returns products list filtered and ordered
  """
  products(
    """
    Terms that is used in search e.g.: eletronics/samsung
    """
    query: String = ""
    """
    Defines terms types: Brand, Category, Department e.g.: c,b
    """
    map: String = ""
    """
    Filter by category. {a}/{b} - {a} and {b} are categoryIds
    """
    category: String = ""
    """
    Array of product specification. specificationFilter_{a}:{b} - {a} is the specificationId, {b} = specification value
    """
    specificationFilters: [String]
    """
    Filter by price range. e.g.: {a} TO {b} - {a} is the minimum price "from" and {b} is the highest price "to"
    """
    priceRange: String = ""
    """
    Filter by collection. where collection also know as productClusterId
    """
    collection: String = ""
    """
    Filter by availability at a specific sales channel. e.g.: salesChannel:4 if want filter by available products for the sales channel 4
    """
    salesChannel: String = ""
    """
    Order by a criteria. OrderByPriceDESC/OrderByPriceASC, OrderByTopSaleDESC, OrderByReviewRateDESC, OrderByNameASC/OrderByNameDESC, OrderByReleaseDateDESC, OrderByBestDiscountDESC, OrderByScoreDESC
    """
    orderBy: String = "OrderByScoreDESC"
    """
    Pagination item start
    """
    from: Int = 0
    """
    Pagination item end
    """
    to: Int = 9
    """
    If true, uses isAvailablePerSalesChannel_ parameter on query with segment's sales channel. Will override any given salesChannel arg
    """
    hideUnavailableItems: Boolean = false
  ): [Product]
  ```


Returns a list of products.

Example:
```graphql
query {
  products(query: "clothing/Brand", map:"c,b") {
    productName
  }
}
```

Product Recommendations

```
productRecommendations(
  identifier: ProductUniqueIdentifier
  type: CrossSelingInputEnum
): [Product]
```

Get recommendations based on type of wanted recommendation for that specified product.

Example:

```graphql
query {
  productRecommendations(identifier: { field: id, value: "1"}, type: similars) {
    productName
  }
}
```

Products By Identifier

```graphql
productsByIdentifier(
  field: ProductUniqueIdentifierField!
  values: [ID!]
  salesChannel: String
): [Product]
```

Get products with same identifier, returns list.

Example:
```graphql
query {
  productsByIdentifier(identifier: { field: reference, value: "1"}, type: similars) {
    productName
  }
}
```

Facets
```graphql
facets(
  """
  Terms that is used in search e.g.: eletronics/samsung
  """
  query: String = ""
  """
  Text inputed by user as the search term
  """
  fullText: String = ""
  """
  Defines terms types: Brand, Category, Department e.g.: c,b
  """
  map: String = ""
  """
  Selected facets
  """
  selectedFacets: [SelectedFacet]
  """
  If true, uses isAvailablePerSalesChannel_ parameter on query with segment's sales channel.
  """
  hideUnavailableItems: Boolean = false
  """
  If Static, ignores SpecificationFilters received on the map and query when returning
  the facets available, which makes the facets never change.
  """
  behavior: String = "Static"
  """
  Indicates how the search-engine will deal with the fullText.
  """
  operator: Operator
  """
  Indicates how the search engine will correct misspeled words.
  """
  fuzzy: String
  """
  It is similar to fuzzy and operator but is used for scenarios where fuzzy and operator are not enough.
  """
  searchState: String
  """
  Pagination item start
  """
  from: Int
  """
  Pagination item end
  """
  to: Int
  """
  Determines the behavior of the category tree
  """
  categoryTreeBehavior: CategoryTreeBehavior = default
  """
  Initial attributes (based on the `initialMap` parameter)
  """
  initialAttributes: String
): Facets
```

Return the facets associated for those search args.

Check the [Facets](/graphql/Facets.graphql) to know what fields you can query in the type Facets.

Example:
```graphql
query {
  facets(query: "clothing", map: "c") {
    departments {
      name
    }
  }
}
```


Autocomplete

```graphql
autocomplete(
  """
  Number of items that is returned
  """
  maxRows: Int = 12
  """
  Terms that is used in search e.g.: iphone
  """
  searchTerm: String
): Suggestions
```
Return type:
```graphql
type Suggestions {
  """ searchTerm from Query autocomplete is used as cacheId """
  cacheId: ID
  itemsReturned: [Items]
}

type Items {
  thumb: String
  name: String @translatableV2
  href: String
  criteria: String
  slug: String
  productId: String
}
```
Returns the suggested items based on a search term, used for search bar.

Example:
```graphql
query {
  autocomplete(searchTem: "shirt") {
    itemsReturned {
      name
      thumb
    }
  }
}
```


**Upcoming documentation:**

 - [Add new infos to the product query](https://github.com/vtex-apps/search-graphql/pull/105)