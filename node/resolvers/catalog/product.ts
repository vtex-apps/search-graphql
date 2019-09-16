import { Functions } from '@gocommerce/utils'
import { compose, last, length, map, omit, propOr, reject, reverse, split, toPairs } from 'ramda'

import { getBenefits } from '../benefits'
import { buildCategoryMap } from './utils'

type MaybeRecord = false | Record<string, any>
const objToNameValue = (
  keyName: string,
  valueName: string,
  record: Record<string, any>
) =>
  compose<Record<string, any>, [string, any][], MaybeRecord[], MaybeRecord>(
    reject<MaybeRecord>(value => typeof value === 'boolean' && value === false),
    map<[string, any], MaybeRecord>(
      ([key, value]) =>
        typeof value === 'string' && { [keyName]: key, [valueName]: value }
    ),
    toPairs
  )(record)

const knownNotPG = [
  'allSpecifications',
  'brand',
  'categoriesIds',
  'categoryId',
  'clusterHighlights',
  'productClusters',
  'items',
  'productId',
  'link',
  'linkText',
  'productReference',
]

const removeTrailingSlashes = (str: string) =>
  str.endsWith('/') ? str.slice(0, str.length - 1) : str

const removeStartingSlashes = (str: string) =>
  str.startsWith('/') ? str.slice(1) : str

const parseId = compose(
  Number,
  last,
  split('/'),
  removeTrailingSlashes
)

const getCategoryLevel = compose(
  length,
  split('/'),
  removeTrailingSlashes,
  removeStartingSlashes
)

const productCategoriesToCategoryTree = async (
  { categories, categoriesIds }: CatalogProduct,
  _: any,
  { clients: { catalog }, vtex: { account } }: Context
) => {
  if (!categories || !categoriesIds) {
    return []
  }
  const reversedIds = reverse(categoriesIds)
  if (!Functions.isGoCommerceAcc(account)) {
    return reversedIds.map(categoryId => catalog.category(parseId(categoryId)))
  }
  const level = Math.max(...reversedIds.map(getCategoryLevel))
  const categoriesTree = await catalog.categories(level)
  const categoryMap = buildCategoryMap(categoriesTree)
  const mappedCategories = reversedIds
    .map(id => categoryMap[parseId(id)])
    .filter(Boolean)

  return mappedCategories.length ? mappedCategories : null
}

export const resolvers = {
  Product: {
    benefits: ({ productId }: CatalogProduct, _: any, ctx: Context) =>
      getBenefits(productId, ctx),

    categoryTree: productCategoriesToCategoryTree,

    cacheId: ({ linkText }: CatalogProduct) => linkText,

    clusterHighlights: ({ clusterHighlights = {} }) =>
      objToNameValue('id', 'name', clusterHighlights),

    jsonSpecifications: (product: CatalogProduct) => {
      const { Specifications = [] } = product
      const specificationsMap = Specifications.reduce(
        (acc: Record<string, string>, key: string) => {
          acc[key] = (product as any)[key]
          return acc
        },
        {}
      )
      return JSON.stringify(specificationsMap)
    },

    productClusters: ({ productClusters = {} }: CatalogProduct) =>
      objToNameValue('id', 'name', productClusters),

    properties: (product: CatalogProduct) =>
      map(
        (name: string) => ({ name, values: (product as any)[name] }),
        product.allSpecifications || []
      ),

    propertyGroups: (product: CatalogProduct) => {
      const { allSpecifications = [] } = product
      const notPG = knownNotPG.concat(allSpecifications)
      return objToNameValue('name', 'values', omit(notPG, product))
    },

    recommendations: (product: CatalogProduct) => product,

    titleTag: ({ productTitle }: CatalogProduct) => productTitle,

    specificationGroups: (
      product: CatalogProduct,
    ) => {
      const allSpecificationsGroups = propOr<[], CatalogProduct, string[]>(
        [],
        'allSpecificationsGroups',
        product
      ).concat(['allSpecifications'])
      const specificationGroups = allSpecificationsGroups.map(
        (groupName: string) => ({
          name: groupName,
          specifications: ((product as any)[groupName] || []).map(
            (name: string) => ({
              name,
              values: ((product as any)[name] || []),
            })
          ),
        })
      )
      return specificationGroups || []
    },
  },
  OnlyProduct: {
    categoryTree: productCategoriesToCategoryTree,
  },
}
