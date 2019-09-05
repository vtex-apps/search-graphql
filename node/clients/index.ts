import { IOClients } from '@vtex/api'

import { Catalog } from './catalog'
import { Checkout } from './checkout'

export class Clients extends IOClients {
  public get catalog() {
    return this.getOrSet('catalog', Catalog)
  }
  public get checkout() {
    return this.getOrSet('checkout', Checkout)
  }
}
