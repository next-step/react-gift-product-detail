import React, { useContext, useEffect, useState } from 'react'
import { useParams, useNavigate, useSearchParams } from 'react-router-dom'
import { useForm, useFieldArray } from 'react-hook-form'
import { toast } from 'react-toastify'
import { AxiosError } from 'axios'
import { AuthContext } from '@/context/AuthContext'
import { templates } from '@/resources/mock/templates'
import { useProduct, useCreateOrder, OrderPayload } from '@/hooks/orderHooks'
import type { ProductData } from '@/types/products'

type Receiver = { name: string; phone: string; quantity: number }
type FormValues = { sender: string; receivers: Receiver[] }

const MAX_RECEIVERS = 10
const DEFAULT_RECEIVER: Receiver = { name: '', phone: '', quantity: 1 }

export default function OrderPage() {
  const params = useParams<{ id: string }>()
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { user, token } = useContext(AuthContext)!
  const userName = user?.name || ''
  const productId = Number(params.id)

  // React Query 훅
  const { data: productSummary, isLoading, isError } = useProduct(productId)
  const { mutate: createOrder } = useCreateOrder()

  // React Hook Form
  const { control, register, handleSubmit, watch, formState: { errors }, trigger } = useForm<FormValues>({
    defaultValues: { sender: userName, receivers: [DEFAULT_RECEIVER] },
    mode: 'onChange'
  })
  const receivers = watch('receivers')
  const { fields, append, remove } = useFieldArray({ control, name: 'receivers' })

  // 템플릿 상태
  const initialTemplateId = Number(searchParams.get('template')) || templates[0].id
  const [selectedTemplateId, setSelectedTemplateId] = useState(initialTemplateId)
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0]
  const [messageText, setMessageText] = useState(selectedTemplate.defaultTextMessage)

  useEffect(() => {
    setMessageText(selectedTemplate.defaultTextMessage)
  }, [selectedTemplateId])

  // 로그인 체크
  useEffect(() => {
    if (!token) {
      const redirectTo = location.pathname + location.search
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true })
    }
  }, [token, navigate])

  if (!token || !user) return null
  if (isLoading) return <div>상품 정보를 로딩 중…</div>
  if (isError || !productSummary) return <div>상품 정보를 가져올 수 없습니다. (ID: {productId})</div>

  const onSubmit = (data: FormValues) => {
    const payload: OrderPayload = {
      productId,
      message: messageText,
      messageCardId: String(selectedTemplateId),
      ordererName: data.sender,
      receivers: data.receivers.map(r => ({ name: r.name, phoneNumber: r.phone, quantity: r.quantity }))
    }

    createOrder(payload, {
      onSuccess: () => {
        alert('주문이 완료되었습니다!')
        navigate('/', { replace: true })
      },
      onError: (error: AxiosError<{ data: { status: string; statusCode: number; message: string } }>) => {
        const msg = error.response?.data.data.message || '주문 중 오류가 발생했습니다.'
        toast.error(msg)
      }
    })
  }

  return (
    <div style={{ padding: 20 }}>
      {/* 폼 및 UI 생략: 이전 코드 유지 */}
    </div>
  )
}
