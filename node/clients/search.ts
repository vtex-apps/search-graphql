import {
  InstanceOptions,
  IOContext,
  RequestConfig,
  SegmentData,
  ExternalClient,
} from '@vtex/api'
import { stringify } from 'qs'

import {
  searchEncodeURI,
  SearchCrossSellingTypes,
} from '../resolvers/search/utils'

interface AutocompleteArgs {
  maxRows: number | string
  searchTerm: string
}

const inflightKey = ({ baseURL, url, params, headers }: RequestConfig) => {
  return (
    baseURL! +
    url! +
    stringify(params, { arrayFormat: 'repeat', addQueryPrefix: true }) +
    `&segmentToken=${headers['x-vtex-segment']}`
  )
}

interface SearchPageTypeResponse {
  id: string
  pageType: string
  name: string
  url: string
  title: string | null
  metaTagDescription: string | null
}

const getHost = ({ platform }: IOContext) => {
  const isVtex = platform === 'vtex'
  const host = isVtex
    ? 'portal.vtexcommercestable.com.br'
    : 'api.gocommerce.com'
  return `http://${host}/`
}

const getCommonHeaders = ({
  authToken,
  operationId,
  segmentToken,
  storeUserAuthToken,
}: IOContext) => {
  return {
    'Accept-Encoding': 'gzip',
    'Proxy-Authorization': authToken,
    'User-Agent': process.env.VTEX_APP_ID!,
    ...(operationId ? { 'x-vtex-operation-id': operationId } : null),
    ...(segmentToken && { Cookie: `vtex_segment=${segmentToken}` }),
    ...(storeUserAuthToken
      ? { VtexIdclientAutCookie: storeUserAuthToken }
      : null),
    'X-Vtex-Use-Https': 'true',
  }
}

export class Search extends ExternalClient {
  private searchEncodeURI: (x: string) => string

  public constructor(ctx: IOContext, opts?: InstanceOptions) {
    super(getHost(ctx), ctx, {
      ...opts,
      headers: {
        ...(opts && opts.headers),
        ...getCommonHeaders(ctx),
      },
    })
    this.searchEncodeURI = searchEncodeURI(ctx.account)
  }

  public pageType(path: string, query: string = '') {
    const pageTypePath = path.startsWith('/') ? path.substr(1) : path

    const pageTypeQuery = !query || query.startsWith('?') ? query : `?${query}`
    return this.get<SearchPageTypeResponse>(
      this.routes.pageType(pageTypePath, pageTypeQuery)
    )
  }

  public product(slug: string) {
    return this.get<SearchProduct[]>(
      this.routes.product(this.searchEncodeURI(slug && slug.toLowerCase())),
      { metric: 'search-product' }
    )
  }

  public productByEan(id: string) {
    return this.get<SearchProduct[]>(this.routes.productByEan(id), {
      metric: 'search-productByEan',
    })
  }

  public productsByEan(ids: string[]) {
    return this.get<SearchProduct[]>(this.routes.productsByEan(ids), {
      metric: 'search-productByEan',
    })
  }

  public productById(id: string) {
    return this.get<SearchProduct[]>(this.routes.productById(id), {
      metric: 'search-productById',
    })
  }

  public productsById(ids: string[]) {
    return this.get<SearchProduct[]>(this.routes.productsById(ids), {
      metric: 'search-productById',
    })
  }

  public productByReference(id: string) {
    return this.get<SearchProduct[]>(this.routes.productByReference(id), {
      metric: 'search-productByReference',
    })
  }

  public productsByReference(ids: string[]) {
    return this.get<SearchProduct[]>(this.routes.productsByReference(ids), {
      metric: 'search-productByReference',
    })
  }

  public productBySku(skuIds: string[]) {
    return this.get<SearchProduct[]>(this.routes.productBySku(skuIds), {
      metric: 'search-productBySku',
    })
  }

  public products(args: SearchArgs, useRaw = false) {
    const method = useRaw ? this.getRaw : this.get
    return method<SearchProduct[]>(
      this.routes.products(this.productSearchUrl(args)),
      {
        metric: 'search-products',
      }
    )
  }

  public async productsQuantity(args: SearchArgs) {
    const {
      headers: { resources },
    } = await this.getRaw(this.routes.products(this.productSearchUrl(args)), {
      metric: 'search-products-quantity',
    })
    const quantity = resources.split('/')[1]
    return parseInt(quantity, 10)
  }

  public brands() {
    return this.get<Brand[]>(this.routes.brands, {
      metric: 'search-brands',
    })
  }

  public brand(id: number) {
    return this.get<Brand[]>(this.routes.brand(id), {
      metric: 'search-brand-id',
    })
  }

  public categories(treeLevel: number) {
    return this.get<CategoryTreeResponse[]>(this.routes.categories(treeLevel), {
      metric: 'search-categories',
    })
  }

  public facets(facets: string = '') {
    const [path, options] = decodeURI(facets).split('?')
    return this.get<SearchFacets>(
      this.routes.facets(
        this.searchEncodeURI(
          encodeURI(`${path.trim()}${options ? '?' + options : ''}`)
        )
      ),
      { metric: 'search-facets' }
    )
  }

  public category(id: string | number) {
    return this.get<CategoryByIdResponse>(this.routes.category(id), {
      metric: 'search-category',
    })
  }

