import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

import CardPicker from '@/components/order/CardPicker';
import CardMessage from '@/components/order/CardMessage';
import SenderInfo from '@/components/order/SenderInfo';
import ReceiverInfo from '@/components/order/ReceiverInfo';
import ProductInfo from '@/components/order/ProductInfo';
import OrderButton from '@/components/order/OrderButton';

import { useProductSummary } from '@/hooks/useProductSummary';
import { useCreateOrder } from '@/hooks/useCreateOrder';
import { useAuth } from '@/hooks/useAuth';
import { useGoToHome, useGoToLogin } from '@/hooks/useGoTo';
import { isBlank } from '@/utils/validation';
import { cardTemplates } from '@/mock/cardTemplates';
import type { CardTemplate } from '@/mock/cardTemplates';
import type { Receiver } from '@/types/order';

interface FormValues {
  message: string;
  sender: string;
  name: string;
  phone: string;
  qty: number;
}

export default function OrderContent() {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const goToHome = useGoToHome();
  const goToLogin = useGoToLogin();
  const { product } = useProductSummary(id);
  const { mutateAsync } = useCreateOrder();

  const defaultTpl = cardTemplates[0];
  const [selectedTemplate, setSelectedTemplate] = useState<CardTemplate>(defaultTpl);
  const [receivers, setReceivers] = useState<Receiver[]>([]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      message: defaultTpl.defaultTextMessage,
      sender: '',
      name: '',
      phone: '',
      qty: 1,
    },
  });

  useEffect(() => {
    if (user?.name) {
      setValue('sender', user.name);
    }
  }, [user?.name, setValue]);

  const totalQty = receivers.reduce((sum, r) => sum + r.qty, 0);

  const onSubmit = async (data: FormValues) => {
    if (receivers.length === 0) {
      toast.error('받는 사람을 한 명 이상 등록해주세요.');
      return;
    }

    const payload = {
      productId: product.id,
      message: data.message,
      messageCardId: defaultTpl.id.toString(),
      ordererName: data.sender,
      receivers: receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.qty,
      })),
    };

    try {
      await mutateAsync({ payload, token: user?.authToken ?? '' });

      toast.success(
        <div>
          주문이 완료되었습니다.
          <br />
          상품명: {product.name}
          <br />
          구매 수량: {totalQty}
          <br />
          발신자 이름: {data.sender}
          <br />
          메시지: {data.message || '(없음)'}
        </div>,
      );
      goToHome();
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : '알 수 없는 오류가 발생했습니다.';
      if (errorMessage === '401') {
        toast.error('로그인이 필요합니다.');
        goToLogin();
      } else {
        toast.error(errorMessage);
      }
    }
  };

  return (
    <>
      <CardPicker
        selectedId={selectedTemplate.id}
        onSelect={(tpl) => {
          setSelectedTemplate(tpl);
          setValue('message', tpl.defaultTextMessage);
        }}
      />

      <CardMessage
        tpl={selectedTemplate}
        register={register('message', {
          validate: (v) => !isBlank(v) || '메시지를 입력해주세요.',
        })}
        error={errors.message?.message}
      />

      <SenderInfo
        register={register('sender', {
          validate: (v) => !isBlank(v) || '이름을 입력해주세요.',
        })}
        error={errors.sender?.message}
      />

      <ReceiverInfo receivers={receivers} setReceivers={setReceivers} />

      <ProductInfo product={product} />

      <OrderButton priceSum={product.price} qty={totalQty} onClick={handleSubmit(onSubmit)} />
    </>
  );
}
