import { useState } from 'react'
import { useFieldArray } from 'react-hook-form'
import type { UseFormReturn } from 'react-hook-form'
import { cardMock } from '@/pages/OrderPage/cardMock'
import type { FormValues, ReceiverInfo } from '@/components/OrderPage/OrderForm'
import type { Product } from '@/types/product'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useOrderMutation } from '@/hooks/useOrderMutation'
import { ROUTE_PATH } from '@/routes/AppRoutes'

export function useOrderForm(
  form: UseFormReturn<FormValues>,
  product: Product
) {
  const { control, setValue, getValues, trigger, reset } = form

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'receivers',
  })

  const [showReceiverModal, setShowReceiverModal] = useState(false)
  const [selectedCard, setSelectedCard] = useState(cardMock[0])
  const [finalReceivers, setFinalReceivers] = useState<ReceiverInfo[]>([])

  const totalQuantity = finalReceivers.reduce(
    (acc, receiver) => acc + Number(receiver.quantity || 0),
    0
  )
  const totalPrice = product.price.sellingPrice * totalQuantity

  const navigate = useNavigate()

  const { mutate: orderMutate } = useOrderMutation()

  const orderSuccessMessage = (data: FormValues) => {
    alert(`주문이 완료되었습니다.
      상품명: ${product.name}
      구매 수량: ${totalQuantity}
      발신자 이름: ${data.sender}
      메시지: ${data.message}`)
  }

  const orderSuccess = () => {
    reset()
    setSelectedCard(cardMock[0])
    setValue('message', cardMock[0].defaultTextMessage)
    setFinalReceivers([])
    navigate(ROUTE_PATH.HOME)
  }

  const onSubmit = async (data: FormValues) => {
    orderMutate(
      {
        productId: product.id,
        message: data.message,
        messageCardId: String(selectedCard.id),
        ordererName: data.sender,
        receivers: finalReceivers.map((r) => ({
          name: r.name,
          phoneNumber: r.phone,
          quantity: Number(r.quantity),
        })),
      },
      {
        onSuccess: () => {
          orderSuccessMessage(data)
          orderSuccess()
        },
        onError: (error) => {
          if (error instanceof axios.AxiosError) {
            const status = error.response?.status
            const message = error.response?.data.data.message || '주문 실패'

            if (status === axios.HttpStatusCode.Unauthorized) {
              navigate(ROUTE_PATH.LOGIN)
            } else {
              toast.error(
                typeof message === 'string' ? message : '잘못된 요청입니다.'
              )
            }
          }
        },
      }
    )
  }

  const validateAndSaveReceivers = async () => {
    const isValid = await trigger('receivers')
    if (!isValid) return

    const receivers = getValues('receivers')
    const phones = receivers.map((r) => r.phone)
    const hasDuplicatePhone = new Set(phones).size !== phones.length

    if (hasDuplicatePhone) {
      alert('중복된 전화번호가 있습니다.')
      return
    }

    setFinalReceivers(receivers)
    setShowReceiverModal(false)
  }

  return {
    card: {
      selectedCard,
      setSelectedCard,
    },
    modal: {
      showReceiverModal,
      setShowReceiverModal,
    },
    receiver: {
      fields,
      append,
      remove,
      finalReceivers,
      setFinalReceivers,
      validateAndSaveReceivers,
    },
    summary: {
      totalQuantity,
      totalPrice,
    },
    form: {
      onSubmit,
    },
  }
}
