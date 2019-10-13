const promisify = (obj: any) => {
  return new Promise(resolve => resolve(obj))
}

// parentId: number | null
//   GlobalCategoryId: number
//   GlobalCategoryName: string
//   position: number
//   slug: string
//   id: number
//   name: string
//   hasChildren: boolean
//   url: string
//   children: null
//   Title: string
//   MetaTagDescription: string

const catalogClientMock = {
  pageType: jest.fn((query: string) =>
    promisify({
      id: '1',
      name: query,
      url: `${query}-url`,
      title: `${query}-title`,
      metaTagDescription: `${query}-metaTagDescription`,
    })
  ),
  category: jest.fn(),
  categories: jest.fn(),
}

const messagesGraphQLClientMock = {
  translate: (str: string) => promisify(str),
}

const segmentClientMock = {
  getSegmentByToken: () =>
    promisify({
      cultureInfo: 'en-US',
    }),
  getSegment: () =>
    promisify({
      cultureInfo: 'en-US',
    }),
}

export const mockContext = {
  vtex: { account: 'storecomponents' },
  clients: {
    catalog: catalogClientMock,
    segment: segmentClientMock,
    messagesGraphQL: messagesGraphQLClientMock,
  },
}
