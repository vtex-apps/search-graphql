# Search GraphQL

This app exports a GraphQL schema for search results on VTEX Stores.

The default implementation for this schema is on [vtex.search-resolver](https://github.com/vtex-apps/search-resolver) app.

### Usage

To use it in your app, declare it on your `manifest.json` file, as demonstrated below:

```json
"dependencies": {
  "vtex.search-graphql": "0.x"
}
```

You may then use it in your front end component queries, for example, write file `productQuery.gql`:

```graphql
query ProductQuery($slug: String) {
  product(identifier: { field: slug, value: $slug}) @context(provider: "vtex.search-graphql") {
    productName
  }
}
```

To resolve this query, you need to have an app that implements the schema declared in this app, such as: [vtex.search-resolver](https://github.com/vtex-apps/search-resolver).

<details>

<summary><strong>Table of Contents</strong></summary>

- [Query](#query)
- [Objects](#objects)
  - [AssemblyOption](#assemblyoption)
  - [Attachment](#attachment)
  - [Banners](#banners)
  - [Benefit](#benefit)
  - [BenefitItem](#benefititem)
  - [Brand](#brand)
  - [BrandFacet](#brandfacet)
  - [CategoriesTreeFacet](#categoriestreefacet)
  - [Category](#category)
  - [ClusterHighlight](#clusterhighlight)
  - [CompositionItem](#compositionitem)
  - [CompositionType](#compositiontype)
  - [Correction](#correction)
  - [DeliverySlaPerTypes](#deliveryslapertypes)
  - [DeliverySlaSamples](#deliveryslasamples)
  - [DepartmentFacet](#departmentfacet)
  - [Discount](#discount)
  - [DomainValues](#domainvalues)
  - [Facet](#facet)
  - [FacetValue](#facetvalue)
  - [Facets](#facets)
  - [FilterFacet](#filterfacet)
  - [FilterFacets](#filterfacets)
  - [Gift](#gift)
  - [GiftImage](#giftimage)
  - [Image](#image)
  - [InputValue](#inputvalue)
  - [Installment](#installment)
  - [ItemMetadata](#itemmetadata)
  - [ItemMetadataUnit](#itemmetadataunit)
  - [ItemPriceTable](#itempricetable)
  - [Items](#items)
  - [KitItem](#kititem)
  - [Offer](#offer)
  - [OnlyProduct](#onlyproduct)
  - [PageType](#pagetype)
  - [PriceRange](#pricerange)
  - [PriceRangesFacet](#pricerangesfacet)
  - [PriceTableItem](#pricetableitem)
  - [Product](#product)
  - [ProductClusters](#productclusters)
  - [ProductPriceRange](#productpricerange)
  - [ProductSearch](#productsearch)
  - [ProductSuggestions](#productsuggestions)
  - [Property](#property)
  - [PropertyGroup](#propertygroup)
  - [QueryArgs](#queryargs)
  - [Range](#range)
  - [Recommendation](#recommendation)
  - [Reference](#reference)
  - [Region](#region)
  - [SKU](#sku)
  - [SKUSpecificationField](#skuspecificationfield)
  - [SKUSpecificationValue](#skuspecificationvalue)
  - [SearchBanner](#searchbanner)
  - [SearchBreadcrumb](#searchbreadcrumb)
  - [SearchCorrection](#searchcorrection)
  - [SearchMetadata](#searchmetadata)
  - [SearchSuggestion](#searchsuggestion)
  - [SearchSuggestionAttribute](#searchsuggestionattribute)
  - [SearchSuggestions](#searchsuggestions)
  - [SearchURLStats](#searchurlstats)
  - [SelectedFacet](#selectedfacet)
  - [SelectedProperty](#selectedproperty)
  - [Seller](#seller)
  - [SkuSpecification](#skuspecification)
  - [SpecificationGroup](#specificationgroup)
  - [SpecificationGroupProperty](#specificationgroupproperty)
  - [Suggestions](#suggestions)
  - [Teaser](#teaser)
  - [TeaserCondition](#teasercondition)
  - [TeaserEffects](#teasereffects)
  - [TeaserValue](#teaservalue)
  - [Video](#video)
  - [productSpecification](#productspecification)
- [Inputs](#inputs)
  - [AssemblyOptionInput](#assemblyoptioninput)
  - [Options](#options)
  - [ProductUniqueIdentifier](#productuniqueidentifier)
  - [SelectedFacetInput](#selectedfacetinput)
    - [General filters](#general-filters)
- [Enums](#enums)
  - [CategoryTreeBehavior](#categorytreebehavior)
  - [CrossSelingInputEnum](#crossselinginputenum)
  - [FilterType](#filtertype)
  - [InputValueType](#inputvaluetype)
  - [InstallmentsCriteria](#installmentscriteria)
  - [ItemsFilter](#itemsfilter)
  - [Operator](#operator)
  - [PageEntityIdentifier](#pageentityidentifier)
  - [ProductUniqueIdentifierField](#productuniqueidentifierfield)
  - [SORT](#sort)
  - [SimulationBehavior](#simulationbehavior)
- [Scalars](#scalars)
  - [Boolean](#boolean)
  - [Float](#float)
  - [ID](#id)
  - [Int](#int)
  - [String](#string)
  - [StringOrBoolean](#stringorboolean)

</details>

## Query

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>product</strong></td>
            <td valign="top"><a href="#product">Product</a></td>
            <td>Returns a specified product.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">slug</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Product slug.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">identifier</td>
            <td valign="top"><a href="#productuniqueidentifier">ProductUniqueIdentifier</a></td>
            <td>Product identifier.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">regionId</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Seller ID encoded with base64 according to this format: <code>SW#{sellerId}</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">salesChannel</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Trade Policy.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>banners</strong></td>
            <td valign="top"><a href="#banners">Banners</a></td>
            <td>Lists the banners registered for a given query. Check the <a href="https://help.vtex.com/en/tracks/vtex-intelligent-search--19wrbB7nEQcmwzDPl1l4Cb/4ViKEivLJtJsvpaW0aqIQ5">configuring banners documentation</a> for a full explanation of the banner feature.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fullText</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Search term. It can contain any character.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">selectedFacets</td>
            <td valign="top">[<a href="#selectedfacetinput">SelectedFacetInput</a>]</td>
            <td>List of the selected facets. The order in which the terms appear is not relevant to the search. You can also repeat the same <code>facetKey</code> several times for different values.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>correction</strong></td>
            <td valign="top"><a href="#correction">Correction</a></td>
            <td>Tries to correct a misspelled term from the search.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fullText</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Search term. It can contain any character.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>searchSuggestions</strong></td>
            <td valign="top"><a href="#searchsuggestions">SearchSuggestions</a></td>
            <td>Lists suggested terms similar to the search term.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fullText</td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td>Search term. It can contain any character.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productSearch</strong></td>
            <td valign="top"><a href="#productsearch">ProductSearch</a></td>
            <td>Lists the products for a given query.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">query</td>
            <td valign="top"><a href="#string">String</a></td>
            <td><b>Deprecated</b>. Use <code>fullText</code> instead.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fullText</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Search term. It can contain any character.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">map</td>
            <td valign="top"><a href="#string">String</a></td>
            <td><b>Deprecated</b>. Use <code>selectedFacets</code> instead.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">selectedFacets</td>
            <td valign="top">[<a href="#selectedfacetinput">SelectedFacetInput</a>]</td>
            <td>List of the selected facets. The order in which the terms appear is not relevant to the search. You can also repeat the same <code>facetKey</code> several times for different values.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">category</td>
            <td valign="top"><a href="#string">String</a></td>
            <td><b>Deprecated</b>. Use <code>selectedFacets</code> instead.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">specificationFilters</td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td><b>Deprecated</b>. Use <code>selectedFacets</code> instead.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">priceRange</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Filter by price range. e.g.: {a} TO {b} - {a} is the minimum price "from" and {b} is the highest price "to"</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">collection</td>
            <td valign="top"><a href="#string">String</a></td>
            <td><b>Deprecated</b>. Use <code>selectedFacets</code> instead.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">salesChannel</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Filter by availability at a specific sales channel. e.g.: salesChannel:4 if want filter by available products for the sales channel 4.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">orderBy</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Sort by a criteria: <ul><li><code>OrderByPriceDESC/OrderByPriceASC</code>: Price, in descending (<code>DESC</code>) or ascending (<code>ASC</code>) order.</li><li><code>OrderByTopSaleDESC</code>: Amount of orders in the past 90 days, in descending order.</li><li><code>OrderByReviewRateDESC</code>: Review rates, in descending (<code>DESC</code>) order.</li><li><code>OrderByNameASC/OrderByNameDESC</code>: Name, in descending (<code>DESC</code>) or ascending (<code>ASC</code>) alphabetical order.</li><li><code>OrderByReleaseDateDESC</code>: Release date, in descending (<code>DESC</code>) order. </li><li><code>OrderByBestDiscountDESC</code>: Discount percentage in descending (<code>DESC</code>) order.</li><li><code>OrderByScoreDESC</code>: Score, in descending (<code>DESC</code>) order.</li></ul> If you want to sort textually by a specification, use the format <code>{specification key}:{asc|desc}</code>. For example: <code>material:asc</code> or <code>material:desc</code>. This always sorts values textually (not numerically) and it works only on <code>vtex.search-resolver@1.x</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">from</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Pagination item start. Default value: `0`.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">to</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Pagination item end. Default value: `9`.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">hideUnavailableItems</td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>If true, uses <code>isAvailablePerSalesChannel_</code> parameter on query with segment's sales channel. Will override any given <code>salesChannel</code> argument.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">simulationBehavior</td>
            <td valign="top"><a href="#simulationbehavior">SimulationBehavior</a></td>
            <td>If you want faster searches and do not care about most up to date prices and promotions, use skip value.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">productOriginVtex</td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Each search engine has its own database, but this database might not have all the product information like <code>clusterHighlights</code> or <code>productClusters</code>. As an alternative, the search engine may use the VTEX API to complete this information by setting this field to true.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">operator</td>
            <td valign="top"><a href="#operator">Operator</a></td>
            <td>Indicates how the search engine will deal with the fullText if there is more than one word. Set the value as <code>and</code> if the returned products must have all the words in its metadata. Otherwise, set the value as <code>or</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fuzzy</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Indicates how the search engine will correct misspelled words by using fuzzy logic. It can be a number representing the max number of misspelled letters, or the string <code>auto</code> suggesting that the search engine should set this value by itself.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">searchState</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>As fuzzy and operator, it controls the search state, but it is for general purposes. This field allows the search engines to apply features that are not handled by the other fields. The possible values in this field are defined by each search engine.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">options</td>
            <td valign="top"><a href="#options">Options</a></td>
            <td>Search options that customize the search result.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>searchMetadata</strong></td>
            <td valign="top"><a href="#searchmetadata">SearchMetadata</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">query</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Terms that are used in search, for example <code>eletronics/samsung</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fullText</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Text inputted by the user as the search term.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">map</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Defines term types: Brand, Category, Department. For example: <code>c,b</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">selectedFacets</td>
            <td valign="top">[<a href="#selectedfacetinput">SelectedFacetInput</a>]</td>
            <td>List of the selected facets. The order in which the terms appear is not relevant to the search. You can also repeat the same <code>facetKey</code> several times for different values.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>products</strong></td>
            <td valign="top">[<a href="#product">Product</a>]</td>
            <td>Returns products list filtered and ordered.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">query</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Terms that are used in search, for example <code>eletronics/samsung</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">map</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Defines term types: Brand, Category, Department. For example: <code>c,b</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">category</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Filter by category. For example, <code>{a}/{b}</code>, where <code>{a}</code> and <code>{b}</code> are categoryIds.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">specificationFilters</td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td>Array of product specification. For example, <code>specificationFilter_{a}:{b}</code> where <code>{a}</code> is the specificationId, and <code>{b}</code> is the specification value.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">priceRange</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Filter by price range. For example, <code>{a} TO {b}</code>, where <code>{a}</code> is the minimum price "from" and <code>{b}</code> is the highest price "to".</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">collection</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Filter by collection, also known as productClusterId.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">salesChannel</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Filter by availability at a specific sales channel, also known as trade policy. For example, <code>salesChannel:4</code> if you want to filter by available products for the sales channel whose ID is 4.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">orderBy</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Sort by a criteria: <ul><li><code>OrderByPriceDESC/OrderByPriceASC</code>: Price, in descending (<code>DESC</code>) or ascending (<code>ASC</code>) order.</li><li><code>OrderByTopSaleDESC</code>: Amount of orders in the past 90 days, in descending order.</li><li><code>OrderByReviewRateDESC</code>: Review rates, in descending (<code>DESC</code>) order.</li><li><code>OrderByNameASC/OrderByNameDESC</code>: Name, in descending (<code>DESC</code>) or ascending (<code>ASC</code>) alphabetical order.</li><li><code>OrderByReleaseDateDESC</code>: Release date, in descending (<code>DESC</code>) order. </li><li><code>OrderByBestDiscountDESC</code>: Discount percentage in descending (<code>DESC</code>) order.</li><li><code>OrderByScoreDESC</code>: Score, in descending (<code>DESC</code>) order.</li></ul></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">from</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Pagination item start. Default value: `0`.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">to</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Pagination item end. Default value: `9`.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">hideUnavailableItems</td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>If true, uses <code>isAvailablePerSalesChannel_</code> parameter on query with segment's sales channel. Will override any given salesChannel argument.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">simulationBehavior</td>
            <td valign="top"><a href="#simulationbehavior">SimulationBehavior</a></td>
            <td>If you want faster searches and do not care about most up to date prices and promotions, use skip value.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productRecommendations</strong></td>
            <td valign="top">[<a href="#product">Product</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">identifier</td>
            <td valign="top"><a href="#productuniqueidentifier">ProductUniqueIdentifier</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">type</td>
            <td valign="top"><a href="#crossselinginputenum">CrossSelingInputEnum</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">groupBy</td>
            <td valign="top"><a href="#crossselinggroupbyenum">CrossSelingGroupByEnum</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productsByIdentifier</strong></td>
            <td valign="top">[<a href="#product">Product</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">field</td>
            <td valign="top"><a href="#productuniqueidentifierfield">ProductUniqueIdentifierField</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">values</td>
            <td valign="top">[<a href="#id">ID</a>!]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">salesChannel</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Filter by availability at a specific sales channel.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>facets</strong></td>
            <td valign="top"><a href="#facets">Facets</a></td>
            <td>Returns facets category.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">query</td>
            <td valign="top"><a href="#string">String</a></td>
            <td><b>Deprecated</b>. Use <code>fullText</code> instead.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fullText</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Search term. It can contain any character.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">map</td>
            <td valign="top"><a href="#string">String</a></td>
            <td><b>Deprecated</b>. Use <code>selectedFacets</code> instead.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">selectedFacets</td>
            <td valign="top">[<a href="#selectedfacetinput">SelectedFacetInput</a>]</td>
            <td>List of the selected facets. The order in which the terms appear is not relevant to the search. You can also repeat the same <code>facetKey</code> several times for different values.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">hideUnavailableItems</td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>If true, uses <code>isAvailablePerSalesChannel_</code> parameter on query with segment's sales channel.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">removeHiddenFacets</td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>If true, remove hidden facets from the result.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">behavior</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>If Static, ignores SpecificationFilters received on the map and query when returning the facets available, which means the facets never change.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">operator</td>
            <td valign="top"><a href="#operator">Operator</a></td>
            <td>Indicates how the search engine will deal with the fullText if there is more than one word. Set the value as <code>and</code> if the returned products must have all the words in its metadata. Otherwise, set the value as <code>or</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fuzzy</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Indicates how the search engine will correct misspelled words by using fuzzy logic. It can be a number representing the max number of misspelled letters, or the string <code>auto</code> suggesting that the search engine should set this value by itself.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">searchState</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>As fuzzy and operator, it controls the search state, but it is for general purposes. This field allows the search engines to apply features that are not handled by the other fields. The possible values in this field are defined by each search engine.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">from</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Pagination item start. Default value: `0`.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">to</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Pagination item end. Default value: `9`.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">categoryTreeBehavior</td>
            <td valign="top"><a href="#categorytreebehavior">CategoryTreeBehavior</a></td>
            <td>Determines the behavior of the category tree.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">initialAttributes</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Initial attributes (based on the <code>initialMap</code> parameter).</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>autocomplete</strong></td>
            <td valign="top"><a href="#suggestions">Suggestions</a></td>
            <td>Get autocomplete suggestions in search.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">maxRows</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Number of items that are returned.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">searchTerm</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Terms that are used in search, for example `iphone`.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>topSearches</strong></td>
            <td valign="top"><a href="#searchsuggestions">SearchSuggestions</a></td>
            <td>Lists the 10 most searched terms.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>autocompleteSearchSuggestions</strong></td>
            <td valign="top"><a href="#searchsuggestions">SearchSuggestions</a></td>
            <td>Lists the suggested terms and attributes similar to the search term.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fullText</td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td>Search term. It can contain any character.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productSuggestions</strong></td>
            <td valign="top"><a href="#productsuggestions">ProductSuggestions</a></td>
            <td>Get product suggestions.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">fullText</td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td>Text inputted by the user as the search term.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">facetKey</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Selected facet key.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">facetValue</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Selected facet value.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">productOriginVtex</td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Each search engine has its own database, but this database might not have all the product information like <code>clusterHighlights</code> or <code>productClusters</code>. As an alternative, the search engine may use the VTEX API to complete this information by setting this field to true.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">simulationBehavior</td>
            <td valign="top"><a href="#simulationbehavior">SimulationBehavior</a></td>
            <td>If you want faster searches and do not care about most up to date prices and promotions, use skip value.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">hideUnavailableItems</td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>If true, uses <code>isAvailablePerSalesChannel_</code> parameter on query with segment's sales channel.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">regionId</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Seller ID encoded with base64 according to this format: <code>SW#{sellerId}</code>.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">salesChannel</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Sales Channel related to the region ID.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">orderBy</td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Sort by a criteria: <ul><li><code>OrderByPriceDESC/OrderByPriceASC</code>: Price, in descending (<code>DESC</code>) or ascending (<code>ASC</code>) order.</li><li><code>OrderByTopSaleDESC</code>: Amount of orders in the past 90 days, in descending order.</li><li><code>OrderByReviewRateDESC</code>: Review rates, in descending (<code>DESC</code>) order.</li><li><code>OrderByNameASC/OrderByNameDESC</code>: Name, in descending (<code>DESC</code>) or ascending (<code>ASC</code>) alphabetical order.</li><li><code>OrderByReleaseDateDESC</code>: Release date, in descending (<code>DESC</code>) order. </li><li><code>OrderByBestDiscountDESC</code>: Discount percentage in descending (<code>DESC</code>) order.</li><li><code>OrderByScoreDESC</code>: Score, in descending (<code>DESC</code>) order.</li> </ul> If you want to sort textually by a specification, use the format <code>{specification key}:{asc|desc}</code>. For example: <code>material:asc</code> or <code>material:desc</code>. This always sorts values textually (not numerically) and it works only on <code>vtex.search-resolver@1.x</code>.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>searchURLsCount</strong></td>
            <td valign="top">[<a href="#searchurlstats">SearchURLStats</a>]</td>
            <td>Get search URLs access stats count.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">limit</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Number of items that are returned.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">sort</td>
            <td valign="top"><a href="#sort">SORT</a></td>
            <td>Sorting strategy, where `asc` means ascending, and `desc` means descending.</td>
        </tr>
    </tbody>
</table>

## Objects

### AssemblyOption

| Field | Argument | Type | Description |
| --- | --- | --- | --- |
| id | [ID](#id) |  |  |
| name | [String](#string) |  |  |
| required | [Boolean](#boolean) |  |  |
| composition | [CompositionType](#compositiontype) |  |  |
| inputValues | [InputValue](#inputvalue)[] |  |  |

### Attachment

| Field | Argument | Type | Description |
| --- | --- | --- | --- |
| id | [ID](#id) |  |  |
| name | [String](#string) |  |  |
| required | [Boolean](#boolean) |  |  |
| domainValues | [DomainValues](#domainvalues)[] |  |  |

### Banners

| Field | Argument | Type | Description |
| --- | --- | --- | --- |
| banners | [SearchBanner](#searchbanner)[] |  | List of banners. |

### Benefit

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>featured</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Indicates if the benefit is featured or not.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>ID of the product to which the benefit is associated.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Name of the benefit.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>items</strong></td>
            <td valign="top">[<a href="#benefititem">BenefitItem</a>]</td>
            <td>Items of the benefit.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>teaserType</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Type of benefit.</td>
        </tr>
    </tbody>
</table>

### BenefitItem

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>benefitProduct</strong></td>
            <td valign="top"><a href="#product">Product</a></td>
            <td>Product itself.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>benefitSKUIds</strong></td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td>IDs of the SKUs that are taking part in the benefit.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>discount</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td>Discount applied to the benefit product.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>minQuantity</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Minimum quantity of the benefit product that is required to validate the benefit.</td>
        </tr>
    </tbody>
</table>

### Brand

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>cacheId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td>Slug is used as cacheId.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Brand ID.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageUrl</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Brand logo.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>slug</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Text link.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Name of the brand.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>titleTag</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Title used by HTML title tag.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>metaTagDescription</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Description used by HTML tag.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>active</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Indicates if the brand is active.</td>
        </tr>
    </tbody>
</table>

### BrandFacet

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#id">ID</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>quantity</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>link</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkEncoded</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>map</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>selected</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a>!</td>
            <td></td>
        </tr>
    </tbody>
</table>

### CategoriesTreeFacet

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#id">ID</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>quantity</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>link</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkEncoded</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>href</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td>Contains slugified links according to the store structure, such as <code>/:department/d</code>, <code>/:category/:subcategory</code>, etc.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>map</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>children</strong></td>
            <td valign="top">[<a href="#categoriestreefacet">CategoriesTreeFacet</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>selected</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a>!</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Category

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>cacheId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td>Category ID is used as cacheId.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>href</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>URI of category.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>slug</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Category text link.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Category ID.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Category name.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>titleTag</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Title used by HTML title tag.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>hasChildren</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Description used by HTML tag.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>metaTagDescription</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Indicates if the category has children categories.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>children</strong></td>
            <td valign="top">[<a href="#category">Category</a>]</td>
            <td>Category children.</td>
        </tr>
    </tbody>
</table>

### ClusterHighlight

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### CompositionItem

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>minQuantity</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>maxQuantity</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>initialQuantity</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>priceTable</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>seller</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### CompositionType

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>minQuantity</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>maxQuantity</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>items</strong></td>
            <td valign="top">[<a href="#compositionitem">CompositionItem</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Correction

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>correction</strong></td>
            <td valign="top"><a href="#searchcorrection">SearchCorrection</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### DeliverySlaPerTypes

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>TypeName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>Price</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>EstimatedTimeSpanToDelivery</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### DeliverySlaSamples

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>DeliverySlaPerTypes</strong></td>
            <td valign="top">[<a href="#deliveryslapertypes">DeliverySlaPerTypes</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>Region</strong></td>
            <td valign="top"><a href="#region">Region</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### DepartmentFacet

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#id">ID</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>quantity</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>link</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkEncoded</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>map</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>selected</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a>!</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Discount

Discount object

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Discount name</td>
        </tr>
    </tbody>
</table>

### DomainValues

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>FieldName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>MaxCaracters</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>DomainValues</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Facet

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>values</strong></td>
            <td valign="top">[<a href="#facetvalue">FacetValue</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">from</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">to</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>type</strong></td>
            <td valign="top"><a href="#filtertype">FilterType</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>hidden</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>quantity</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### FacetValue

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>quantity</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>key</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>selected</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>children</strong></td>
            <td valign="top">[<a href="#facetvalue">FacetValue</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>range</strong></td>
            <td valign="top"><a href="#range">Range</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>link</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkEncoded</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>href</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Facets

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>departments</strong> ⚠️</td>
            <td valign="top">[<a href="#departmentfacet">DepartmentFacet</a>]</td>
            <td><p>⚠️ <strong>DEPRECATED</strong></p><blockquote>Use <code>facets</code> instead.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>brands</strong> ⚠️</td>
            <td valign="top">[<a href="#brandfacet">BrandFacet</a>]</td>
            <td><p>⚠️ <strong>DEPRECATED</strong></p><blockquote>Use <code>facets</code> instead.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>specificationFilters</strong></td>
            <td valign="top">[<a href="#filterfacets">FilterFacets</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>categoriesTrees</strong> ⚠️</td>
            <td valign="top">[<a href="#categoriestreefacet">CategoriesTreeFacet</a>]</td>
                <td><p>⚠️ <strong>DEPRECATED</strong></p><blockquote>Use  <code>facets</code> instead.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>priceRanges</strong></td>
            <td valign="top">[<a href="#pricerangesfacet">PriceRangesFacet</a>]</td>
            <td>Price range for the given query.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>recordsFiltered</strong> ⚠️</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td><p>⚠️ <strong>DEPRECATED</strong></p><blockquote>Use <code>recordsFiltered</code> from <code>productSearch</code> instead.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>queryArgs</strong></td>
            <td valign="top"><a href="#queryargs">QueryArgs</a></td>
            <td>Information about the searched query.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>facets</strong></td>
            <td valign="top">[<a href="#facet">Facet</a>]</td>
            <td>List of facets.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>sampling</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Indicates whether there was sampling in the aggregation of facets or not. In search results that have many products, only the first 30000 will be aggregated to avoid performance issues.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>breadcrumb</strong></td>
            <td valign="top">[<a href="#searchbreadcrumb">SearchBreadcrumb</a>]</td>
            <td>Generated breadcrumb for the given query.</td>
        </tr>
    </tbody>
</table>

### FilterFacet

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>quantity</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>link</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkEncoded</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>map</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>selected</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a>!</td>
            <td></td>
        </tr>
    </tbody>
</table>

### FilterFacets

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>facets</strong></td>
            <td valign="top">[<a href="#filterfacet">FilterFacet</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Gift

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>productName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>skuName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>brand</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkText</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>description</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>images</strong></td>
            <td valign="top">[<a href="#giftimage">GiftImage</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### GiftImage

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>imageUrl</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageLabel</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageText</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Image

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>cacheId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageLabel</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageTag</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageUrl</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageText</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### InputValue

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>label</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>maxLength</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>type</strong></td>
            <td valign="top"><a href="#inputvaluetype">InputValueType</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>defaultValue</strong></td>
            <td valign="top"><a href="#stringorboolean">StringOrBoolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>domain</strong></td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Installment

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>Value</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>InterestRate</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>TotalValuePlusInterestRate</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>NumberOfInstallments</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>PaymentSystemName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>PaymentSystemGroupName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>Name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### ItemMetadata

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>items</strong></td>
            <td valign="top">[<a href="#itemmetadataunit">ItemMetadataUnit</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>priceTable</strong></td>
            <td valign="top">[<a href="#itempricetable">ItemPriceTable</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### ItemMetadataUnit

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>skuName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productId</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>refId</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>ean</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>imageUrl</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>detailUrl</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>seller</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>assemblyOptions</strong></td>
            <td valign="top">[<a href="#assemblyoption">AssemblyOption</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### ItemPriceTable

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>type</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>values</strong></td>
            <td valign="top">[<a href="#pricetableitem">PriceTableItem</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Items

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>thumb</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>href</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>criteria</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>slug</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productId</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### KitItem

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>itemId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>amount</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>product</strong></td>
            <td valign="top"><a href="#onlyproduct">OnlyProduct</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>sku</strong></td>
            <td valign="top"><a href="#sku">SKU</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Offer

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>Installments</strong></td>
            <td valign="top">[<a href="#installment">Installment</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">criteria</td>
            <td valign="top"><a href="#installmentscriteria">InstallmentsCriteria</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">rates</td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">excludedPaymentSystems</td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">includedPaymentSystems</td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>Price</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>ListPrice</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>spotPrice</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>PriceWithoutDiscount</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>RewardValue</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>PriceValidUntil</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>AvailableQuantity</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>Tax</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>taxPercentage</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>CacheVersionUsedToCallCheckout</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>DeliverySlaSamples</strong></td>
            <td valign="top">[<a href="#deliveryslasamples">DeliverySlaSamples</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>discountHighlights</strong></td>
            <td valign="top">[<a href="#discount">Discount</a>!]</td>
            <td>List of discount highlights.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>teasers</strong></td>
            <td valign="top">[<a href="#teaser">Teaser</a>!]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>giftSkuIds</strong></td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td>List of SKUs for gifts associated with the product.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>gifts</strong></td>
            <td valign="top">[<a href="#gift">Gift</a>]</td>
            <td>List of gifts associated with the product.</td>
        </tr>
    </tbody>
</table>

### OnlyProduct

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>brand</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>categoryId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>categoryTree</strong></td>
            <td valign="top">[<a href="#category">Category</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>clusterHighlights</strong></td>
            <td valign="top">[<a href="#clusterhighlight">ClusterHighlight</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productClusters</strong></td>
            <td valign="top">[<a href="#productclusters">ProductClusters</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>description</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>link</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkText</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>properties</strong></td>
            <td valign="top">[<a href="#property">Property</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>propertyGroups</strong></td>
            <td valign="top">[<a href="#propertygroup">PropertyGroup</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productReference</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>recommendations</strong></td>
            <td valign="top"><a href="#recommendation">Recommendation</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>jsonSpecifications</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### PageType

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>type</strong></td>
            <td valign="top"><a href="#pageentityidentifier">PageEntityIdentifier</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### PriceRange

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>highPrice</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>lowPrice</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### PriceRangesFacet

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>quantity</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>link</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkEncoded</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>map</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>selected</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>slug</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### PriceTableItem

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>assemblyId</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>price</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Product

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>brand</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Brand of the product.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>brandId</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>ID of the brand of the product.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>cacheId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td>LinkText is used as cacheId.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>categoryId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>categories</strong> ⚠️</td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td>Categories of the product.<p>⚠️ <strong>DEPRECATED</strong></p> <blockquote>Use <code>categoryTree</code> field for internationalization support.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>categoryTree</strong></td>
            <td valign="top">[<a href="#category">Category</a>]</td>
            <td>Product's category tree.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>clusterHighlights</strong></td>
            <td valign="top">[<a href="#clusterhighlight">ClusterHighlight</a>]</td>
            <td>List of related products.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productClusters</strong></td>
            <td valign="top">[<a href="#productclusters">ProductClusters</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>description</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Product description.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>items</strong></td>
            <td valign="top">[<a href="#sku">SKU</a>]</td>
            <td>SKU objects of the product.</td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">filter</td>
            <td valign="top"><a href="#itemsfilter">ItemsFilter</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>skuSpecifications</strong></td>
            <td valign="top">[<a href="#skuspecification">SkuSpecification</a>]</td>
            <td>List of SKU Specifications.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>link</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Product URL.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>linkText</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Product slug.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td>Product ID.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Product name.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>properties</strong></td>
            <td valign="top">[<a href="#property">Property</a>]</td>
            <td>Array of product properties.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>propertyGroups</strong></td>
            <td valign="top">[<a href="#propertygroup">PropertyGroup</a>]</td>
            <td>Array of product properties.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>productReference</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Product reference.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>titleTag</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Title used by HTML title tag.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>metaTagDescription</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Description used by HTML tag.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>recommendations</strong></td>
            <td valign="top"><a href="#recommendation">Recommendation</a></td>
            <td>Related Products.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>jsonSpecifications</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>JSON specification of the product.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>benefits</strong></td>
            <td valign="top">[<a href="#benefit">Benefit</a>]</td>
            <td>List of benefits associated with this product.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>itemMetadata</strong></td>
            <td valign="top"><a href="#itemmetadata">ItemMetadata</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>specificationGroups</strong></td>
            <td valign="top">[<a href="#specificationgroup">SpecificationGroup</a>]</td>
            <td>Array of product SpecificationGroup.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>priceRange</strong></td>
            <td valign="top"><a href="#productpricerange">ProductPriceRange</a></td>
            <td>Returns highest and lowest prices for available SKUs in product.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>releaseDate</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Product Release Date, for list ordering and product cluster highlight.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>selectedProperties</strong></td>
            <td valign="top">[<a href="#selectedproperty">SelectedProperty</a>]</td>
            <td>Product properties that will be selected by default. For example, <code>{key: "Color", value: "Blue"}</code></td>
        </tr>
    </tbody>
</table>

### ProductClusters

<table><thead><tr><th align="left">Field</th><th align="right">Argument</th><th align="left">Type</th><th align="left">Description</th></tr></thead><tbody><tr><td colspan="2" valign="top"><strong>id</strong></td><td valign="top"><a href="#id">ID</a></td><td></td></tr><tr><td colspan="2" valign="top"><strong>name</strong></td><td valign="top"><a href="#string">String</a></td><td></td></tr></tbody></table>

### ProductPriceRange

<table><thead><tr><th align="left">Field</th><th align="right">Argument</th><th align="left">Type</th><th align="left">Description</th></tr></thead><tbody><tr><td colspan="2" valign="top"><strong>sellingPrice</strong></td><td valign="top"><a href="#pricerange">PriceRange</a></td><td></td></tr><tr><td colspan="2" valign="top"><strong>listPrice</strong></td><td valign="top"><a href="#pricerange">PriceRange</a></td><td></td></tr></tbody></table>

### ProductSearch

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>products</strong></td>
            <td valign="top">[<a href="#product">Product</a>]</td>
            <td>List of products.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>recordsFiltered</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td>Total number of products.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>titleTag</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Title used in the title tag.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>metaTagDescription</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>String to be used in the <code>&lt;meta name="description"...</code> tag.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>breadcrumb</strong> ⚠️</td>
            <td valign="top">[<a href="#searchbreadcrumb">SearchBreadcrumb</a>]</td>
            <td><p>⚠️ <strong>DEPRECATED</strong></p><blockquote>Use  <code>breadcrumb</code> from the <code>facets</code> query instead.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>canonical</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>suggestion</strong> ⚠️</td>
            <td valign="top"><a href="#searchsuggestions">SearchSuggestions</a></td>
            <td><p>⚠️ <strong>DEPRECATED</strong></p><blockquote>Use the <code>suggestion</code> query instead.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>correction</strong></td>
            <td valign="top"><a href="#searchcorrection">SearchCorrection</a></td>
            <td>Object that indicates if the term was misspelled and suggests a possible correction.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>operator</strong></td>
            <td valign="top"><a href="#operator">Operator</a></td>
            <td>Indicates how the search engine deals with the fullText when there is more than one word.<ul><li><code>and</code>: The results will contain all the words in the query.</li> <li> <code>or</code>: The results will contain at least one word from the original search query.</li></ul>If <code>and</code> was not possible, <code>or</code> will be the fallback.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>fuzzy</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Indicates how the search engine corrected the misspelled word by using fuzzy logic. It can be a number representing the max number ofmisspelled letters, or the string <code>auto</code> suggesting that the search engine should set this value by itself.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>searchState</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>As fuzzy and operator, it controls the search state, but it is for general purposes. This field allows the search engines to applyfeatures that are not handled by the other fields.The possible values in this field are defined by each search engine.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>banners</strong> ⚠️</td>
            <td valign="top">[<a href="#searchbanner">SearchBanner</a>]</td>
            <td><p>⚠️ <strong>DEPRECATED</strong></p><blockquote>Use the <code>banners</code> query instead.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>redirect</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Returns the redirect URL set for the given query.</td>
        </tr>
    </tbody>
</table>


### ProductSuggestions

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>count</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td>Number of suggested products.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>products</strong></td>
            <td valign="top">[<a href="#product">Product</a>]!</td>
            <td>Suggested products.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>misspelled</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Indicates if the term is misspelled or not.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>operator</strong></td>
            <td valign="top"><a href="#operator">Operator</a></td>
            <td>Indicates how the search engine will deal with the fullText if there is more than one word. Set the value as <code>and</code> if the returned products must have all the words in its metadata. Otherwise, set the value as <code>or</code>.</td>
        </tr>
    </tbody>
</table>

### Property

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>originalName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>values</strong></td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### PropertyGroup

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>properties</strong></td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### QueryArgs

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>map</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>query</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>selectedFacets</strong></td>
            <td valign="top">[<a href="#selectedfacet">SelectedFacet</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Range

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>from</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>to</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Recommendation

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>buy</strong></td>
            <td valign="top">[<a href="#product">Product</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>view</strong></td>
            <td valign="top">[<a href="#product">Product</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>similars</strong></td>
            <td valign="top">[<a href="#product">Product</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Reference

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>Key</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>Value</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Region

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>IsPersisted</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>IsRemoved</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>Id</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>Name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>CountryCode</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>ZipCode</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>CultureInfoName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### SKU

### SKU

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>itemId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>nameComplete</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>complementName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>ean</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>referenceId</strong></td>
            <td valign="top">[<a href="#reference">Reference</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>measurementUnit</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>unitMultiplier</strong></td>
            <td valign="top"><a href="#float">Float</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>kitItems</strong></td>
            <td valign="top">[<a href="#kititem">KitItem</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>images</strong></td>
            <td valign="top">[<a href="#image">Image</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" align="right" valign="top">quantity</td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>videos</strong></td>
            <td valign="top">[<a href="#video">Video</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>sellers</strong></td>
            <td valign="top">[<a href="#seller">Seller</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>variations</strong></td>
            <td valign="top">[<a href="#property">Property</a>]</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>attachments</strong> ⚠️</td>
            <td valign="top">[<a href="#attachment">Attachment</a>]</td>
            <td><p>⚠️ <strong>DEPRECATED</strong></p> <blockquote>Use <code>itemMetaData</code> instead.</blockquote></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>estimatedDateArrival</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### SKUSpecificationField

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>originalName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### SKUSpecificationValue

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>originalName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### SearchBanner

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Banner ID.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Banner name.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>area</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Banner area.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>HTML</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Banner HTML.</td>
        </tr>
    </tbody>
</table>

### SearchBreadcrumb

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Human-readable format of the facet key.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>href</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Query link.</td>
        </tr>
    </tbody>
</table>

### SearchCorrection

Object that indicates if the term was misspelled and suggests a possible correction.

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>text</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Corrected term. If the API was not able to correct the term, it will show the original search term.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>highlighted</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>The same as <code>text</code>, but it highlights the corrected word. Useful when there is more than one word.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>misspelled</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Indicates whether the term was misspelled (<code>true</code>) or not (<code>false</code>).</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>correction</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>Indicates whether the API was able to suggest a correction (<code>true</code>) or not (<code>false</code>).</td>
        </tr>
    </tbody>
</table>

### SearchMetadata

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>titleTag</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>metaTagDescription</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### SearchSuggestion

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>term</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td>Search term.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>count</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td>Number of times the term was searched.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>attributes</strong></td>
            <td valign="top">[<a href="#searchsuggestionattribute">SearchSuggestionAttribute</a>]</td>
            <td>List of facets in which the term can be searched.</td>
        </tr>
    </tbody>
</table>

### SearchSuggestionAttribute

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>key</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td>Facet key.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td>Facet value.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>labelValue</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td>Human-readable format of the facet key.</td>
        </tr>
    </tbody>
</table>

### SearchSuggestions

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>searches</strong></td>
            <td valign="top">[<a href="#searchsuggestion">SearchSuggestion</a>]</td>
            <td>A list of search suggestions.</td>
        </tr>
    </tbody>
</table>

### SearchURLStats

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>path</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>count</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td></td>
        </tr>
    </tbody>
</table>

### SelectedFacet

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>key</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### SelectedProperty

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>key</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Seller

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>sellerId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>sellerName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>addToCartLink</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>sellerDefault</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>commertialOffer</strong></td>
            <td valign="top"><a href="#offer">Offer</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### SkuSpecification

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>field</strong></td>
            <td valign="top"><a href="#skuspecificationfield">SKUSpecificationField</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>values</strong></td>
            <td valign="top">[<a href="#skuspecificationvalue">SKUSpecificationValue</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### SpecificationGroup

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>originalName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>specifications</strong></td>
            <td valign="top">[<a href="#specificationgroupproperty">SpecificationGroupProperty</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### SpecificationGroupProperty

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>originalName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>values</strong></td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Suggestions

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>cacheId</strong></td>
            <td valign="top"><a href="#id">ID</a></td>
            <td><code>searchTerm</code> from Query autocomplete is used as cacheId.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>itemsReturned</strong></td>
            <td valign="top">[<a href="#items">Items</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Teaser

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>conditions</strong></td>
            <td valign="top"><a href="#teasercondition">TeaserCondition</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>effects</strong></td>
            <td valign="top"><a href="#teasereffects">TeaserEffects</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### TeaserCondition

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>minimumQuantity</strong></td>
            <td valign="top"><a href="#int">Int</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>parameters</strong></td>
            <td valign="top">[<a href="#teaservalue">TeaserValue</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### TeaserEffects

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>parameters</strong></td>
            <td valign="top">[<a href="#teaservalue">TeaserValue</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### TeaserValue

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>name</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### Video

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>videoUrl</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
    </tbody>
</table>

### productSpecification

<table>
    <thead>
        <tr>
            <th align="left">Field</th>
            <th align="right">Argument</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>fieldName</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>fieldValues</strong></td>
            <td valign="top">[<a href="#string">String</a>]</td>
            <td></td>
        </tr>
    </tbody>
</table>

## Inputs

### AssemblyOptionInput

<table>
    <thead>
        <tr>
            <th colspan="2" align="left">Field</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>id</strong></td>
            <td valign="top"><a href="#id">ID</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>quantity</strong></td>
            <td valign="top"><a href="#int">Int</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>assemblyId</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>seller</strong></td>
            <td valign="top"><a href="#string">String</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>options</strong></td>
            <td valign="top">[<a href="#assemblyoptioninput">AssemblyOptionInput</a>!]</td>
            <td></td>
        </tr>
    </tbody>
</table>

### Options

<table>
    <thead>
        <tr>
            <th colspan="2" align="left">Field</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>allowRedirect</strong></td>
            <td valign="top"><a href="#boolean">Boolean</a></td>
            <td>If the search has a redirect enabled, this allows (<code>true</code>) or not (<code>false</code>) the redirect to be used.</td>
        </tr>
    </tbody>
</table>

### ProductUniqueIdentifier

<table>
    <thead>
        <tr>
            <th colspan="2" align="left">Field</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>field</strong></td>
            <td valign="top"><a href="#productuniqueidentifierfield">ProductUniqueIdentifierField</a>!</td>
            <td></td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#id">ID</a>!</td>
            <td></td>
        </tr>
    </tbody>
</table>

### SelectedFacetInput

<table>
    <thead>
        <tr>
            <th colspan="2" align="left">Field</th>
            <th align="left">Type</th>
            <th align="left">Description</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td colspan="2" valign="top"><strong>key</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>A key for the selected facet.</td>
        </tr>
        <tr>
            <td colspan="2" valign="top"><strong>value</strong></td>
            <td valign="top"><a href="#string">String</a></td>
            <td>Facet value.</td>
        </tr>
    </tbody>
</table>

#### General filters

The `key` parameter also allows the following general filters.

| `facetKey` | Description |
| - | - |
| `category-${n}` | Filter the search by category, where `n` represents the category tree level (1 = department, 2 = category, 3 = subcategory, and so on). |
| `region-id` | Filter the search by a region ID, for regionalization purposes. The value is the region ID. |

## Enums

### CategoryTreeBehavior

| Value | Description |
| - | - |
| default | Uses the default value set by the search provider. |
| show | Shows the category tree when it is possible. |
| hide | Hides the category tree in any situation. |

### CrossSelingInputEnum

| Value | Description |
| - | - |
| buy | |
| similars | |
| view | |
| viewAndBought | |
| accessories | |
| suggestions | |

### CrossSelingGroupByEnum

| Value | Description |
| - | - |
| PRODUCT | Default behavior. Groups SKUs from the same product and bring only products. Limited to 12 products. |
| NONE | Returns all SKUs registered in the Catalog for the recommendation. |

### FilterType

| Value | Description |
| - | - |
| TEXT | |
| NUMBER | |
| CATEGORYTREE | |
| BRAND | |
| PRICERANGE | |

### InputValueType

| Value | Description |
| - | - |
| TEXT | |
| BOOLEAN | |
| OPTIONS | |

### InstallmentsCriteria

| Value | Description |
| - | - |
| MAX_WITHOUT_INTEREST | |
| MAX_WITH_INTEREST | |
| MAX | |
| MIN | |
| ALL | |

### ItemsFilter

| Value | Description |
| - | - |
| ALL | Returns all items, same as no filter. |
| FIRST_AVAILABLE | Returns only the first available item. Returns first if no item is available. |
| ALL_AVAILABLE | Returns all available items. Returns first if no item is available. |

### Operator

| Value | Description |
| - | - |
| and | |
| or | |

### PageEntityIdentifier

| Value | Description |
| - | - |
| brand | |
| department | |
| category | |
| subcategory| |
| search | |

### ProductUniqueIdentifierField

| Value | Description |
| - | - |
| id | |
| slug | Slug of product. *Note*: Not accepted in ´productsByIdentifier´ query. |
| ean | |
| reference | |
| sku | |

### SORT

| Value | Description |
| - | - |
| ASC | |
| DESC | |

### SimulationBehavior

| Value | Description |
| - | - |
| default | Performs the simulation on the catalog as usual. |
| only1P | Performs the simulation on catalog only for seller 1P. |
| regionalize1p | Only first party sellers will include the regionId. |
| skip | Calls catalog passing a parameter to not simulate each SKU and get its most up to date price. |
| async | Performs the simulation on the client side. |

## Scalars

### Boolean

The `Boolean` scalar type represents `true` or `false`.

### Float

The `Float` scalar type represents signed double-precision fractional values as specified by [IEEE 754](https://en.wikipedia.org/wiki/IEEE_floating_point).

### ID

The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.

### Int

The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.

### String

The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.

### StringOrBoolean

Represents a [String](#string) or a [Boolean](#boolean) value.
