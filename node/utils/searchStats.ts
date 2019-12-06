const VBASE_BUCKET = 'searchStats'
const URL_COUNT_PATH = 'searchUrlsCount.json'

const INDEXING_UPDATE_FREQUENCY = 10
const INDEXING_EVENT_ROUTE_NAME = 'searchUrlsCountIndex'

interface SearchStatsUrlCount{
  updatedCount: number
  searchUrlCount: Record<string, number>
}

export const count = async (ctx: Context, args: SearchArgs) => {
  const {
    clients: { vbase },
  } = ctx

  const searchURLPath = `/${args.query}?map=${args.map}`
  const pathSegments = args.query && args.query.split('/')
  const mapSegments = args.map && args.map.split(',')

  if (pathSegments && mapSegments && pathSegments.length === mapSegments.length) {
    const data = (await vbase.getJSON<SearchStatsUrlCount>(VBASE_BUCKET, URL_COUNT_PATH, true) || {updatedCount: 0, searchUrlCount: {}}) as SearchStatsUrlCount
    data.searchUrlCount[searchURLPath] = (data.searchUrlCount[searchURLPath] || 0) + 1
    data.updatedCount = data.updatedCount + 1
    if (data.updatedCount === INDEXING_UPDATE_FREQUENCY) {
      data.updatedCount = 0
      sendIndexSearchUrlsEvent(ctx)
    }

    vbase.saveJSON<SearchStatsUrlCount>(VBASE_BUCKET, URL_COUNT_PATH, data)
  }
}

const sendIndexSearchUrlsEvent = async (ctx: Context) => {
  const { clients: { events } } = ctx
  events.sendEvent('', INDEXING_EVENT_ROUTE_NAME)
}
