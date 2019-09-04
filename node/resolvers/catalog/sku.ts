import { find, head, map, replace, slice } from 'ramda'

import {
  toSKUIOMessage,
  // toSpecificationIOMessage,
} from './../../utils/ioMessage'
// import { hashMD5 } from './utils'

// interface SkuSpecification {
//   fieldName: Promise<TranslatableMessage>
//   fieldValues: Promise<TranslatableMessage>[]
// }

export const resolvers = {
  SKU: {
    attachments: ({ attachments = [] }: CatalogItem) =>
      map(
        (attachment: any) => ({
          ...attachment,
          domainValues: JSON.parse(attachment.domainValues),
        }),
        attachments
      ),

    images: (
      { images = [] }: CatalogItem,
      { quantity }: { quantity: number }
    ) =>
      map(
        image => ({
          cacheId: image.imageId,
          ...image,
          imageUrl: replace('http://', 'https://', image.imageUrl),
        }),
        quantity > 0 ? slice(0, quantity, images) : images
      ),

    kitItems: (
      { kitItems }: CatalogItem,
      _: any,
      { clients: { catalog } }: Context
    ) =>
      !kitItems
        ? []
        : kitItems.map(async kitItem => {
            const products = await catalog.productBySku([kitItem.itemId])
            const { items: skus = [], ...product } = head(products) || {}
            const sku = find(({ itemId }) => itemId === kitItem.itemId, skus)
            return { ...kitItem, product, sku }
          }),

    variations: (sku: CatalogItem) =>
      sku &&
      map(
        (name: string) => ({ name, values: (sku as any)[name] }),
        sku.variations || []
      ),

    videos: ({ Videos }: CatalogItem) =>
      map(
        (video: string) => ({
          videoUrl: video,
        }),
        Videos
      ),

    nameComplete: (
      { nameComplete, itemId }: CatalogItem,
      _: any,
      { clients: { segment } }: Context
    ) => toSKUIOMessage('nameComplete')(segment, nameComplete, itemId),

    // skuSpecifications: (
    //   sku: CatalogItem,
    //   _: any,
    //   { clients: { segment } }: Context
    // ) => {
    //   const { variations } = sku
    //   const skuSpecifications: SkuSpecification[] = []
    //   if (!variations) {
    //     return []
    //   }
    //   variations.forEach(variation => {
    //     const fieldValues: Promise<TranslatableMessage>[] = []
    //     const variationArray = (sku as any)[variation] as string[]
    //     variationArray.forEach(value => {
    //       fieldValues.push(
    //         toSpecificationIOMessage(`fieldValue`)(
    //           segment,
    //           value,
    //           hashMD5(value)
    //         )
    //       )
    //       skuSpecifications.push({
    //         fieldName: toSpecificationIOMessage('fieldName')(
    //           segment,
    //           variation,
    //           hashMD5(variation)
    //         ),
    //         fieldValues,
    //       })
    //     })
    //   })

    //   return skuSpecifications
    // },

    name: (
      { name, itemId }: CatalogItem,
      _: any,
      { clients: { segment } }: Context
    ) => toSKUIOMessage('name')(segment, name, itemId),
  },
}
