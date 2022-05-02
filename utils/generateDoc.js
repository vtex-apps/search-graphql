const fs = require('fs')

const { loadFilesSync } = require('@graphql-tools/load-files')
const { mergeTypeDefs } = require('@graphql-tools/merge')
const graphql = require('graphql')
const {
  loadSchemaJSON,
  renderSchema,
} = require('graphql-markdown')

const SCHEMA_PATH = `${__dirname}/../graphql/**/*.graphql`
const BUNDLE_PATH = `${__dirname}/../joined.graphql`
const MARKDOWN_PATH = `${__dirname}/../docs/README.md`

;(async () => {
  // Generate bundle
  const loadedFiles = loadFilesSync(SCHEMA_PATH)
  const typeDefs = mergeTypeDefs(loadedFiles)
  const printedTypeDefs = graphql.print(typeDefs)
  fs.writeFileSync(BUNDLE_PATH, printedTypeDefs)

  // Generate markdown
  fs.unlinkSync(MARKDOWN_PATH)
  const schema = await loadSchemaJSON(BUNDLE_PATH, { graphql })
  renderSchema(schema, {
    title: 'search-graphql',
    prologue:
      '# VTEX Search GraphQL\n\nThis app exports a GraphQL schema for search results on VTEX Stores.\n\nThe default implementation for this schema is on [vtex.search-resolver](https://github.com/vtex-apps/search-resolver) app.\n\n### Usage\n\nTo use it in your app, decalre it on your manifest file like:\n```\n"dependencies": {\n  "vtex.search-graphql": "0.x"\n}\n```\n\nYou may then use it in your front end component queries, for example, write file `productQuery.gql`:\n```graphql\nquery ProductQuery($slug: String) {\n  product(identifier: { field: slug, value: $slug}) @context(provider: "vtex.search-graphql") {\n    productName\n  }\n}\n```\n\nTo resolve this query, you need to have a app that implements the schema declared in this app, such as: [vtex.search-resolver](https://github.com/vtex-apps/search-resolver)',
    printer: (doc) => fs.appendFileSync(MARKDOWN_PATH, doc)
  })

  // Delete temp file
  fs.unlinkSync(BUNDLE_PATH)
})()
