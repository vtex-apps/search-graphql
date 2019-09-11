import {
  tail,
  head,
  compose,
  equals,
  prop,
  join,
  map,
  filter,
  findLastIndex,
  path,
  split,
  toLower,
} from 'ramda'
import { Functions } from '@gocommerce/utils'

import { zipQueryAndMap, findCategoryInTree, getBrandFromSlug } from '../utils'
import { toTitleCase } from '../../../utils/string'

type TupleString = [string, string]

const isTupleMap = compose<TupleString, string, boolean>(
  equals('c'),
  prop('1')
)

const getLastCategoryIndex = findLastIndex(isTupleMap)

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
    return emptyTitleTag
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
  const queryAndMap = zipQueryAndMap(query, map)
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
  query: SearchMetadataArgs['query'],
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

const getSpecificationFilterName = (name: string) => {
  return toTitleCase(decodeURI(name))
}

const getPrimaryMetadata = (args: SearchMetadataArgs, ctx: Context) => {
  const map = args.map || ''
  const firstMap = head(map.split(','))
  if (firstMap === 'c') {
    return getCategoryMetadata(args, ctx)
  }
  if (firstMap === 'b') {
    return getBrandMetadata(args.query, ctx)
  }
  if (firstMap && firstMap.includes('specificationFilter')) {
    const cleanQuery = args.query || ''
    const name = head(cleanQuery.split('/')) || ''
    return {
      titleTag: getSpecificationFilterName(name),
      metaTagDescription: null,
    }
  }
  return emptyTitleTag
}

const getNameForRemainingMaps = async (
  remainingTuples: [string, string][],
  ctx: Context
) => {
  const {
    vtex: { account },
    clients: { catalog },
  } = ctx
  const lastCategoryIndex = getLastCategoryIndex(remainingTuples)
  const isGC = Functions.isGoCommerceAcc(account)
  const names = await Promise.all(
    remainingTuples.map(async ([query, map], index) => {
      if (map === 'c' && index === lastCategoryIndex && !isGC) {
        const cleanQuery = categoriesOnlyQuery(remainingTuples)
        const pagetype = await catalog.pageType(cleanQuery).catch(() => null)
        if (pagetype) {
          return pagetype.name
        }
      }
      if (map === 'b' && !isGC) {
        const brand = await catalog.pageType(decodeURI(query)).catch(() => null)
        if (brand) {
          return brand.name
        }
      }
      if (map.includes('specificationFilter')) {
        return getSpecificationFilterName(query)
      }
      return null
    })
  )
  return names.filter(Boolean) as string[]
}

export const emptyTitleTag = {
  titleTag: null,
  metaTagDescription: null,
}

/**
 * Get metadata of category/brand APIs
 *
 * @param _
 * @param args
 * @param ctx
 */
export const getSearchMetaData = async (
  _: any,
  args: SearchMetadataArgs,
  ctx: Context
) => {
  const queryAndMap = zipQueryAndMap(args.query, args.map)
  if (queryAndMap.length === 0) {
    return emptyTitleTag
  }

  const isFirstCategory = queryAndMap[0][1] === 'c'
  const tailTuples = tail(queryAndMap)

  const validTuples = tailTuples.filter(
    ([_, m]) =>
      m === 'b' ||
      m.includes('specificationFilter') ||
      (m === 'c' && !isFirstCategory)
  )
  const [metadata, otherNames] = await Promise.all([
    getPrimaryMetadata(args, ctx),
    getNameForRemainingMaps(validTuples, ctx),
  ])

  return {
    titleTag: metadata.titleTag
      ? [metadata.titleTag, ...otherNames].join(' - ')
      : metadata.titleTag,
    metaTagDescription: metadata.metaTagDescription,
  }
}
