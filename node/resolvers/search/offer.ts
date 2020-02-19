import { propOr } from 'ramda'

const InstallmentsCriteria = {
  ALL: 'ALL',
  MAX: 'MAX',
  MIN: 'MIN',
}

const gte = (a: number, b: number) => a > b
const lte = (a: number, b: number) => a < b

export const resolvers = {
  Offer: {
    Installments: (
      { Installments }: CommertialOffer,
      { criteria, rates }: { criteria?: string; rates?: boolean }
    ) => {
      if (criteria === InstallmentsCriteria.ALL || Installments.length === 0) {
        return Installments
      }
      const filteredInstallments = !rates
        ? Installments
        : Installments.filter(({ InterestRate }) => !InterestRate)

      const compareFunc = criteria === InstallmentsCriteria.MAX ? gte : lte
      const value = filteredInstallments.reduce(
        (acc, currentValue) =>
          compareFunc(
            currentValue.NumberOfInstallments,
            acc.NumberOfInstallments
          )
            ? currentValue
            : acc,
        filteredInstallments[0]
      )
      return [value]
    },
    teasers: propOr([], 'Teasers'),
    giftSkuIds: propOr([], 'GiftSkuIds'),
    productGifts: ({ GiftSkuIds }: CommertialOffer, _: any, ctx: Context) => {
      if (GiftSkuIds.length === 0) {
        return []
      }
      const giftProducts = Promise.all(
        GiftSkuIds.map(async skuId => {
          const searchResult = await ctx.clients.search.productBySku([skuId])
          const {
            productName,
            brand,
            linkText,
            description,
            productTitle,
            items,
          } = searchResult[0]
          const skuItem = items.find(item => item.itemId === skuId)

          const productGiftProperties = {
            productName,
            brand,
            linkText,
            description,
            productTitle,
            skuItem: {
              nameComplete: skuItem?.nameComplete ?? '',
              images: skuItem?.images.map(({ imageLabel, imageUrl, imageText }) => ({
                imageUrl,
                imageLabel,
                imageText,
               })) ?? [],
            },
          }

          return productGiftProperties
        })
      )

      return giftProducts
    },
    discountHighlights: propOr([], 'DiscountHighLight'),
  },
}
