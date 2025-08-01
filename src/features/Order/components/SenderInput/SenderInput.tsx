import type { Order } from '@/features/Order/schema/orderSchema'
import * as S from './SenderInput.styles'
import { useFormContext } from 'react-hook-form'
import OutlineInputField from '@/component/InputField/OutlineInputField/OutlineInputField'

const SenderInput = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<Order>()

  return (
    <S.Container>
      <S.Title>보내는 사람</S.Title>
      <OutlineInputField
        placeholder="이름을 입력하세요."
        type="text"
        {...register('sender')}
        isError={!!errors.sender}
        errorMessage={errors.sender?.message}
      />
      <S.SubText>
        * 실제 선물 발송 시 발신자 이름으로 반영되는 정보입니다.
      </S.SubText>
    </S.Container>
  )
}

export default SenderInput
