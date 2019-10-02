import { prop } from 'ramda'

import { toBrandIOMessage } from './../../utils/ioMessage'
import { catalogSlugify } from '../../utils/slug'

export const resolvers = {
  Brand: {
    name: ({ name, id }: Brand, _: any, { clients: { segment } }: Context) =>
      toBrandIOMessage('name')(segment, name, id),

    titleTag: (
      { title, id }: Brand,
      _: any,
      { clients: { segment } }: Context
    ) => title && toBrandIOMessage('titleTag')(segment, title, id),

    metaTagDescription: (
      { metaTagDescription, id }: Brand,
      _: any,
      { clients: { segment } }: Context
    ) =>
      metaTagDescription &&
      toBrandIOMessage('metaTagDescription')(segment, metaTagDescription, id),

    active: prop('isActive'),

    cacheId: (brand: Brand) => catalogSlugify(brand.name),

    slug: (brand: Brand) => catalogSlugify(brand.name),
  },
}
