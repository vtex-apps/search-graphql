import { fieldResolvers as benefitsFieldResolvers } from './benefits'
import {
  fieldResolvers as catalogFieldResolvers,
  queries as catalogQueries,
} from './catalog'

// eslint-disable-next-line no-global-assign
Promise = require('bluebird')

export const resolvers = {
  ...catalogFieldResolvers,
  ...benefitsFieldResolvers,
  Query: {
    ...catalogQueries,
  },
}
