import { prop } from 'ramda'

export const resolvers = {
  ItemMetadataUnit: {
    imageUrl: prop('MainImage'),
    skuName: prop('Name'),
    name: prop('NameComplete'),
    productId: prop('ProductId'),
  },
}
