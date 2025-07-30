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
  const { user, token, initialized } = useContext(AuthContext)!
  const userName = user?.name ?? ''
  const productId = Number(params.id)

  // 1) Auth initialization loader
  if (!initialized) {
    return <div>로딩 중…</div>
  }

  // 2) Redirect if not authenticated
  useEffect(() => {
    if (!token) {
      const redirectTo = location.pathname + location.search
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true })
    }
  }, [initialized, token, navigate])

  // 3) Block render until authenticated
  if (!token || !user) return null

  // 4) Fetch product data
  const { data: productSummary, isLoading, isError } = useProduct(productId)
  const { mutate: createOrder } = useCreateOrder()

  // 5) Form setup

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger
  } = useForm<FormValues>({
    defaultValues: { sender: userName, receivers: [DEFAULT_RECEIVER] },
    mode: 'onChange'
  })
  const receivers = watch('receivers')
  const { fields, append, remove } = useFieldArray({ control, name: 'receivers' })

  // 6) Template state
  const initialTemplateId = Number(searchParams.get('template')) || templates[0].id
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(initialTemplateId)
  const selectedTemplate = templates.find(t => t.id === selectedTemplateId) || templates[0]
  const [messageText, setMessageText] = useState<string>(selectedTemplate.defaultTextMessage)


  useEffect(() => {
    setMessageText(selectedTemplate.defaultTextMessage)
  }, [selectedTemplateId])

  // 7) Loading and error states for product
  if (isLoading) return <div>상품 정보를 로딩 중…</div>
  if (isError || !productSummary) return <div>상품 정보를 가져올 수 없습니다. (ID: {productId})</div>

  // 8) Submit handler
  const onSubmit = (data: FormValues) => {
    const payload: OrderPayload = {
      productId,
      message: messageText,
      messageCardId: String(selectedTemplateId),
      ordererName: data.sender,
      receivers: data.receivers.map(r => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.quantity
      }))
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

  // 9) Format price safely
  const price = productSummary.price?.sellingPrice ?? 0


  return (
    <div style={{ padding: 20 }}>
      {/* 템플릿 리스트 */}
      <div style={{ display: 'flex', overflowX: 'auto', gap: 8, padding: '8px 0' }}>
        {templates.map(t => (

          <img
            key={t.id}
            src={t.thumbUrl}
            alt={t.defaultTextMessage}
            onClick={() => setSelectedTemplateId(t.id)}
            style={{
              width: 80,
              height: 80,
              objectFit: 'cover',
              cursor: 'pointer',
              border: selectedTemplateId === t.id ? '2px solid #467DE9' : '2px solid transparent',
              borderRadius: 4
            }}
          />
        ))}
      </div>

      {/* 메시지 카드 미리보기 */}
      <img
        src={selectedTemplate.imageUrl}
        alt="템플릿 카드 미리보기"
        style={{ width: '100%', borderRadius: 8, marginBottom: 16 }}
      />
      <label style={{ display: 'block', marginBottom: 8 }}>메시지 내용:</label>
      <textarea
        value={messageText}
        onChange={e => setMessageText(e.target.value)}
        rows={3}
        style={{ width: '100%', padding: 8, border: '1px solid #ccc', borderRadius: 4 }}

      />

      {/* 주문 폼 */}
      <form onSubmit={handleSubmit(onSubmit)} style={{ marginTop: 24 }}>
        {/* 보내는 사람 */}
        <div style={{ marginBottom: 16 }}>
          <label>보내는 사람</label>
          <input
            {...register('sender', { required: '보내는 사람 이름을 입력하세요.' })}
            defaultValue={userName}
            className="w-full p-2 border rounded"
          />
          {errors.sender && <p className="text-red-500 text-sm">{errors.sender.message}</p>}

        </div>

        {/* 받는 사람 리스트 */}
        <h2>받는 사람</h2>
        <p>* 최대 {MAX_RECEIVERS}명까지 추가할 수 있어요.</p>
        <p>* 전화번호 중복 입력 불가.</p>
        <button
          type="button"
          onClick={() => {
            if (fields.length < MAX_RECEIVERS) append(DEFAULT_RECEIVER)
            trigger()
          }}
          style={{
            marginBottom: 16,
            padding: '4px 12px',
            backgroundColor: '#f3f4f6',
            borderRadius: 4,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          추가하기
        </button>

        {fields.map((field, idx) => (
          <div key={field.id} style={{ marginBottom: 16 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>

              <h3>받는 사람 {idx + 1}</h3>
              <button type="button" onClick={() => remove(idx)} className="text-red-500">
                ✕
              </button>
            </div>

            {/* 이름 */}
            <div className="mb-2">
              <label>이름</label>
              <input
                {...register(`receivers.${idx}.name`, { required: '이름을 입력하세요.' })}
                className="w-full p-2 border rounded"
              />
              {errors.receivers?.[idx]?.name && (
                <p className="text-red-500 text-sm mt-1">{errors.receivers[idx]?.name?.message}</p>

              )}
            </div>

            {/* 전화번호 */}
            <div className="mb-2">
              <label>전화번호</label>
              <input
                {...register(`receivers.${idx}.phone`, {
                  required: '전화번호를 입력하세요.',
                  pattern: { value: /^010\d{8}$/, message: '01012345678 형식이어야 해요.' },
                  validate: val => receivers.filter(r => r.phone === val).length === 1 || '중복된 전화번호가 있습니다.'

                })}
                className="w-full p-2 border rounded"
              />
              {errors.receivers?.[idx]?.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.receivers[idx]?.phone?.message}</p>

              )}
            </div>

            {/* 수량 */}
            <div className="mb-2">
              <label>수량</label>
              <input
                type="number"
                {...register(`receivers.${idx}.quantity`, { min: { value: 1, message: '1개 이상 입력하세요.' } })}

                className="w-full p-2 border rounded"
                min={1}
              />
              {errors.receivers?.[idx]?.quantity && (
                <p className="text-red-500 text-sm mt-1">{errors.receivers[idx]?.quantity?.message}</p>

              )}
            </div>
          </div>
        ))}

        <button type="submit" className="px-4 py-2 bg-yellow-400 rounded w-full">
          {fields.length}명 완료
        </button>
      </form>

      {/* 상품 정보 */}
      <div style={{ marginTop: 32 }}>
        <img
          src={productSummary.imageURL}
          alt={productSummary.name}
          style={{ width: 80, borderRadius: 8 }}
        />
        <div>{productSummary.name}</div>
        <p>₩{price.toLocaleString()}</p>
      </div>
    </div>
  )
}
