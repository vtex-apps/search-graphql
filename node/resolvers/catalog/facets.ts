import { prop, toPairs } from 'ramda'

import { toCategoryIOMessage, toFacetIOMessage } from '../../utils/ioMessage'
import { pathToCategoryHref } from './category'
import { zipQueryAndMap } from './utils'

interface EitherFacet extends CatalogFacet {
  Children?: EitherFacet[]
}

const addSelected = (
  facets: EitherFacet[],
  { query, map }: { query: string; map: string }
): EitherFacet[] => {
  return facets.map(facet => {
    let children = facet.Children

    if (children) {
      children = addSelected(children, { query, map })
    }

    const currentFacetSlug = decodeURIComponent(facet.Value).toLowerCase()
    const isSelected =
      zipQueryAndMap(query, map).find(
        ([slug, slugMap]) => slug === currentFacetSlug && facet.Map === slugMap
      ) !== undefined

    return {
      ...facet,
      Children: children,
      selected: isSelected,
    }
  })
}

const addId = (
  departments: CatalogFacet[],
  categoryTree: CatalogFacetCategory[]
) => {
  return departments.map(department => {
    const departmentInTree = categoryTree.find(
      category =>
        category.Name === department.Name && category.Link === department.Link
    )
    if (!departmentInTree) {
      return department
    }
    return {
      ...department,
      Id: departmentInTree.Id,
    }
  })
}

const baseFacetResolvers = {
  quantity: prop('Quantity'),
  name: prop('Name'),
  link: prop('Link'),
  linkEncoded: prop('LinkEncoded'),
  map: prop('Map'),
  value: prop('Value'),
}

export const resolvers = {
  FilterFacet: {
    ...baseFacetResolvers,

    name: async (
      { Map, Name }: CatalogFacet,
      _: any,
      { clients: { segment } }: Context
    ) => {
      const [, id] = Map.split('_')
      return toFacetIOMessage(segment, Name, id)
    },
  },
  DepartmentFacet: {
    ...baseFacetResolvers,

    id: prop('Id'),

    name: async (
      { Id, Name }: CatalogFacet & { Id?: number },
      _: any,
      { clients: { segment } }: Context
    ) => {
      return Id != null ? toCategoryIOMessage('name')(segment, Name, Id) : Name
    },
  },
  BrandFacet: {
    ...baseFacetResolvers,

    id: prop('Id'),
  },
  PriceRangesFacet: {
    ...baseFacetResolvers,

    slug: prop('Slug'),
  },
  CategoriesTreeFacet: {
    ...baseFacetResolvers,

    id: prop('Id'),

    children: prop('Children'),

    href: ({ Link }: { Link: string }) => {
      const [linkPath] = Link.split('?')
      return pathToCategoryHref(linkPath)
    },

    name: (
      { Id, Name }: CatalogFacetCategory,
      _: any,
      { clients: { segment } }: Context
    ) => toCategoryIOMessage('name')(segment, Name, Id),
  },
  Facets: {
    departments: ({
      Departments = [],
      CategoriesTrees = [],
      queryArgs,
    }: CatalogFacets & { queryArgs: { query: string; map: string } }) => {
      const withSelected = addSelected(Departments, queryArgs)
      const withCategoryId = addId(withSelected, CategoriesTrees)
      return withCategoryId
    },

    brands: ({
      Brands = [],
      queryArgs,
    }: CatalogFacets & { queryArgs: { query: string; map: string } }) => {
      return addSelected(Brands, queryArgs)
    },

    specificationFilters: ({
      SpecificationFilters = {},
      queryArgs,
    }: CatalogFacets & { queryArgs: { query: string; map: string } }) => {
      return toPairs(SpecificationFilters).map(([filterName, filterFacets]) => {
        return {
          name: filterName,
          facets: addSelected(filterFacets, queryArgs),
        }
      })
    },

    categoriesTrees: ({
      CategoriesTrees = [],
      queryArgs,
    }: CatalogFacets & { queryArgs: { query: string; map: string } }) => {
      return addSelected(CategoriesTrees, queryArgs)
    },

    priceRanges: prop('PriceRanges'),

    recordsFiltered: async (root: any, _: any, ctx: Context) => {
      const {
        clients: { catalog },
      } = ctx

      try {
        return catalog.productsQuantity(root.queryArgs)
      } catch (e) {
        return 0
      }
    },
  },
}
