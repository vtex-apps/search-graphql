import { fieldResolvers as benefitsFieldResolvers } from './benefits'
import {
  fieldResolvers as searchFieldResolvers,
  queries as searchQueries,
} from './search'

export const resolvers = {
  ...searchFieldResolvers,
  ...benefitsFieldResolvers,
  Query: {
    ...searchQueries,
  },
}
