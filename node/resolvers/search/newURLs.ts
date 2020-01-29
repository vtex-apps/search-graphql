import { Search } from '../../clients/search'
import { VBase } from '@vtex/api'
import {
  SPEC_FILTER,
  SEARCH_URLS_BUCKET,
  CLUSTER_SEGMENT,
  CATEGORY_SEGMENT,
  SPEC_FILTERS_URLS_BUCKET,
} from './constants'
import { CategoryTreeSegmentsFinder } from '../../utils/CategoryTreeSegmentsFinder'
import { staleFromVBaseWhileRevalidate } from '../../utils/vbase'
import { last } from 'ramda'
import { searchSlugify } from '../../utils/slug'

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
  const querySegments = query.startsWith('/')? query.split('/').slice(1): query.split('/')
  const mapSegments = map.split(',')

  const categoryTreeFinder = new CategoryTreeSegmentsFinder({vbase, search}, querySegments)
  const categories = await categoryTreeFinder.find()
  const lastCategory = categories.filter(category=>!!category).pop()
  
  const ambiguousFields = await getCategoryFields(vbase, search, lastCategory!)  
  const fieldsLookup = removeFieldsAmbiguity(ambiguousFields)

  const compatMapSegments = []
  const compatQuerySegments = []

  for(let segmentIndex = 0; segmentIndex < querySegments.length; segmentIndex++ ) {
    const querySegment = querySegments[segmentIndex]
    const [fieldName, fieldValue] = querySegment.split('_')
    const compatMapSegmentFields = fieldsLookup[fieldName]
    const mapSegment = !categories[segmentIndex] && !compatMapSegmentFields && mapSegments.shift()
    
    if(compatMapSegmentFields && !categories[segmentIndex]){
      const field = last(compatMapSegmentFields.sort((field1, field2) => field1.FieldId - field2.FieldId))
      compatMapSegments.push(`${SPEC_FILTER}_${field.FieldId}`)
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
const removeFieldsAmbiguity = (fields: FieldTreeResponseAPI[]) => {
  // Somehow there are global specification filters. 
  // These filters don't have a categoryId and have priority over category filters
    return fields.reduce((acc, field) => {
      if(!field.IsActive){
        return acc
      }
      const fieldName = normalizeName(field.Name)

      if(!acc[fieldName]){
        acc[fieldName] = []
      }

      acc[fieldName].push(field)
      return acc
  }, {} as Record<string, FieldTreeResponseAPI[]>)
}

const getCategoryFields = async (vbase: VBase, search: Search, categoryId: string) => {
  return staleFromVBaseWhileRevalidate<FieldTreeResponseAPI[]>(
    vbase, SPEC_FILTERS_URLS_BUCKET, categoryId, search.getFieldsByCategoryId, categoryId )
}

function hasNoClusterIdAsFirstSegment(index: number, mapSegment: string) {
  return !(index === 0 && mapSegment === CLUSTER_SEGMENT)
}

