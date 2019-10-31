import { SearchCrossSellingTypes } from './utils'

export const resolvers = {
  Recommendation: {
    buy: (
      { productId }: SearchProduct,
      _: any,
      { clients: { search } }: Context
    ) =>
      search.crossSelling(
        productId,
        SearchCrossSellingTypes.whoboughtalsobought
      ),

    similars: (
      { productId }: SearchProduct,
      _: any,
      { clients: { search } }: Context
    ) => search.crossSelling(productId, SearchCrossSellingTypes.similars),

    view: (
      { productId }: SearchProduct,
      _: any,
      { clients: { search } }: Context
    ) =>
      search.crossSelling(productId, SearchCrossSellingTypes.whosawalsosaw),
  },
}
