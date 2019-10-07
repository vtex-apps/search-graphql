import { prop } from 'ramda'

export const resolvers = {
  Discount: {
    name: prop('<Name>k__BackingField'),
  },
  Teaser: {
    name: prop('<Name>k__BackingField'),
    conditions: prop('<Conditions>k__BackingField'),
    effects: prop('<Effects>k__BackingField'),
  },
  TeaserCondition: {
    minimumQuantity: prop('<MinimumQuantity>k__BackingField'),
    parameters: prop('<Parameters>k__BackingField'),
  },
  TeaserEffects: {
    parameters: prop('<Parameters>k__BackingField'),
  },
  TeaserValue: {
    name: prop('<Name>k__BackingField'),
    value: prop('<Value>k__BackingField'),
  }
}
