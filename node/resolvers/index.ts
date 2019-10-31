import { fieldResolvers as benefitsFieldResolvers } from './benefits'
import {
  fieldResolvers as searchFieldResolvers,
  queries as searchQueries,
} from './search'

// eslint-disable-next-line no-global-assign
Promise = require('bluebird')

export const resolvers = {
  ...searchFieldResolvers,
  ...benefitsFieldResolvers,
  Query: {
    ...searchQueries,
  },
}
