import type { Product } from '@/api/types'
import type { CardData, ReceiverData } from '@/features/order/schema'

export type { ReceiverData, CardData }

export type OrderForm = {
  card_data: CardData
  sender: string
  receivers: ReceiverData[]
  product: Product
}
