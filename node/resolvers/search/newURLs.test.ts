/* eslint-disable @typescript-eslint/no-unused-vars */

import * as TypeMoq from 'typemoq'
import { VBase, IOContext } from "@vtex/api"
import { Search } from '../../clients/search'
import { mountCompatibilityQuery } from './newURLs'


const context = TypeMoq.Mock.ofType<IOContext>()
const categoryTreeResponseMock = TypeMoq.Mock.ofType<CategoryTreeResponse>()
const facetsMock = TypeMoq.Mock.ofType<SearchFacets>()
const vbaseTypeMock = TypeMoq.Mock.ofInstance(VBase)

describe('Search new URLs dicovery', () => {

  const vbase = class VBaseMock extends vbaseTypeMock.object {
    private jsonData: any = {}

    public constructor(){
      super(context.object)
    }
    
    public getJSON = async <T>(bucket: string, _path: string, _nullIfNotFound?: boolean | undefined): Promise<T> => {
      return Promise.resolve(this.jsonData[bucket] as T)
    }

    public saveJSON = async <T>(_bucket: string, _path: string, _data: T): Promise<void> => {
      return
    }

    public setJSON(data: any) {
      this.jsonData = data
    }
  }

  const search = class SearchMock extends Search {
    private categoriesResponse: CategoryTreeResponse[]
    private categoryChildrenResponse: Record<number, Record<string, string>>
    private facetsResponse: SearchFacets

    public constructor(categories: CategoryTreeResponse[], categoryChildren: Record<number, Record<string, string>>, facets: SearchFacets){
      super(context.object)
      this.categoriesResponse = categories
      this.categoryChildrenResponse = categoryChildren
      this.facetsResponse = facets
    }
    
    public categories = async (_: number) => {
      return Promise.resolve(this.categoriesResponse)
    }

    public getCategoryChildren = (id: number) => {
      return Promise.resolve(this.categoryChildrenResponse[id])
    }

    public facets = (_?: string) => {
      return Promise.resolve(this.facetsResponse)
    }
  }


  it('Should transform /category in /category?map=c', async () => {
    const args = {
      query: 'category',
      map: ''
    }

    const categoryTree: CategoryTreeResponse[] = [
      {
        ...categoryTreeResponseMock.object,
        id: 1,
        name: 'category',
        hasChildren: false,
      }
    ]

    const facets = {
      SpecificationFilters: {},
      ...facetsMock.object
    }

    const vbaseMock = new vbase()
    const searchMock = new search(categoryTree, {}, facets)
    const result = await mountCompatibilityQuery({vbase: vbaseMock, search: searchMock, args})
    expect(result).toStrictEqual({query: 'category', map: 'c'})
  })

  it('Should transform /department/category/subcategory in /department/category/subcategory?map=c,c,c', async () => {
    const args = {
      query: 'department/category/subcategory',
      map: ''
    }

    const categoryTree: CategoryTreeResponse[] = [
      {
        ...categoryTreeResponseMock.object,
        id: 1,
        name: 'department',
        hasChildren: true,
      }
    ]

    const categoryChildren = {
      1: {'2': 'category'},
      2: {'3': 'subcategory'}
    }

    const facets = {
      SpecificationFilters: {},
      ...facetsMock.object
    }

    const vbaseMock = new vbase()
    const searchMock = new search(categoryTree, categoryChildren, facets)
    const result = await mountCompatibilityQuery({vbase: vbaseMock, search: searchMock, args})
    expect(result).toStrictEqual({query: 'department/category/subcategory', map: 'c,c,c'})
  })

  it('Should transform /category/brand?map=b in /category?map=c,b', async () => {
    const args = {
      query: 'category/brand',
      map: 'b'
    }

    const categoryTree: CategoryTreeResponse[] = [
      {
        ...categoryTreeResponseMock.object,
        id: 1,
        name: 'category',
        hasChildren: false,
      }
    ]

    const categoryChildren = { 1: {} }

    const facets = {
      SpecificationFilters: {},
      ...facetsMock.object
    }

    const vbaseMock = new vbase()
    const searchMock = new search(categoryTree, categoryChildren, facets)
    const result = await mountCompatibilityQuery({vbase: vbaseMock, search: searchMock, args})
    expect(result).toStrictEqual({query: 'category/brand', map: 'c,b'})
  })

  it('Should transform /collection?map=productClusterIds in /collection?map=productClusterIds', async () => {
    const args = {
      query: 'collection',
      map: 'productClusterIds'
    }

    const categoryTree: CategoryTreeResponse[] = []

    const categoryChildren = {}

    const facets = {
      SpecificationFilters: {},
      ...facetsMock.object
    }

    const vbaseMock = new vbase()
    const searchMock = new search(categoryTree, categoryChildren, facets)
    const result = await mountCompatibilityQuery({vbase: vbaseMock, search: searchMock, args})
    expect(result).toStrictEqual({query: 'collection', map: 'productClusterIds'})
  })

  it('Should transform /filterxpto?map=specificationFilter_0 in /filterxpto?map=specificationFilter_0', async () => {
    const args = {
      query: 'filterxpto',
      map: 'specificationFilter_0'
    }

    const categoryTree: CategoryTreeResponse[] = []

    const categoryChildren = {}

    const facets = {
      SpecificationFilters: {},
      ...facetsMock.object
    }

    const vbaseMock = new vbase()
    const searchMock = new search(categoryTree, categoryChildren, facets)
    const result = await mountCompatibilityQuery({vbase: vbaseMock, search: searchMock, args})
    expect(result).toStrictEqual({query: 'filterxpto', map: 'specificationFilter_0'})
  })

  it('Should transform /department/style_1/color_2/size_3 in /department/1/2/3?map=c,specificationFilter_1,specificationFilter_2,specificationFilter_3', async () => {
    const args = {
      query: 'department/style_1/color_2/size_3',
      map: ''
    }

    const categoryTree: CategoryTreeResponse[] = [
      {
        ...categoryTreeResponseMock.object,
        id: 1,
        name: 'department',
        hasChildren: false,
      }
    ]

    const categoryChildren = { 1: {} }

    const facets = {
      SpecificationFilters: {
        style: [
          {
              Name: "1",
              Map: "specificationFilter_1",
              Value: "1"
          },
        ],
        color: [
          {
              Name: "2",
              Map: "specificationFilter_2",
              Value: "2"
          },
        ],
        size: [
          {
              Name: "3",
              Map: "specificationFilter_3",
              Value: "3"
          },
        ]
      },
      ...facetsMock.object
    }

    const vbaseMock = new vbase()
    const searchMock = new search(categoryTree, categoryChildren, facets)
    const result = await mountCompatibilityQuery({vbase: vbaseMock, search: searchMock, args})
    expect(result).toStrictEqual({query: 'department/1/2/3', map: 'c,specificationFilter_1,specificationFilter_2,specificationFilter_3'})
  })
})