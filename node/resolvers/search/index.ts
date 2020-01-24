import { IOContext, NotFoundError, UserInputError } from '@vtex/api'
import {
  head,
  isEmpty,
  isNil,
  path,
  pluck,
  test,
  pathOr,
  zip,
  tail,
} from 'ramda'

import { resolvers as assemblyOptionResolvers } from './assemblyOption'
import { resolvers as autocompleteResolvers } from './autocomplete'
import { resolvers as brandResolvers } from './brand'
import { resolvers as categoryResolvers } from './category'
import { resolvers as discountResolvers } from './discount'
import { resolvers as facetsResolvers } from './facets'
import { resolvers as itemMetadataResolvers } from './itemMetadata'
import { resolvers as itemMetadataPriceTableItemResolvers } from './itemMetadataPriceTableItem'
import { resolvers as itemMetadataUnitResolvers } from './itemMetadataUnit'
import { emptyTitleTag, getSearchMetaData } from './modules/metadata'
import { resolvers as offerResolvers } from './offer'
import { resolvers as productResolvers } from './product'
import { resolvers as productSearchResolvers } from './productSearch'
import { resolvers as recommendationResolvers } from './recommendation'
import { resolvers as breadcrumbResolvers } from './searchBreadcrumb'
import { resolvers as skuResolvers } from './sku'
import { resolvers as productPriceRangeResolvers } from './productPriceRange'
import { SearchCrossSellingTypes } from './utils'
import * as searchStats from '../stats/searchStats'

interface ProductIndentifier {
  field: 'id' | 'slug' | 'ean' | 'reference' | 'sku'
  value: string
}

interface ProductArgs {
  slug?: string
  identifier?: ProductIndentifier
}

enum CrossSellingInput {
  view = 'view',
  buy = 'buy',
  similars = 'similars',
  viewAndBought = 'viewAndBought',
  suggestions = 'suggestions',
  accessories = 'accessories',
}

interface ProductRecommendationArg {
  identifier?: ProductIndentifier
  type?: CrossSellingInput
}

interface ProductsByIdentifierArgs {
  field: 'id' | 'ean' | 'reference' | 'sku'
  values: [string]
}

const inputToSearchCrossSelling = {
  [CrossSellingInput.buy]: SearchCrossSellingTypes.whoboughtalsobought,
  [CrossSellingInput.view]: SearchCrossSellingTypes.whosawalsosaw,
  [CrossSellingInput.similars]: SearchCrossSellingTypes.similars,
  [CrossSellingInput.viewAndBought]: SearchCrossSellingTypes.whosawalsobought,
  [CrossSellingInput.accessories]: SearchCrossSellingTypes.accessories,
  [CrossSellingInput.suggestions]: SearchCrossSellingTypes.suggestions,
}

const translateToStoreDefaultLanguage = async (
  clients: Context['clients'],
  vtex: IOContext,
  term: string
): Promise<string> => {
  const { messagesGraphQL } = clients
  const { locale: from, tenant } = vtex
  const { locale: to } = tenant!

  return from && from !== to
    ? messagesGraphQL
        .translateV2({
          indexedByFrom: [
            {
              from,
              messages: [{ content: term }],
            },
          ],
          to,
        })
        .then(head)
    : term
}

const noop = () => { }

// Does prefetching and warms up cache for up to the 10 first elements of a search, so if user clicks on product page
const searchFirstElements = (products: SearchProduct[], from: number | null = 0, search: Context['clients']['search']) => {
  if (from !== 0 || from == null) {
    // We do not want this for pages other than the first
    return
  }
  products.slice(0, Math.min(10, products.length)).forEach(product => search.productById(product.productId).catch(noop))
}

export const fieldResolvers = {
  ...autocompleteResolvers,
  ...brandResolvers,
  ...categoryResolvers,
  ...facetsResolvers,
  ...itemMetadataResolvers,
  ...itemMetadataUnitResolvers,
  ...itemMetadataPriceTableItemResolvers,
  ...offerResolvers,
  ...discountResolvers,
  ...productResolvers,
  ...recommendationResolvers,
  ...skuResolvers,
  ...breadcrumbResolvers,
  ...productSearchResolvers,
  ...assemblyOptionResolvers,
  ...productPriceRangeResolvers,
}

