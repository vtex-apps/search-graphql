interface SearchArgs {
  query: string | null
  category: string | null
  specificationFilters: string[] | null
  priceRange: string | null
  collection: string | null
  salesChannel: string | null
  orderBy: string | null
  from: number | null
  to: number | null
  map: string | null
  hideUnavailableItems: boolean | null
  skipSimulation?: boolean | null
}

interface Metadata {
  metaTagDescription?: string
  titleTag?: string
}

interface Brand {
  id: string
  name: string
  isActive: boolean
  title: string | null
  metaTagDescription: string | null
  imageUrl: string | null
}

interface CategoryTreeResponse {
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: CategoryTreeResponse[]
  Title: string
  MetaTagDescription: string
}

interface CategoryByIdResponse {
  parentId: number | null
  GlobalCategoryId: number
  GlobalCategoryName: string
  position: number
  slug: string
  id: number
  name: string
  hasChildren: boolean
  url: string
  children: null
  Title: string
  MetaTagDescription: string
}

interface FacetsArgs {
  query: string
  map: string
  hideUnavailableItems: boolean
}

interface SearchProduct {
  productId: string
  productName: string
  brand: string
  brandId: number
  linkText: string
  productReference: string
  categoryId: string
  productTitle: string
  metaTagDescription: string
  clusterHighlights: Record<string, string>
  productClusters: Record<string, string>
  searchableClusters: Record<string, string>
  categories: string[]
  categoriesIds: string[]
  link: string
  description: string
  items: SearchItem[]
  itemMetadata: {
    items: SearchMetadataItem[]
  }
  titleTag: string
  Specifications?: string[]
  allSpecifications?: string[]
  allSpecificationsGroups?: string[]
}

// This type is meant to reflect EXACTLY what is returned from the API.
// If you want to artificially add fields in your resolvers and have types for it, use the EnhancedSearchItem type.
interface SearchItem {
  itemId: string
  name: string
  nameComplete: string
  complementName: string
  ean: string
  referenceId: { Key: string; Value: string }[]
  measurementUnit: string
  unitMultiplier: number
  modalType: any | null
  images: SearchImage[]
  Videos: string[]
  variations: string[]
  sellers: Seller[]
  attachments: {
    id: number
    name: string
    required: boolean
    domainValues: string
  }[]
  isKit: boolean
  kitItems?: {
    itemId: string
    amount: number
  }[]
}

interface EnhancedSearchItem extends SearchItem {
  skippedSimulation?: boolean
}

interface SearchImage {
  imageId: string
  imageLabel: string | null
  imageTag: string
  imageUrl: string
  imageText: string
}

interface SearchInstallment {
  Value: number
  InterestRate: number
  TotalValuePlusInterestRate: number
  NumberOfInstallments: number
  PaymentSystemName: string
  PaymentSystemGroupName: string
  Name: string
}

interface CommertialOffer {
  DeliverySlaSamplesPerRegion: Record<
    string,
    { DeliverySlaPerTypes: any[]; Region: any | null }
  >
  Installments: SearchInstallment[]
  DiscountHighLight: any[]
  GiftSkuIds: string[]
  Teasers: any[]
  BuyTogether: any[]
  ItemMetadataAttachment: any[]
  Price: number
  ListPrice: number
  PriceWithoutDiscount: number
  RewardValue: number
  PriceValidUntil: string
  AvailableQuantity: number
  Tax: number
  DeliverySlaSamples: {
    DeliverySlaPerTypes: any[]
    Region: any | null
  }[]
  GetInfoErrorMessage: any | null
  CacheVersionUsedToCallCheckout: string
}

interface Seller {
  sellerId: string
  sellerName: string
  addToCartLink: string
  sellerDefault: boolean
  commertialOffer: CommertialOffer
}

interface SearchFacet {
  Quantity: number
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
}

interface SearchFacetCategory {
  Id: number
  Quantity: number
  Name: string
  Link: string
  LinkEncoded: string
  Map: string
  Value: string
  Children: SearchFacetCategory[]
}

interface SummaryItem {
  DisplayedItems: number
  TotalItems: number
}

interface SearchFacets {
  Departments: SearchFacet[]
  Brands: SearchFacet[]
  SpecificationFilters: Record<string, SearchFacet[]>
  CategoriesTrees: SearchFacetCategory[]
  PriceRanges: {
    Slug: string
    Quantity: number
    Name: string
    Link: string
    LinkEncoded: string
    Map: null
    Value: string
  }[]
  Summary: {
    Departments: SummaryItem
    CategoriesTrees: SummaryItem
    Brands: SummaryItem
    PriceRanges: SummaryItem
    SpecificationFilters: Record<string, SummaryItem>
  }
}

interface SearchAutocompleteItem {
  productId: string
  itemId: string
  name: string
  nameComplete: string
  imageUrl: string
}

interface SearchAutocompleteUnit {
  items: SearchAutocompleteItem[]
  thumb: string
  thumbUrl: string | null
  name: string
  href: string
  criteria: string
}
