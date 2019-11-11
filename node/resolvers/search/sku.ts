import { find, head, map, tail } from 'ramda'

enum ImagesFilter {
  WITH_LABEL = 'WITH_LABEL',
}

export const resolvers = {
  SKU: {
    attachments: ({ attachments = [] }: SearchItem) =>
      map(
        (attachment: any) => ({
          ...attachment,
          domainValues: JSON.parse(attachment.domainValues),
        }),
        attachments
      ),

    images: (
      { images = [] }: SearchItem,
      { quantity, filter }: { quantity: number; filter: ImagesFilter }
    ) => {
      let filtered = images
      if (filter === ImagesFilter.WITH_LABEL && images.length > 1) {
        // We still want to return the first image because it usually is the main image
        filtered = [
          head(images),
          ...tail(images).filter(({ imageLabel }) => !!imageLabel),
        ]
      }

      const sliced =
        quantity > 0 && quantity > filtered.length
          ? filtered.slice(0, quantity)
          : filtered
      return sliced.map(image => ({
        cacheId: image.imageId,
        ...image,
        imageUrl: image.imageUrl.replace('http://', 'https://'),
      }))
    },

    kitItems: (
      { kitItems }: SearchItem,
      _: any,
      { clients: { search } }: Context
    ) =>
      !kitItems
        ? []
        : kitItems.map(async kitItem => {
            const products = await search.productBySku([kitItem.itemId])
            const { items: skus = [], ...product } = head(products) || {}
            const sku = find(({ itemId }) => itemId === kitItem.itemId, skus)
            return { ...kitItem, product, sku }
          }),

    variations: (sku: SearchItem) =>
      sku &&
      map(
        (name: string) => ({ name, values: (sku as any)[name] }),
        sku.variations || []
      ),

    videos: ({ Videos }: SearchItem) =>
      map(
        (video: string) => ({
          videoUrl: video,
        }),
        Videos
      ),
  },
}
