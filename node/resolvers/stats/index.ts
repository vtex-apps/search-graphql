import { searchURLsCount, SORT } from "./searchURLsCount"

export const queries = {
  searchURLsCount: async (
    _: any,
    args: { limit: number, sort?: SORT },
    ctx: Context
  ) => {
    const { clients: { vbase } } = ctx
    const count = searchURLsCount(vbase, args.limit, args.sort)
    console.log('count', JSON.stringify(count, null, 2))
    return count
  },
}
