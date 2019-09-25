import {
  compose,
  last,
  map,
  omit,
  propOr,
  reject,
  reverse,
  split,
  toPairs,
  length,
} from 'ramda'

import { Functions } from '@gocommerce/utils'

import {
  toBrandIOMessage,
  toProductIOMessage,
  toSpecificationIOMessage,
} from './../../utils/ioMessage'
import { buildCategoryMap, hashMD5 } from './utils'
import { getBenefits } from '../benefits'

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

    productName: (
      { productName, productId }: CatalogProduct,
      _: any,
      { clients: { segment } }: Context
    ) => toProductIOMessage('name')(segment, productName, productId),

    description: (
      { description, productId }: CatalogProduct,
      _: any,
      { clients: { segment } }: Context
    ) => toProductIOMessage('description')(segment, description, productId),

    brand: (
      { brand, brandId }: CatalogProduct,
      _: any,
      { clients: { segment } }: Context
    ) => toBrandIOMessage('name')(segment, brand, brandId),

    metaTagDescription: (
      { metaTagDescription, productId }: CatalogProduct,
      _: any,
      { clients: { segment } }: Context
    ) =>
      toProductIOMessage('metaTagDescription')(
        segment,
        metaTagDescription,
        productId
      ),

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

    titleTag: (
      { productTitle, productId }: CatalogProduct,
      _: any,
      { clients: { segment } }: Context
    ) => toProductIOMessage('titleTag')(segment, productTitle, productId),

    specificationGroups: (
      product: CatalogProduct,
      _: any,
      { clients: { segment } }: Context
    ) => {
      const allSpecificationsGroups = propOr<[], CatalogProduct, string[]>(
        [],
        'allSpecificationsGroups',
        product
      ).concat(['allSpecifications'])
      const specificationGroups = allSpecificationsGroups.map(
        (groupName: string) => ({
          name: toSpecificationIOMessage('groupName')(
            segment,
            groupName,
            hashMD5(groupName)
          ),
          specifications: ((product as any)[groupName] || []).map(
            (name: string) => ({
              name: toSpecificationIOMessage('specificationName')(
                segment,
                name,
                hashMD5(name)
              ),
              values: ((product as any)[name] || []).map((value: string) =>
                toSpecificationIOMessage('specificationValue')(
                  segment,
                  value,
                  hashMD5(value)
                )
              ),
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
