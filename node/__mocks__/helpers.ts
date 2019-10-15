const promisify = (obj: any) => {
  return new Promise(resolve => resolve(obj))
}

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
  vtex: { account: 'storecomponents', platform: 'vtex' },
  clients: {
    catalog: catalogClientMock,
    segment: segmentClientMock,
    messagesGraphQL: messagesGraphQLClientMock,
  },
}
