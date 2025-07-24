import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import ReceiverInfo from '@/components/order/ReceiverInfo';
import { fetchProductSummary } from '@/api/productApi';
import { submitOrder } from '@/api/orderApi';
import { useQuery } from '@tanstack/react-query';

import {
  Wrapper,
  Section,
  Label,
  InputBox,
  StyledInput,
  StyledTextarea,
  ErrorMsg,
  HelperText,
  ProductInfo,
  ProductImage,
  ProductDetails,
  OrderButton,
} from '@/components/order/Order.style';

import type { Receiver } from '@/types/receiver';
import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';

interface GiftFormValues {
  sender: string;
  message: string;
}

interface GiftSenderProps {
  templateMessage: string;
}

const GiftForm = ({ templateMessage }: GiftSenderProps) => {
  const navigate = useNavigate();
  const location = useLocation();
  const giftId = location.state?.id;

  const [receiverList, setReceiverList] = useState<Receiver[]>([]);
  const { user } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<GiftFormValues>({
    defaultValues: {
      sender: user?.name || '',
      message: templateMessage ?? '',
    },
  });

  useEffect(() => {
    setValue('message', templateMessage);
    if (user?.name) {
      setValue('sender', user.name);
    }
  }, [templateMessage, user?.name, setValue]);

  const {
    data: productInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['product', giftId],
    queryFn: () => fetchProductSummary(giftId!), 
    enabled: !!giftId,
  });

    useEffect(() => {
    if (isError) {
      toast.error('존재하지 않는 상품입니다.');
      navigate('/');
    }
  }, [isError, navigate]);

  const validateReceivers = () => {
    if (receiverList.length === 0) {
      toast.error('최소 1명의 받는 사람을 등록해주세요.');
      return false;
    }

    const phoneSet = new Set<string>();
    for (let i = 0; i < receiverList.length; i++) {
      const r = receiverList[i];

      if (!r.name.trim()) {
        toast.error(`${i + 1}번 받는 사람 이름을 입력해주세요.`);
        return false;
      }

      if (!/^010\d{8}$/.test(r.phone)) {
        toast.error(`${i + 1}번 전화번호는 01012345678 형식이어야 합니다.`);
        return false;
      }

      if (phoneSet.has(r.phone)) {
        toast.error(`${i + 1}번 전화번호가 중복됩니다.`);
        return false;
      }

      phoneSet.add(r.phone);

      if (r.quantity < 1) {
        toast.error(`${i + 1}번 수량은 1 이상이어야 합니다.`);
        return false;
      }
    }

    return true;
  };

  const onSubmit = async (data: GiftFormValues) => {
    if (!validateReceivers() || !productInfo) return;

    try {
      await submitOrder({
        productId: productInfo.id,
        message: data.message,
        messageCardId: 'card123',
        ordererName: data.sender,
        receivers: receiverList.map((r) => ({
          name: r.name,
          phoneNumber: r.phone,
          quantity: r.quantity,
        })),
      });

      toast.success('주문이 완료되었습니다!');
      navigate('/');
    } catch (err) {
      if (isAxiosError(err) && err.response?.status === 401)  {
        toast.error('로그인이 만료되었습니다.');
        navigate('/login');
      } else {
        toast.error('주문에 실패했습니다.');
      }
    }
  };

  if (isLoading) return <div>상품 정보를 불러오는 중입니다...</div>;
  if (isError || !productInfo) return <div>상품 정보가 존재하지 않습니다.</div>;

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <Label>메시지</Label>
          <InputBox>
            <StyledTextarea
              placeholder="메시지를 입력하세요"
              {...register('message', { required: '메시지는 반드시 입력되어야 해요.' })}
              error={!!errors.message}
            />
            {errors.message && <ErrorMsg>{errors.message.message}</ErrorMsg>}
          </InputBox>
        </Section>

        <Section>
          <Label>보내는 사람</Label>
          <InputBox>
            <StyledInput
              type="text"
              placeholder="이름을 입력하세요."
              {...register('sender', { required: '보내는 사람 이름이 반드시 입력되어야 해요.' })}
              error={!!errors.sender}
            />
            {errors.sender && <ErrorMsg>{errors.sender.message}</ErrorMsg>}
            <HelperText>* 실제 선물 발송 시 발신자 이름으로 반영됩니다.</HelperText>
          </InputBox>
        </Section>

        <Section>
          <Label>받는 사람</Label>
          <ReceiverInfo receivers={receiverList} onUpdate={setReceiverList} />
        </Section>

        <Section>
          <Label>상품 정보</Label>
          <ProductInfo>
            <ProductImage src={productInfo.imageURL} alt={productInfo.name} />
            <ProductDetails>
              <strong>{productInfo.name}</strong>
              <span>{productInfo.brandInfo.name}</span>
              <b>상품가 {productInfo.price.sellingPrice.toLocaleString()}원</b>
            </ProductDetails>
          </ProductInfo>
        </Section>

        <OrderButton type="submit">
          {productInfo.price.sellingPrice.toLocaleString()}원 주문하기
        </OrderButton>
      </form>
    </Wrapper>
  );
};

export default GiftForm;
