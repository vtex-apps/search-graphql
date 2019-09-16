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