  public crossSelling(id: string, type: SearchCrossSellingTypes) {
    return this.get<SearchProduct[]>(this.routes.crossSelling(id, type), {
      metric: 'search-crossSelling',
    })
  }

  public autocomplete({ maxRows, searchTerm }: AutocompleteArgs) {
    return this.get<{ itemsReturned: SearchAutocompleteUnit[] }>(
      this.routes.autocomplete(
        maxRows,
        this.searchEncodeURI(encodeURIComponent(searchTerm))
      ),
      { metric: 'search-autocomplete' }
    )
  }

  protected get = async <T = any>(url: string, config: RequestConfig = {}) => {
    const segmentData: SegmentData | undefined = (this
      .context! as CustomIOContext).segment
    const { channel: salesChannel = '' } = segmentData || {}
    const { account } = this.context

    config.params = {
      ...config.params,
      an: account,
      ...(!!salesChannel && { sc: salesChannel }),
    }

    config.inflightKey = inflightKey
    return this.http.get<T>(url, config)
  }

  protected getRaw = async <T = any>(
    url: string,
    config: RequestConfig = {}
  ) => {
    const segmentData: SegmentData | undefined = (this
      .context! as CustomIOContext).segment
    const { channel: salesChannel = '' } = segmentData || {}
    const { account } = this.context

    config.params = {
      ...config.params,
      an: account,
      ...(!!salesChannel && { sc: salesChannel }),
    }

    config.inflightKey = inflightKey
    return this.http.getRaw<T>(url, config)
  }

  private get routes() {
    const { platform, account } = this.context
    const isVtex = platform === 'vtex'
    const base = isVtex ? 'api/catalog_system/' : `${account}/search/`
    return {
      pageType: (path: string, query: string) =>
        `${base}pub/portal/pagetype/${path}${query}`,
      product: (slug: string) => `${base}pub/products/search/${slug}/p`,
      productByEan: (id: string) =>
        `${base}pub/products/search?fq=alternateIds_Ean:${id}`,
      productsByEan: (ids: string[]) =>
        `${base}pub/products/search?${ids
          .map(id => `fq=alternateIds_Ean:${id}`)
          .join('&')}`,
      productById: (id: string) =>
        `${base}${
          isVtex ? 'pub/products/search?fq=productId:' : 'products/'
        }${id}`,
      productsById: (ids: string[]) =>
        `${base}pub/products/search?${ids
          .map(id => `fq=productId:${id}`)
          .join('&')}`,
      productByReference: (id: string) =>
        `${base}pub/products/search?fq=alternateIds_RefId:${id}`,
      productsByReference: (ids: string[]) =>
        `${base}pub/products/search?${ids
          .map(id => `fq=alternateIds_RefId:${id}`)
          .join('&')}`,
      productBySku: (skuIds: string[]) =>
        `${base}pub/products/search?${skuIds
          .map(skuId => `fq=skuId:${skuId}`)
          .join('&')}`,
      products: (searchUrl: string) => `${base}${searchUrl}`,
      productsQuantity: (searchUrl: string) => `${base}${searchUrl}`,
      brands: `${base}pub/brand/list`,
      brand: (id: string | number) => `${base}pub/brand/${id}`,
      categories: (level: number | string) =>
        `${base}pub/category/tree/${level}`,
      facets: (searchUrl: string) => `${base}pub/facets/search/${searchUrl}`,
      category: (id: string | number) => `${base}pub/category/${id}`,
      crossSelling: (id: string, type: SearchCrossSellingTypes) =>
        `${base}pub/products/crossselling/${type}/${id}`,
      autocomplete: (maxRows: string | number, searchTerm: string) =>
        `buscaautocomplete?maxRows=${maxRows}&productNameContains=${searchTerm}`,
    }
  }

  private productSearchUrl = ({
    query = '',
    category = '',
    specificationFilters,
    priceRange = '',
    collection = '',
    salesChannel = '',
    orderBy = '',
    from = 0,
    to = 9,
    map = '',
    hideUnavailableItems = false,
  }: SearchArgs) => {
    const sanitizedQuery = this.searchEncodeURI(
      encodeURIComponent(decodeURIComponent(query || '').trim())
    )

    if (hideUnavailableItems) {
      const segmentData = (this.context as CustomIOContext).segment
      salesChannel = (segmentData && segmentData.channel.toString()) || ''
    }
    let url = `pub/products/search/${sanitizedQuery}?`
    if (category && !query) {
      url += `&fq=C:/${category}/`
    }
    if (specificationFilters && specificationFilters.length > 0) {
      url += specificationFilters.map(filter => `&fq=${filter}`)
    }
    if (priceRange) {
      url += `&fq=P:[${priceRange}]`
    }
    if (collection) {
      url += `&fq=productClusterIds:${collection}`
    }
    if (salesChannel) {
      url += `&fq=isAvailablePerSalesChannel_${salesChannel}:1`
    }
    if (orderBy) {
      url += `&O=${orderBy}`
    }
    if (map) {
      url += `&map=${map}`
    }
    if (from != null && from > -1) {
      url += `&_from=${from}`
    }
    if (to != null && to > -1) {
      url += `&_to=${to}`
    }
    return url
  }
}
