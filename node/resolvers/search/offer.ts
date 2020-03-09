import { propOr } from 'ramda'

const InstallmentsCriteria = {
  ALL: 'ALL',
  MAX: 'MAX',
  MIN: 'MIN',
  MAX_WITHOUT_INTEREST: 'MAX_WITHOUT_INTEREST',
  MAX_WITH_INTEREST: 'MAX_WITH_INTEREST',
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

      /** TODO: Transforms arguments for backwards-compatibility. Should be cleaned up in the future */
      if (criteria === InstallmentsCriteria.MAX_WITH_INTEREST || criteria === InstallmentsCriteria.MAX_WITHOUT_INTEREST){
        rates = criteria === InstallmentsCriteria.MAX_WITHOUT_INTEREST
        criteria = InstallmentsCriteria.MAX
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
    gifts: async ({ GiftSkuIds }: CommertialOffer, _: any, ctx: Context) => {
      if (GiftSkuIds.length === 0) {
        return []
      }

      const giftProducts = await Promise.all(
        GiftSkuIds.map(async skuId => {
          const searchResult = await ctx.clients.search.productBySku([skuId])

          if (searchResult.length === 0) {
            return null
          }

          const {
            productName,
            brand,
            linkText,
            description,
            items,
          } = searchResult[0]
          const skuItem = items.find(item => item.itemId === skuId)
          const productGiftProperties = {
            productName,
            brand,
            linkText,
            description,
            skuName: skuItem?.nameComplete ?? '',
            images: skuItem?.images.map(({ imageLabel, imageUrl, imageText }) => ({
              imageUrl,
              imageLabel,
              imageText,
            })) ?? [],
          }

          return productGiftProperties
        })
      )
      const filteredGiftProducts = giftProducts.filter(Boolean)

      return filteredGiftProducts
    },
    discountHighlights: propOr([], 'DiscountHighLight'),
  },
}
