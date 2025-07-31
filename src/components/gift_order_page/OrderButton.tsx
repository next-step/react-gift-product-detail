import useProductInfo from '@/hooks/useProductInfo';
import type { FormValues } from '@/api/types/order.dto';
import styled from '@emotion/styled';
import { useFormContext, useWatch } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { formatPhoneNumber } from '@/utils/formatPhoneNumber';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { orderService } from '@/api/services/order.service';
import type { GiftItemData } from '@/api/types/giftItem.dto';

const Container = styled.button`
  all: unset;
  cursor: pointer;
  position: fixed;
  bottom: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 720px;
  height: 3rem;
  background-color: ${({ theme }) => theme.colors.yellow600};
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.title2Bold};
`;

export const OrderButton = () => {
  const { id } = useParams();
  if (!id) throw new Error('id가 없습니다');
  const parsedId = parseInt(id!);
  const navigate = useNavigate();
  const {
    control,
    watch,
    formState: { isValid },
  } = useFormContext<FormValues>();
  const { messageCardId } = useProductInfo();
  const queryClient = useQueryClient();
  const giftItemDetail = queryClient.getQueryData<GiftItemData>([
    'giftItemDetail',
    { id: parsedId },
  ]);
  const message = watch('message');
  const senderName = watch('senderName');
  const recipientInfo = useWatch({ control, name: 'recipientInfo' });
  const receivers = recipientInfo?.map(({ name, phoneNumber, quantity }) => ({
    name: name,
    phoneNumber: formatPhoneNumber(phoneNumber),
    quantity: Number(quantity),
  }));
  let totalAmount = 0;
  let totalPrice = 0;

  recipientInfo?.forEach((recipientForm) => {
    totalAmount = totalAmount + Number(recipientForm.quantity);
  });
  totalPrice = (giftItemDetail?.price.basicPrice ?? 0) * totalAmount;
  const mutation = useMutation({
    mutationFn: orderService,
    onSuccess: () => {
      alert(`
            주문이 완료되었습니다.
            상품명: ${giftItemDetail?.name}
            구매 수량: ${totalAmount}
            발신자 이름: ${senderName}
            메시지: ${message}
          `);
      navigate('/');
    },
    onError: (error) => {
      console.error('주문 실패: ', error);
      toast.warn('⚠️ 주문 요청 처리 중 오류가 발생했습니다.', {
        style: {
          width: '25rem',
        },
      });
    },
  });

  return (
    <Container
      onClick={() => {
        if (isValid)
          mutation.mutate({
            productId: parsedId,
            message: message,
            messageCardId: messageCardId,
            ordererName: senderName,
            receivers: receivers,
          });
      }}
    >
      <Text>{totalPrice}원 주문하기</Text>
    </Container>
  );
};
