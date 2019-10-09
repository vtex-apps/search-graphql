import { find, head, map, replace, slice } from 'ramda'

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
  },
}
