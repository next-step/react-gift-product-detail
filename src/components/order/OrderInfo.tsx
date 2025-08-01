import { useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '@/context/AuthContext';
import ReceiverInfo from '@/components/order/ReceiverInfo';
import { fetchProductSummary } from '@/api/productApi';
import { submitOrder } from '@/api/orderApi';
import { useQuery } from '@tanstack/react-query';
import { useState, useEffect } from 'react';
import { isAxiosError } from 'axios';
import { QUERY_KEYS } from '@/constants/queryKeys';

import FormField from '@/components/common/FormField';
import Typography from '@/components/common/Typography';

import {
  Wrapper,
  Section,
  StyledInput,
  StyledTextarea,
  HelperText,
  ProductInfo,
  ProductImage,
  ProductDetails,
  OrderButton,
} from '@/components/order/Order.style';

import type { Receiver } from '@/types/receiver';

interface ApiProductData {
  id: number;
  name: string;
  imageURL: string;
  brandName: string;
  price: number;
}

export interface ProductSummary {
  id: number;
  name: string;
  imageURL: string;
  brandInfo: {
    id: number;
    name: string;
    imageURL: string;
  };
  price: {
    basicPrice: number;
    sellingPrice: number;
    discountRate: number;
  };
}

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
  const giftId = location.state?.id as number | undefined;

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
  } = useQuery<ApiProductData, Error, ProductSummary>({
    queryKey: giftId ? QUERY_KEYS.product(giftId) : [],
    queryFn: () => fetchProductSummary(giftId!),
    enabled: !!giftId,
    select: (apiData) => ({
      id: apiData.id,
      name: apiData.name,
      imageURL: apiData.imageURL,
      brandInfo: {
        id: 0,
        name: apiData.brandName,
        imageURL: '',
      },
      price: {
        basicPrice: apiData.price,
        sellingPrice: apiData.price,
        discountRate: 0,
      },
    }),
  });

  useEffect(() => {
    if (!giftId) {
      toast.error('잘못된 접근입니다.');
    }
  }, [giftId]);

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
      if (isAxiosError(err) && err.response?.status === 401) {
        toast.error('로그인이 만료되었습니다.');
        navigate('/login');
      } else {
        toast.error('주문에 실패했습니다.');
      }
    }
  };

  if (isLoading) {
    return (
      <Wrapper>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Typography variant="p">상품 정보를 불러오는 중입니다...</Typography>
        </div>
      </Wrapper>
    );
  }

  if (isError || !productInfo) {
    return (
      <Wrapper>
        <div style={{ textAlign: 'center', padding: '40px' }}>
          <Typography variant="p" style={{ marginBottom: '16px' }}>
            상품 정보를 불러오는 데 실패했습니다.
          </Typography>
          <OrderButton type="button" onClick={() => navigate('/')}>
            홈으로 돌아가기
          </OrderButton>
        </div>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Section>
          <FormField label="메시지" error={errors.message?.message}>
            <StyledTextarea
              placeholder="메시지를 입력하세요"
              {...register('message', {
                required: '메시지는 반드시 입력되어야 해요.',
              })}
              error={!!errors.message}
            />
          </FormField>
        </Section>

        <Section>
          <FormField label="보내는 사람" error={errors.sender?.message}>
            <StyledInput
              type="text"
              placeholder="이름을 입력하세요."
              {...register('sender', {
                required: '보내는 사람 이름이 반드시 입력되어야 해요.',
              })}
              error={!!errors.sender}
            />
            <HelperText>* 실제 선물 발송 시 발신자 이름으로 반영됩니다.</HelperText>
          </FormField>
        </Section>

        <Section>
          <FormField label="받는 사람">
            <ReceiverInfo receivers={receiverList} onUpdate={setReceiverList} />
          </FormField>
        </Section>

        <Section>
          <FormField label="상품 정보">
            <ProductInfo>
              <ProductImage src={productInfo.imageURL} alt={productInfo.name ?? '상품 이미지'} />
              <ProductDetails>
                <strong>{productInfo.name}</strong>
                <span>{productInfo.brandInfo.name}</span>
                <b>상품가 {productInfo.price.sellingPrice.toLocaleString()}원</b>
              </ProductDetails>
            </ProductInfo>
          </FormField>
        </Section>

        <OrderButton type="submit">
          {productInfo.price.sellingPrice.toLocaleString()}원 주문하기
        </OrderButton>
      </form>
    </Wrapper>
  );
};

export default GiftForm;
