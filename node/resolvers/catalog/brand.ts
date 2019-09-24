import { prop } from 'ramda'

import { catalogSlugify } from '../../utils/slug'

export const resolvers = {
  Brand: {

    titleTag: prop('title'),

    active: prop('isActive'),

    cacheId: (brand: Brand) => catalogSlugify(brand.name),

    slug: (brand: Brand) => catalogSlugify(brand.name),
  },
}
