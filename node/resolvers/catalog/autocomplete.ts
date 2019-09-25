import { path, split } from 'ramda'

import { toIOMessage, toProductIOMessage } from '../../utils/ioMessage'

/**
 * It will extract the slug from the HREF in the item
 * passed as parameter.
 *
 * That is needed once the API provide only the old link
 * (from CMS portal) to access the product page, nothing
 * more.
 *
 * HREF provided:
 * https://portal.vtexcommercestable.com.br/:slug/p
 *
 * @param item The item to extract the information
 */
const extractSlug = (item: CatalogAutocompleteUnit) => {
  const href = split('/', item.href)
  return item.criteria ? `${href[3]}/${href[4]}` : href[3]
}

export const resolvers = {
  Items: {
    name: (
      { name, items }: CatalogAutocompleteUnit,
      _: any,
      { clients: { segment } }: Context
    ) => {
      const id = path<string>([0, 'productId'], items)
      return id != null
        ? toProductIOMessage('name')(segment, name, id)
        : toIOMessage(segment, name, name)
    },

    slug: (root: CatalogAutocompleteUnit) => extractSlug(root),

    productId: ({ items }: CatalogAutocompleteUnit) =>
      items ? path([0, 'productId'], items) : null,
  },
}
