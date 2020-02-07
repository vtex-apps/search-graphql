import { Search } from '../../clients/search'
import { VBase } from '@vtex/api'
import {
  SEARCH_URLS_BUCKET,
  CLUSTER_SEGMENT,
  CATEGORY_SEGMENT,
  FACETS_BUCKET,
} from './constants'
import { CategoryTreeSegmentsFinder, CategoryIdNamePair } from '../../utils/CategoryTreeSegmentsFinder'
import { staleFromVBaseWhileRevalidate } from '../../utils/vbase'
import { searchSlugify } from '../../utils/slug'
import { PATH_SEPARATOR, MAP_SEPARATOR } from '../stats/constants'

export const hasFacetsBadArgs = ({ query, map }: QueryArgs) => !query || !map

export const toCompatibilityArgs = async (vbase:VBase, search: Search, args: QueryArgs): Promise<QueryArgs|undefined> => {
  const {query} = args
  if(!query){
    return
  }
  const { query: compatibilityQuery, map: compatibilityMap } = await staleFromVBaseWhileRevalidate(
    vbase, SEARCH_URLS_BUCKET, query, mountCompatibilityQuery, {vbase, search, args} )
  return { query: compatibilityQuery, map: compatibilityMap }
}

const mountCompatibilityQuery = async (params: {vbase: VBase, search: Search, args: any}) => {
  const {vbase, search, args} = params
  const { query, map } = args
  const querySegments = query.startsWith(PATH_SEPARATOR)? query.split(PATH_SEPARATOR).slice(1): query.split(PATH_SEPARATOR)
  const mapSegments = map.split(MAP_SEPARATOR)

  const categoryTreeFinder = new CategoryTreeSegmentsFinder({vbase, search}, querySegments)
  const categories = await categoryTreeFinder.find()
  const facetsQuery = getFacetsQueryFromCategories(categories)
  
  const fieldsLookup = facetsQuery? await getCategoryFilters(vbase, search, facetsQuery): {}

  const compatMapSegments = []
  const compatQuerySegments = []

  for(let segmentIndex = 0; segmentIndex < querySegments.length; segmentIndex++ ) {
    const querySegment = querySegments[segmentIndex]
    const [fieldName, fieldValue] = querySegment.split('_')
    const compatMapSegmentField = fieldsLookup[fieldName]
    const mapSegment = !categories[segmentIndex] && !compatMapSegmentField && mapSegments.shift()
    
    if(compatMapSegmentField && !categories[segmentIndex]){
      compatMapSegments.push(compatMapSegmentField)
      compatQuerySegments.push(fieldValue)
    }else{
      compatMapSegments.push(mapSegment || 'c')
      compatQuerySegments.push(querySegment)
    }
  }

  const { query: joinedQuerySegments, map: joinedCategoryMapSegments } = joinCategories(compatQuerySegments, compatMapSegments)
  
  const compatibilityQuery = joinedQuerySegments.join('/')
  const compatibilityMap = joinedCategoryMapSegments.join(',')
  return { query: compatibilityQuery, map: compatibilityMap}
}

const normalizeName = (name: string): string => searchSlugify(name)

const joinCategories = (querySegments: string[], mapSegments: string[]) => {
  const result : { query: string[], map: string[] } = { query: querySegments, map: mapSegments }
  for (let i = 0; i < mapSegments.length - 1; i++){
    const mapSegment = mapSegments[i]
    const querySegment = querySegments[i]
    const nextMapSegment = mapSegments[i + 1]
    const nextQuerySegment = querySegments[i + 1]

    const shouldShift = hasNoClusterIdAsFirstSegment(i, mapSegment) && hasCategoryMissplaced(mapSegment, nextMapSegment)

    if(shouldShift){
      result.map[i] = nextMapSegment
      result.query[i] = nextQuerySegment
      result.query[i+1] = querySegment
      result.map[i+1] = mapSegment
    }
  }
  return result
}

const hasCategoryMissplaced = (mapSegment: string, nextMapSegment: string): boolean => {
  return (mapSegment !== CATEGORY_SEGMENT &&
    nextMapSegment === CATEGORY_SEGMENT)
}

const getFacetsQueryFromCategories = (categories: (CategoryIdNamePair|null)[]) => {
  const queryArgs = categories.reduce((acc: QueryArgs, category) => {
    if(category){
      acc.query = acc.query? acc.query + PATH_SEPARATOR + category.name.toLocaleLowerCase(): category.name.toLocaleLowerCase()
      acc.map = acc.map? acc.map + MAP_SEPARATOR + CATEGORY_SEGMENT: CATEGORY_SEGMENT
    }
    return acc
  }, {query: '', map: ''} as QueryArgs)
  return !hasFacetsBadArgs(queryArgs)? `${queryArgs.query}?map=${queryArgs.map}`: null
}

const getCategoryFilters = async (vbase: VBase, search: Search, query: string) => {
  const facets = await staleFromVBaseWhileRevalidate<SearchFacets>(
    vbase, FACETS_BUCKET, query, search.facets, query)
  return normalizedFiltersFromFacets(facets)
}

const normalizedFiltersFromFacets = async (facets: SearchFacets) => {
  const specificationFilters = facets['SpecificationFilters']
  return Object.keys(specificationFilters).reduce((acc, filterKey) => {
    const facets = specificationFilters[filterKey]
    const normalizedFilterName = normalizeName(filterKey)
    acc[normalizedFilterName] = facets[0].Map
    return acc
  }, {} as Record<string, string>)
}

function hasNoClusterIdAsFirstSegment(index: number, mapSegment: string) {
  return !(index === 0 && mapSegment === CLUSTER_SEGMENT)
}

