interface PayloadItem {
  id: string
  quantity: number
  seller: string
  parentItemIndex?: number | null
  parentAssemblyBinding?: string | null
}

interface SimulationPayload {
  country?: string
  items: PayloadItem[]
  postalCode?: string
  isCheckedIn?: boolean
  priceTables?: string[]
  marketingData?: Record<string, string>
}
