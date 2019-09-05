import { Functions } from '@gocommerce/utils'
import { NotFoundError, UserInputError } from '@vtex/api'
import { all } from 'bluebird'
import {
  compose,
  equals,
  filter,
  head,
  join,
  map,
  path,
  prop,
  split,
  test,
  toLower,
  zip,
  isEmpty,
  isNil,
} from 'ramda'

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
import {
  CatalogCrossSellingTypes,
  findCategoryInTree,
  getBrandFromSlug,
} from './utils'

interface SearchMetadataArgs {
  query?: string | null
  map?: string | null
}

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

type TupleString = [string, string]

const isTupleMap = compose<TupleString, string, boolean>(
  equals('c'),
  prop('1')
)

const categoriesOnlyQuery = compose<
  TupleString[],
  TupleString[],
  string[],
  string
>(
  join('/'),
  map(prop('0')),
  filter(isTupleMap)
)

const getAndParsePagetype = async (path: string, ctx: Context) => {
  const pagetype = await ctx.clients.catalog.pageType(path).catch(() => null)
  if (!pagetype) {
    return { titleTag: null, metaTagDescription: null }
  }
  return {
    titleTag: pagetype.title || pagetype.name,
    metaTagDescription: pagetype.metaTagDescription,
  }
}

const getCategoryMetadata = async (
  { map, query }: SearchMetadataArgs,
  ctx: Context
) => {
  const {
    vtex: { account },
    clients: { catalog },
  } = ctx
  const queryAndMap: TupleString[] = zip(
    (query || '').split('/'),
    (map || '').split(',')
  )
  const cleanQuery = categoriesOnlyQuery(queryAndMap)

  if (Functions.isGoCommerceAcc(account)) {
    // GoCommerce does not have pagetype query implemented yet
    const category =
      findCategoryInTree(
        await catalog.categories(cleanQuery.split('/').length),
        cleanQuery.split('/')
      ) || {}
    return {
      metaTagDescription: path(['MetaTagDescription'], category),
      titleTag: path(['Title'], category) || path(['Name'], category),
    }
  }

  return getAndParsePagetype(cleanQuery, ctx)
}

const getBrandMetadata = async (
  { query }: SearchMetadataArgs,
  ctx: Context
) => {
  const {
    vtex: { account },
    clients: { catalog },
  } = ctx
  const cleanQuery = head(split('/', query || '')) || ''

  if (Functions.isGoCommerceAcc(account)) {
    const brand = (await getBrandFromSlug(toLower(cleanQuery), catalog)) || {}
    return {
      metaTagDescription: path(['metaTagDescription'], brand),
      titleTag: path(['title'], brand) || path(['name'], brand),
    }
  }
  return getAndParsePagetype(cleanQuery, ctx)
}

/**
 * Get metadata of category/brand APIs
 *
 * @param _
 * @param args
 * @param ctx
 */
const getSearchMetaData = async (
  _: any,
  args: SearchMetadataArgs,
  ctx: Context
) => {
  const map = args.map || ''
  const firstMap = head(map.split(','))
  if (firstMap === 'c') {
    return getCategoryMetadata(args, ctx)
  }
  if (firstMap === 'b') {
    return getBrandMetadata(args, ctx)
  }
  return { titleTag: null, metaTagDescription: null }
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
    ? messagesGraphQL.translate(toSearchTerm(term, from, to) as any).then(head)
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
}

const isValidProductIdentifier = (identifier: ProductIndentifier | undefined) =>
  !!identifier && !isNil(identifier.value) && !isEmpty(identifier.value)

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

  products: async (_: any, args: any, ctx: Context) => {
    const {
      clients: { catalog },
    } = ctx
    const queryTerm = args.query
    if (queryTerm == null || test(/[?&[\]=]/, queryTerm)) {
      throw new UserInputError(
        `The query term contains invalid characters. query=${queryTerm}`
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

  productSearch: async (_: any, args: SearchArgs, ctx: Context) => {
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
      getSearchMetaData(_, translatedArgs, ctx),
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
