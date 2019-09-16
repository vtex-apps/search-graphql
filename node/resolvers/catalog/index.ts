import { Functions } from '@gocommerce/utils'
import { NotFoundError, UserInputError } from '@vtex/api'
import { all } from 'bluebird'
import { head, test, isEmpty, isNil, path } from 'ramda'

import { toSearchTerm } from '../../utils/ioMessage'
import { resolvers as autocompleteResolvers } from './autocomplete'
import { resolvers as brandResolvers } from './brand'
import { resolvers as categoryResolvers } from './category'
import { resolvers as discountResolvers } from './discount'
import { resolvers as facetsResolvers } from './facets'
import { resolvers as itemMetadataResolvers } from './itemMetadata'
import { resolvers as itemMetadataUnitResolvers } from './itemMetadataUnit'
import { resolvers as itemMetadataPriceTableItemResolvers } from './itemMetadataPriceTableItem'
import { resolvers as offerResolvers } from './offer'
import { resolvers as productResolvers } from './product'
import { resolvers as productSearchResolvers } from './productSearch'
import { resolvers as recommendationResolvers } from './recommendation'
import { resolvers as breadcrumbResolvers } from './searchBreadcrumb'
import { resolvers as skuResolvers } from './sku'
import { resolvers as assemblyOptionResolvers } from './assemblyOption'

import { CatalogCrossSellingTypes } from './utils'

import { getSearchMetaData, emptyTitleTag } from './modules/metadata'

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

const inputToCatalogCrossSelling = {
  [CrossSellingInput.buy]: CatalogCrossSellingTypes.whoboughtalsobought,
  [CrossSellingInput.view]: CatalogCrossSellingTypes.whosawalsosaw,
  [CrossSellingInput.similars]: CatalogCrossSellingTypes.similars,
  [CrossSellingInput.viewAndBought]: CatalogCrossSellingTypes.whosawalsobought,
  [CrossSellingInput.accessories]: CatalogCrossSellingTypes.accessories,
  [CrossSellingInput.suggestions]: CatalogCrossSellingTypes.suggestions,
}

const translateToStoreDefaultLanguage = async (
  clients: Context['clients'],
  term: string
): Promise<string> => {
  const { segment, messagesGraphQL } = clients
  const [{ cultureInfo: to }, { cultureInfo: from }] = await all([
    segment.getSegmentByToken(null),
    segment.getSegment(),
  ])
  return from && from !== to
    ? messagesGraphQL.translateV2(toSearchTerm(term, from, to) as any).then(head)
    : term
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

export const queries = {
  autocomplete: async (
    _: any,
    args: { maxRows: number; searchTerm?: string },
    ctx: Context
  ) => {
    const {
      clients: { catalog },
      clients,
    } = ctx

    if (!args.searchTerm) {
      throw new UserInputError('No search term provided')
    }
    const translatedTerm = await translateToStoreDefaultLanguage(
      clients,
      args.searchTerm
    )
    const { itemsReturned } = await catalog.autocomplete({
      maxRows: args.maxRows,
      searchTerm: translatedTerm,
    })
    return {
      cacheId: args.searchTerm,
      itemsReturned,
    }
  },

  facets: async (
    _: any,
    { query, map, hideUnavailableItems }: FacetsArgs,
    ctx: Context
  ) => {
    const {
      clients: { catalog },
      clients,
    } = ctx
    const translatedQuery = await translateToStoreDefaultLanguage(
      clients,
      query
    )
    const segmentData = ctx.vtex.segment
    const salesChannel = (segmentData && segmentData.channel.toString()) || ''

    const unavailableString = hideUnavailableItems
      ? `&fq=isAvailablePerSalesChannel_${salesChannel}:1`
      : ''

    const facetsResult = await catalog.facets(
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
      vtex: { account },
      clients: { catalog },
    } = ctx

    const args =
      rawArgs &&
      isValidProductIdentifier(rawArgs.identifier) &&
      !Functions.isGoCommerceAcc(account)
        ? rawArgs
        : { identifier: { field: 'slug', value: rawArgs.slug! } }

    if (!args.identifier) {
      throw new UserInputError('No product identifier provided')
    }

    const { field, value } = args.identifier
    let products = [] as CatalogProduct[]

    switch (field) {
      case 'id':
        products = await catalog.productById(value)
        break
      case 'slug':
        products = await catalog.product(value)
        break
      case 'ean':
        products = await catalog.productByEan(value)
        break
      case 'reference':
        products = await catalog.productByReference(value)
        break
      case 'sku':
        products = await catalog.productBySku([value])
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
      clients: { catalog },
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

    return catalog.products(args)
  },

  productsByIdentifier: async (
    _: any,
    args: ProductsByIdentifierArgs,
    ctx: Context
  ) => {
    const {
      clients: { catalog },
    } = ctx

    let products = [] as CatalogProduct[]
    const { field, values } = args

    switch (field) {
      case 'id':
        products = await catalog.productsById(values)
        break
      case 'ean':
        products = await catalog.productsByEan(values)
        break
      case 'reference':
        products = await catalog.productsByReference(values)
        break
      case 'sku':
        products = await catalog.productBySku(values)
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
      clients: { catalog },
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
      args.query || ''
    )
    const translatedArgs = {
      ...args,
      query,
    }

    const [productsRaw, searchMetaData] = await all([
      catalog.products(args, true),
      isQueryingMetadata(info)
        ? getSearchMetaData(_, translatedArgs, ctx)
        : emptyTitleTag,
    ])
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
    const catalogType = inputToCatalogCrossSelling[type]
    let productId = identifier.value
    if (identifier.field !== 'id') {
      const product = await queries.product(_, { identifier }, ctx)
      productId = product!.productId
    }
    return ctx.clients.catalog.crossSelling(productId, catalogType)
  },

  searchMetadata: async (_: any, args: SearchMetadataArgs, ctx: Context) => {
    const { clients } = ctx
    const queryTerm = args.query
    if (queryTerm == null || test(/[?&[\]=]/, queryTerm)) {
      throw new UserInputError(
        `The query term contains invalid characters. query=${queryTerm}`
      )
    }
    const query = await translateToStoreDefaultLanguage(
      clients,
      args.query || ''
    )
    const translatedArgs = {
      ...args,
      query,
    }
    return getSearchMetaData(_, translatedArgs, ctx)
  },
}