const isValidProductIdentifier = (identifier: ProductIndentifier | undefined) =>
  !!identifier && !isNil(identifier.value) && !isEmpty(identifier.value)

const metadataResolverNames = ['titleTag', 'metaTagDescription']

// This method checks the requested fields in the query and see if the search metadata are being asked.
const isQueryingMetadata = (info: any) => {
  const selectedFields =
    path<any[]>(['fieldNodes', '0', 'selectionSet', 'selections'], info) || []
  return selectedFields.some(
    ({ name: { value } }: any) => metadataResolverNames.indexOf(value) >= 0
  )
}

const filterSpecificationFilters = ({
  query,
  map,
  ...rest
}: Required<FacetsArgs>) => {
  const queryArray = query.split('/')
  const mapArray = map.split(',')

  const queryAndMap = zip(queryArray, mapArray)
  const relevantArgs = [
    head(queryAndMap),
    ...tail(queryAndMap).filter(
      ([_, tupleMap]) => tupleMap === 'c' || tupleMap === 'ft'
    ),
  ]
  const finalQuery = pluck(0, relevantArgs).join('/')
  const finalMap = pluck(1, relevantArgs).join(',')

  return {
    ...rest,
    map: finalMap,
    query: finalQuery,
  }
}

const hasFacetsBadArgs = ({ query, map }: FacetsArgs) => {
  if (!query || !map) {
    return true
  }
  const queryArray = query.split('/')
  const mapArray = map.split(',')
  return queryArray.length !== mapArray.length
}

