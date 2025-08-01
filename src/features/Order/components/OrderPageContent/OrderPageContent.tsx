import { useState } from 'react'
import { FormProvider } from 'react-hook-form'
import { useProductSummary } from '@/features/Order/hooks/useProductSummary'
import { cards } from '@/data/cards'
import { useOrderForm } from '@/features/Order/hooks/useOrderForm'
import CardSelect from '@/features/Order/components/CardSelect/CardSelect'
import CardPreview from '@/features/Order/components/CardPreview/CardPreview'
import MessageInput from '@/features/Order/components/MessageInput/MessageInput'
import SenderInput from '@/features/Order/components/SenderInput/SenderInput'
import ProductInfo from '@/features/Order/components/ProductInfo/ProductInfo'
import BottomPurchaseBar from '@/features/Order/components/BottomPurchaseBar/BottomPurchaseBar'
import ReceiverSection from '@/features/Order/components/ReceiverSection/ReceiverSection'

const INITIAL_CARD_ID = 904

interface Props {
  idNum: number
}

const OrderPageContent = ({ idNum }: Props) => {
  const product = useProductSummary(idNum)

  if (!product) {
    return <div>상품 정보를 찾을 수 없습니다.</div>
  }

  const [selectedCardId, setSelectedCardId] = useState<number>(INITIAL_CARD_ID)
  const selectedCard = cards.find((card) => card.id === selectedCardId)!

  const { methods, onSubmit, totalPrice, confirmReceivers } = useOrderForm({
    productId: idNum,
    defaultMessage: selectedCard.defaultTextMessage,
    productName: product.name ?? '',
    sellingPrice: product.price ?? 0,
    selectedCardId,
    selectedCardMessage: selectedCard.defaultTextMessage,
  })

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <CardSelect
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
        <CardPreview selectedCardId={selectedCardId} />
        <MessageInput />
        <SenderInput />
        <ReceiverSection onConfirm={confirmReceivers} />
        <ProductInfo product={product} />
        <BottomPurchaseBar handlePurchase={onSubmit} totalPrice={totalPrice} />
      </form>
    </FormProvider>
  )
}

export default OrderPageContent
