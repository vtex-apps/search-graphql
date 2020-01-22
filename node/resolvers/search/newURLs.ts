import { Search, FieldTreeResponseAPI } from '../../clients/search'
import { VBase } from '@vtex/api'
import {
  SPEC_FILTER,
  SEARCH_URLS_BUCKET,
  CLUSTER_SEGMENT,
  CATEGORY_SEGMENT,
} from './constants'
import { CategoryTreeSegmentsFinder } from '../../utils/CategoryTreeSegmentsFinder'
import { staleFromVBaseWhileRevalidate } from '../../utils/vbase'

export const toCompatibilityArgs = async <T extends QueryArgs>(vbase:VBase, search: Search, args: T): Promise<T> => {
  const {query} = args
  const { query: compatibilityQuery, map: compatibilityMap } = await staleFromVBaseWhileRevalidate(
    vbase, SEARCH_URLS_BUCKET, query!, mountCompatibilityQuery, {vbase, search, args} )
  args.query = compatibilityQuery
  args.map = compatibilityMap

  return args
}

const mountCompatibilityQuery = async (params: {vbase: VBase, search: Search, args: any}) => {
  const {vbase, search, args} = params
  const { query, map } = args
  const querySegments = query.startsWith('/')? query.split('/').slice(1): query.split('/')
  const mapSegments = map.split(',')

  const categoryTreeFinder = new CategoryTreeSegmentsFinder({vbase, search}, querySegments)
  const categories = await categoryTreeFinder.find()

  const ambiguousFields =
    await Promise.all(
      categories.filter(categoryId => categoryId).map(categoryId => search.getFieldsByCategoryId(categoryId)))
  
  const fieldsLookup = removeFieldsAmbuguity(ambiguousFields)

  const compatMapSegments = []
  const compatQuerySegments = []

  for(let segmentIndex = 0; segmentIndex < querySegments.length; segmentIndex++ ) {
    const querySegment = querySegments[segmentIndex]
    const [fieldName, fieldValue] = querySegment.split('_')
    const compatMapSegment = fieldsLookup[fieldName]
    const mapSegment = !categories[segmentIndex] && !compatMapSegment && mapSegments.shift()
    
    if(compatMapSegment){
      compatMapSegments.push(`${SPEC_FILTER}_${compatMapSegment.FieldId}`)
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

const normalizeName = (name: string): string => name.replace(/\s/g, '-').toLocaleLowerCase()

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
const removeFieldsAmbuguity = (ambiguousFields: FieldTreeResponseAPI[][]) => {
  // Somehow there are global specification filters. 
  // These filters don't have a categoryId and have priority over category filters
  return ambiguousFields.reduce((acc, fields) => {
    return fields.reduce((accAux, field) => {
      const fieldName = normalizeName(field.Name)
      const fieldFound = accAux[fieldName]
      accAux[fieldName] = field
      if (fieldFound && !fieldFound.CategoryId) {
        accAux[fieldName] = fieldFound
      }
      return acc
    }, acc)
  }, {} as Record<string, FieldTreeResponseAPI>)
}

function hasNoClusterIdAsFirstSegment(index: number, mapSegment: string) {
  return !(index === 0 && mapSegment === CLUSTER_SEGMENT)
}

