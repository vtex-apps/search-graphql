const VBASE_BUCKET = 'searchStats'
const URL_COUNT_PATH = 'searchUrlsCount.json'

type SearchStatsUrlCount = Record<string, number>

export const count = async (ctx: Context, args: SearchArgs) => {
  const {
    clients: { vbase },
  } = ctx

  const searchURLPath = `${args.query}?map=${args.map}`
  const pathSegments = args.query && args.query.split('/')
  const mapSegments = args.map && args.map.split(',')

  if (pathSegments && mapSegments && pathSegments.length === mapSegments.length) {
    const data: SearchStatsUrlCount = await vbase.getJSON<SearchStatsUrlCount>(VBASE_BUCKET, URL_COUNT_PATH, true) || {}
    data[searchURLPath] = (data[searchURLPath] || 0) + 1
    vbase.saveJSON<SearchStatsUrlCount>(VBASE_BUCKET, URL_COUNT_PATH, data)
  }
}
