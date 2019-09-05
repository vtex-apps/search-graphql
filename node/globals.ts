import {
  IOContext,
  MetricsAccumulator,
  SegmentData,
  ServiceContext,
} from '@vtex/api'

import { Clients } from './clients'

if (!global.metrics) {
  console.error('No global.metrics at require time')
  global.metrics = new MetricsAccumulator()
}

declare global {
  type Context = ServiceContext<Clients, void, CustomContext>

  interface CustomContext {
    cookie: string
    originalPath: string
    vtex: CustomIOContext
  }

  interface CustomIOContext extends IOContext {
    segment?: SegmentData
  }

  interface Property {
    name: string
    values: [string]
  }

  interface TranslatableMessage {
    content: string
    from: string
    id: string
  }

  interface Reference {
    Key: string
    Value: string
  }
}
