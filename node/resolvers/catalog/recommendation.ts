import { CatalogCrossSellingTypes } from './utils'

export const resolvers = {
  Recommendation: {
    buy: (
      { productId }: CatalogProduct,
      _: any,
      { clients: { catalog } }: Context
    ) =>
      catalog.crossSelling(
        productId,
        CatalogCrossSellingTypes.whoboughtalsobought
      ),

    similars: (
      { productId }: CatalogProduct,
      _: any,
      { clients: { catalog } }: Context
    ) => catalog.crossSelling(productId, CatalogCrossSellingTypes.similars),

    view: (
      { productId }: CatalogProduct,
      _: any,
      { clients: { catalog } }: Context
    ) =>
      catalog.crossSelling(productId, CatalogCrossSellingTypes.whosawalsosaw),
  },
}
