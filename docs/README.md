# VTEX Search GraphQL

This GraphQL app is a wrapper for the VTEX catalog searches related API calls.

### Usage

To use it in your app, decalre it on your manifest file like:
```
"dependencies": {
  "vtex.search-graphql": "0.x"
}
```

You may then use it in your front end component queries, for example, write file `productQuery.gql`:
```
query ProductQuery($slug: String) {
  product(identifier: { field: slug, value: $slug}) @context(provider: "vtex.search-graphql") {
    productName
  }
}
```

### Queries

Check the [Product](/graphql/Product.graphql) to know what fields you can query in the type product.

```
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
```
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

```
query {
  product(identifier: { field: slug, value: "my-slug"}) {
    productName
  }
```

or

```
query {
  product(identifier: { field: id, value: "1"}) {
    productName
  }
```

Product Search:

```
productSearch(
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
    Order by a criteria. OrderByPriceDESC/OrderByPriceASC, OrderByTopSaleDESC, OrderByReviewRateDESC, OrderByNameASC/OrderByNameDESC, OrderByReleaseDateDESC, OrderByBestDiscountDESC
    """
    orderBy: String = "OrderByPriceDESC"
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
  ): ProductSearch
  ```

  ```
  type ProductSearch {
  products: [Product]
  recordsFiltered: Int
  titleTag: String
  metaTagDescription: String
  breadcrumb: [SearchBreadcrumb]
}
```

  It returns a list of products, the breadcrumb associated for that search, the number of items in total, and SEO related data.

  ```
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

```
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

```
searchMetadata(
    """
    Terms that is used in search e.g.: eletronics/samsung
    """
    query: String = ""
    """
    Defines terms types: Brand, Category, Department e.g.: c,b
    """
    map: String = ""
  ): SearchMetadata
```
```
type SearchMetadata {
  titleTag: String
  metaTagDescription: String
}
```

This query returns SEO related data.

Example:
```
query {
  searchMetadata(query: "clothing/Brand", map:"c,b") {
    titleTag
    metaTagDescription
  }
}
```

Products (list)

```
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
    Order by a criteria. OrderByPriceDESC/OrderByPriceASC, OrderByTopSaleDESC, OrderByReviewRateDESC, OrderByNameASC/OrderByNameDESC, OrderByReleaseDateDESC, OrderByBestDiscountDESC
    """
    orderBy: String = "OrderByPriceDESC"
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
```
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

```
query {
  productRecommendations(identifier: { field: id, value: "1"}, type: similars) {
    productName
  }
}
```

Products By Identifier

```
productsByIdentifier(
  field: ProductUniqueIdentifierField!
  values: [ID!]
): [Product]
```

Get products with same identifier, returns list.

Example:
```
query {
  productsByIdentifier(identifier: { field: reference, value: "1"}, type: similars) {
    productName
  }
}
```

Facets
```
facets(
  """
  Terms that is used in search e.g.: eletronics/samsung
  """
  query: String = ""
  """
  Defines terms types: Brand, Category, Department e.g.: c,b
  """
  map: String = ""
  """
  If true, uses isAvailablePerSalesChannel_ parameter on query with segment's sales channel.
  """
  hideUnavailableItems: Boolean = false
  """
  If Static, ignores SpecificationFilters received on the map and query when returning 
  the facets available, which makes the facets never change.
  """
  behavior: String = "Static"
): Facets
```

Return the facets associated for those search args.

Check the [Facets](/graphql/Facets.graphql) to know what fields you can query in the type Facets.

Example:
```
query {
  facets(query: "clothing", map: "c") {
    departments {
      name
    }
  }
}
```


Autocomplete

```
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
```
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
```
query {
  autocomplete(searchTem: "shirt") {
    itemsReturned {
      name
      thumb
    }
  }
}
```
