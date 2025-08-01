import * as S from './ReceiverInput.styles'
import { type FieldError, useFormContext } from 'react-hook-form'
import type { Order } from '@/features/Order/schema/orderSchema'
import MyButton from '@/component/Button/Button'
import OutlineInputField from '@/component/InputField/OutlineInputField/OutlineInputField'

interface ReceiverInputProps {
  index: number
  onRemove: () => void
}

const ReceiverInput = ({ index, onRemove }: ReceiverInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Order>()

  const fieldErrors = (errors.receivers?.[index] ?? {}) as {
    receiver?: FieldError
    phone?: FieldError
    quantity?: FieldError
  }

  return (
    <S.Container>
      <S.TitleContainer>
        <S.Title>받는 사람 {index + 1}</S.Title>
        <MyButton onClick={onRemove} size="verySmall" variant="outlined">
          삭제
        </MyButton>
      </S.TitleContainer>

      <OutlineInputField
        label="이름"
        placeholder="이름"
        {...register(`receivers.${index}.receiver`)}
        isError={!!fieldErrors.receiver}
        errorMessage={fieldErrors.receiver?.message}
      />

      <OutlineInputField
        label="전화번호"
        placeholder="전화번호"
        {...register(`receivers.${index}.phone`)}
        isError={!!fieldErrors.phone}
        errorMessage={fieldErrors.phone?.message}
      />

      <OutlineInputField
        label="수량"
        type="number"
        placeholder="수량"
        {...register(`receivers.${index}.quantity`, { valueAsNumber: true })}
        isError={!!fieldErrors.quantity}
        errorMessage={fieldErrors.quantity?.message}
      />

      <S.Divider />
    </S.Container>
  )
}

export default ReceiverInput
