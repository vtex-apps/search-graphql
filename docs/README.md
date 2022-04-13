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

### Documentation

The documentation is auto generated and can be found [here](https://github.com/vtex-apps/search-graphql/blob/master/spectaql-documentation/index.html).

To generate the documentation you need to install the [spectaql](https://github.com/anvilco/spectaql/) and run:

```
npx spectaql spectaql-config.yml -t ./spectaql-documentation
```
