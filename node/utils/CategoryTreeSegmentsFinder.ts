import { searchSlugify } from './slug'
import { VBase } from '@vtex/api'
import { Search } from '../clients/search'
import { CATEGORY_TREE_CHILDREN_BUCKET, CATEGORY_TREE_ROOT_BUCKET, CATEGORY_TREE_ROOT_PATH } from '../resolvers/search/constants'
import { staleFromVBaseWhileRevalidate } from './vbase'
interface Clients{
  vbase: VBase
  search: Search
}

interface LazyCategoryTreeNode{
  id: number
  name: string
  hasChildren: boolean
}

export interface CategoryIdNamePair{
  id: string
  name: string
}

  
const getChildren = async (clients: Clients, id: number) => {
  return await lazyFetchChildren(clients, id)
}

/**
 * Fetches a category children from vbase or search
 * clients: {vbase: VBase, search: Search}
 */
const lazyFetchChildren = async (clients: Clients, id: number) => {
  const { vbase, search } = clients
  return await staleFromVBaseWhileRevalidate<Record<string, string>>(
    vbase, CATEGORY_TREE_CHILDREN_BUCKET, id.toString(), fetchChildrenFromSearch, {search, id})
}

const fetchChildrenFromSearch = async (params: { search: Search, id: number }): Promise<Record<string, string>> => {
  const {search, id} = params
  const categoryChildren = await search.getCategoryChildren(id)
  const categoryChildrenBySlug = Object.keys(categoryChildren).reduce((acc, categoryChildId: string) => {
    const categoryChildName = categoryChildren[categoryChildId]
    const categoryChildSlug = searchSlugify(categoryChildName)
    return {...acc, [categoryChildSlug]: categoryChildId}
  }, {} as Record<string, string>)
  return categoryChildrenBySlug
}

export class CategoryTreeSegmentsFinder {
  
  clients: Clients
  segments: string[]
  categoryTreeRoot: Record<string, LazyCategoryTreeNode>

  constructor(clients: Clients, segments: string[]){
    this.clients = clients
    this.segments = segments
    this.categoryTreeRoot = {}
  }

  private getCategoryTreeRoot = async () => {
    const categoryTree = await this.clients.search.categories(0)
    return categoryTree.reduce((acc, categoryTreeNode) => {
      const categorySlug = searchSlugify(categoryTreeNode.name)
      const lazyCategoryTreeNode = {
        id: categoryTreeNode.id,
        name: categoryTreeNode.name,
        hasChildren: categoryTreeNode.hasChildren,
      }
      return {...acc, [categorySlug]: lazyCategoryTreeNode}
    }, {} as Record<string, LazyCategoryTreeNode>)
  }

  private initCategoryTreeRoot = async () => {
    this.categoryTreeRoot = await staleFromVBaseWhileRevalidate<Record<string, LazyCategoryTreeNode>>(
      this.clients.vbase, CATEGORY_TREE_ROOT_BUCKET, CATEGORY_TREE_ROOT_PATH, this.getCategoryTreeRoot)
  }

  public find = async () => {
    const { segments } = this
    const result: Array<CategoryIdNamePair|null> = []
    await this.initCategoryTreeRoot()

    const rootCategorySegment = this.findRootCategorySegment()
    if(!rootCategorySegment){
      return []
    }
  
    const {category, index} = rootCategorySegment
  
    result[index] = {id: category.id.toString(), name: category.name}
    const segmentsTail = segments.slice(index+1)
    const categorySegmentsFromChildren = await this.findCategoriesFromChildren(category.id, segmentsTail)
    return result.concat(categorySegmentsFromChildren)
  }
  
  private findCategoriesFromChildren = async (categoryId: number, segments: string[]) => {
    const result: Array<CategoryIdNamePair|null> = []
    for(const segment of segments){
      const children = await getChildren(this.clients, categoryId)
      const childCategoryId = children[segment]
      if(childCategoryId){
        categoryId = Number(childCategoryId)
        result.push({ id: childCategoryId, name: segment })
      }else{
        result.push(null)
      }
    }
    return result
  }
  
  private findRootCategorySegment = () => {
    const { segments, categoryTreeRoot } = this
    for (let i = 0; i < segments.length; i++){
      const segment = segments[i]
      const category = categoryTreeRoot[segment]
      if(category){
        return {index: i, category}
      }
    }
    return null
  }
}