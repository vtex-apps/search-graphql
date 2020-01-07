import { Search } from '../../clients/search'
import { zip, flatten } from 'ramda'
import { VBase } from '@vtex/api'
import {
  LEGACY_SEARCH_URLS_BUCKET,
  SPEC_FILTER,
  FILTER_TITLE_SEP,
  SPACE_REPLACER,
  MAP_QUERY_KEY,
  PATH_SEPARATOR,
  MAP_VALUES_SEP,
} from './constants'
import { categoryTreeSearch } from '../../utils/categoryTreeSearch'


export async function getOrCreateCanonical(vbase: VBase, search: Search, searchArgs: SearchArgs){
  
  const { query, map } = searchArgs
  const uri = `${query}?${MAP_QUERY_KEY}=${map}`

  const canonical = await getCanonical(vbase, uri) || await createCanonical(search, query!, map!)
  vbase.saveJSON(LEGACY_SEARCH_URLS_BUCKET, uri, canonical)
  return canonical
}

const enrichSegmentName = async (catalog: Search, segment: string, mapValue: string) => {
  const [fieldName, fieldValue] = mapValue.split(FILTER_TITLE_SEP)
  if(fieldName === SPEC_FILTER && !isNaN(Number(fieldValue))) {
    const { Name: specificationFilterName } = await catalog.getField(Number(fieldValue))
    return `${specificationFilterName.toLocaleLowerCase()}${FILTER_TITLE_SEP}${segment}`.replace(/\s/g, SPACE_REPLACER)
  }
    
  return segment
}

const getCanonical = async (vbase: VBase, uri: string): Promise<string|undefined> => {
  return await vbase.getJSON(LEGACY_SEARCH_URLS_BUCKET, uri, true) as string
}

const createCanonical = async (search: Search, segments: string, queryMap: string) => {
  const pathSegments = segments.startsWith(PATH_SEPARATOR)? segments.slice(1).split(PATH_SEPARATOR): segments.split(PATH_SEPARATOR)
  const mapSegments = queryMap.split(MAP_VALUES_SEP)
  const zippedSegments = zip(pathSegments, mapSegments)
  const enrichedPathSegments: string[] = []
  for (const [segment, mapValue] of zippedSegments) {
    enrichedPathSegments.push(await enrichSegmentName(search, segment, mapValue))
  }
  return `${PATH_SEPARATOR}${enrichedPathSegments.join(PATH_SEPARATOR)}`
}

export const toCompatibilityArgs = async <T extends QueryArgs>(vbase:VBase, search: Search, args: T): Promise<T> => {
  const { query: compatibilityQuery, map: compatibilityMap } = await lazyCompatibilityQuery(vbase, search, args)
  args.query = compatibilityQuery
  args.map = compatibilityMap
  
  return args
}

const lazyCompatibilityQuery = async (vbase: VBase, search: Search, args: any) => {
  const { query } = args
  const cachedCompatibilityQuery = await vbase.getJSON<{ query:string, map: string }>('searchPaths', query, true)
  
  if(cachedCompatibilityQuery){
    return {...args, ...cachedCompatibilityQuery}
  }
  
  const compatibilityQuery = await mountCompatibilityQuery(search, args)
  return compatibilityQuery
}

const mountCompatibilityQuery = async (search: Search, args: any) => {
  const { query, map } = args
  const querySegments = query.startsWith('/')? query.split('/').slice(1): query.split('/')
  const mapSegments = map.split(',')

  const categoryTree = await search.categories(querySegments.length)
  const categories = categoryTreeSearch(categoryTree, query)
  const fields = flatten(
    await Promise.all(
      categories.map(category => search.getFieldsByCategoryId(category.id))))

  const compatMapSegments = []
  const compatQuerySegments = []

  for(let segmentIndex = 0; segmentIndex < querySegments.length; segmentIndex++ ) {
    const querySegment = querySegments[segmentIndex]
    const [fieldName, fieldValue] = querySegment.split('_')
    const compatMapSegment = fields.find(field => normalizeName(field.Name) === fieldName)
    const mapSegment = !categories[segmentIndex] && !compatMapSegment && mapSegments.shift()
    
    if(compatMapSegment){
      compatMapSegments.push(`${SPEC_FILTER}_${compatMapSegment.FieldId}`)
      compatQuerySegments.push(fieldValue)
    }else{
      compatMapSegments.push(mapSegment || 'c')
      compatQuerySegments.push(querySegment)
    }
  }
  
  const compatibilityQuery = compatQuerySegments.join('/')
  const compatibilityMap = compatMapSegments.join(',')
  return { query: compatibilityQuery, map: compatibilityMap}
}

const normalizeName = (name: string): string => name.replace(/\s/g, '-').toLocaleLowerCase()