export const queries = {
  autocomplete: async (
    _: any,
    args: { maxRows: number; searchTerm?: string },
    ctx: Context
  ) => {
    const {
      clients: { search },
      clients,
      vtex,
    } = ctx

    if (!args.searchTerm) {
      throw new UserInputError('No search term provided')
    }
    const translatedTerm = await translateToStoreDefaultLanguage(
      clients,
      vtex,
      args.searchTerm
    )
    const { itemsReturned } = await search.autocomplete({
      maxRows: args.maxRows,
      searchTerm: translatedTerm,
    })
    return {
      cacheId: args.searchTerm,
      itemsReturned,
    }
  },

  facets: async (_: any, args: FacetsArgs, ctx: Context) => {
    if (hasFacetsBadArgs(args)) {
      throw new UserInputError('No query or map provided')
    }
    const { query, map, hideUnavailableItems } = args.behavior === 'Static'
      ? filterSpecificationFilters(args as Required<FacetsArgs>)
      : (args as Required<FacetsArgs>)
    const {
      clients: { search },
      clients,
      vtex,
    } = ctx
    const translatedQuery = await translateToStoreDefaultLanguage(
      clients,
      vtex,
      query
    )
    const segmentData = ctx.vtex.segment
    const salesChannel = (segmentData && segmentData.channel.toString()) || ''

    const unavailableString = hideUnavailableItems
      ? `&fq=isAvailablePerSalesChannel_${salesChannel}:1`
      : ''

    const facetsResult = await search.facets(
      `${translatedQuery}?map=${map}${unavailableString}`
    )

    const result = {
      ...facetsResult,
      queryArgs: {
        query: translatedQuery,
        map,
      },
    }
    return result
  },

  product: async (_: any, rawArgs: ProductArgs, ctx: Context) => {
    const {
      clients: { search },
    } = ctx

    const args =
      rawArgs && isValidProductIdentifier(rawArgs.identifier)
        ? rawArgs
        : { identifier: { field: 'slug', value: rawArgs.slug! } }

    if (!args.identifier) {
      throw new UserInputError('No product identifier provided')
    }

    const { field, value } = args.identifier
    let products = [] as SearchProduct[]

    switch (field) {
      case 'id':
        products = await search.productById(value)
        break
      case 'slug':
        products = await search.product(value)
        break
      case 'ean':
        products = await search.productByEan(value)
        break
      case 'reference':
        products = await search.productByReference(value)
        break
      case 'sku':
        products = await search.productBySku([value])
        break
    }

    if (products.length > 0) {
      return head(products)
    }

    throw new NotFoundError(
      `No product was found with requested ${field} ${JSON.stringify(args)}`
    )
  },

  products: async (_: any, args: SearchArgs, ctx: Context) => {
    const {
      clients: { search },
    } = ctx
    const queryTerm = args.query
    if (queryTerm == null || test(/[?&[\]=]/, queryTerm)) {
      throw new UserInputError(
        `The query term contains invalid characters. query=${queryTerm}`
      )
    }

    if (args.to && args.to > 2500) {
      throw new UserInputError(
        `The maximum value allowed for the 'to' argument is 2500`
      )
    }
    const products = await search.products(args)
    searchFirstElements(products, args.from, ctx.clients.search)
    return products
  },

  productsByIdentifier: async (
    _: any,
    args: ProductsByIdentifierArgs,
    ctx: Context
  ) => {
    const {
      clients: { search },
    } = ctx

    let products = [] as SearchProduct[]
    const { field, values } = args

    switch (field) {
      case 'id':
        products = await search.productsById(values)
        break
      case 'ean':
        products = await search.productsByEan(values)
        break
      case 'reference':
        products = await search.productsByReference(values)
        break
      case 'sku':
        products = await search.productBySku(values)
        break
    }

    if (products.length > 0) {
      return products
    }

    throw new NotFoundError(`No products were found with requested ${field}`)
  },

  productSearch: async (_: any, args: SearchArgs, ctx: Context, info: any) => {
    const {
      clients,
      clients: { search },
      vtex,
    } = ctx
    const queryTerm = args.query
    if (queryTerm == null || test(/[?&[\]=]/, queryTerm)) {
      throw new UserInputError(
        `The query term contains invalid characters. query=${queryTerm}`
      )
    }

    if (args.to && args.to > 2500) {
      throw new UserInputError(
        `The maximum value allowed for the 'to' argument is 2500`
      )
    }

    const query = await translateToStoreDefaultLanguage(
      clients,
      vtex,
      args.query || ''
    )
    const translatedArgs = {
      ...args,
      query,
    }

    const [productsRaw, searchMetaData] = await Promise.all([
      search.productsRaw(translatedArgs),
      isQueryingMetadata(info)
        ? getSearchMetaData(_, translatedArgs, ctx)
        : emptyTitleTag,
    ])

    searchFirstElements(productsRaw.data, args.from, search)
    
     if (productsRaw.status === 200) {
      searchStats.count(ctx, args)
    }
    return {
      translatedArgs,
      searchMetaData,
      productsRaw,
    }
  },

  productRecommendations: async (
    _: any,
    { identifier, type }: ProductRecommendationArg,
    ctx: Context
  ) => {
    if (identifier == null || type == null) {
      throw new UserInputError('Wrong input provided')
    }
    const searchType = inputToSearchCrossSelling[type]
    let productId = identifier.value
    if (identifier.field !== 'id') {
      const product = await queries.product(_, { identifier }, ctx)
      productId = product!.productId
    }

    const products = await ctx.clients.search.crossSelling(
      productId,
      searchType
    )
    
    searchFirstElements(products, 0, ctx.clients.search)
    // We add a custom cacheId because these products are not exactly like the other products from search apis.
    // Each product is basically a SKU and you may have two products in response with same ID but each one representing a SKU.
    return products.map(product => {
      const skuId = pathOr('', ['items', '0', 'itemId'], product)
      return {
        ...product,
        cacheId: `${product.linkText}-${skuId}`,
      }
    })
  },

  searchMetadata: async (_: any, args: SearchMetadataArgs, ctx: Context) => {
    const { clients, vtex } = ctx
    const queryTerm = args.query
    if (queryTerm == null || test(/[?&[\]=]/, queryTerm)) {
      throw new UserInputError(
        `The query term contains invalid characters. query=${queryTerm}`
      )
    }
    const query = await translateToStoreDefaultLanguage(
      clients,
      vtex,
      args.query || ''
    )
    const translatedArgs = {
      ...args,
      query,
    }
    return getSearchMetaData(_, translatedArgs, ctx)
  },
}
