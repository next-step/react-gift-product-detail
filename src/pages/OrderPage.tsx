import { useParams, useNavigate, Navigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { useEffect, useState, useRef } from 'react';
import { messageCardMockData } from '@/mocks/messageCards';
import { messageRequiredValidator, nameRequiredValidator } from '@/utils/validator';
import OrderField from '@/components/common/OrderField';
import { ROUTE } from '@/constants/routes';
import { useForm } from 'react-hook-form';
import RecipientModal, { type Recipient } from '@/components/order/RecipientModal';
import type { OrderRequest } from '@/types/order';
import { useUser } from '@/contexts/UserContext';
import { toast, ToastContainer } from 'react-toastify';
import axios, { HttpStatusCode } from 'axios';
import { useProductSummary } from '@/hooks/useProduct';
import { useOrderMutation } from '@/hooks/useOrder';

import CardSelector from '@/components/order/CardSelector';
import SelectedCardImage from '@/components/order/SelectedCardImage';
import SenderField from '@/components/order/SenderField';
import RecipientSection from '@/components/order/RecipientSection';
import ProductSection from '@/components/order/ProductSection';
import OrderButton from '@/components/order/OrderButton';
import type { FormValues } from '@/types/orderForm';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing4};
  padding-bottom: 100px;
  max-width: 720px;
  margin: 0 auto;
`;

const OrderPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { user } = useUser();

  const [selectedCardId, setSelectedCardId] = useState(messageCardMockData[0].id);
  const selectedCard = messageCardMockData.find((c) => c.id === selectedCardId);
  const [recipients, setRecipients] = useState<Recipient[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const hasShownError = useRef(false);

  const {
    data: product,
    isLoading: isProductLoading,
    isError: isProductError,
  } = useProductSummary(Number(productId));

  const { mutateAsync: orderMutate } = useOrderMutation();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      message: selectedCard?.defaultTextMessage || '',
      sender: '',
    },
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  useEffect(() => {
    if (user?.name) {
      setValue('sender', user.name);
    }
  }, [user, setValue]);

  if (isProductError) {
    if (!hasShownError.current) {
      toast.error('상품 정보를 불러올 수 없습니다.');
      hasShownError.current = true;
    }
    return <Navigate to={ROUTE.MAIN} replace />;
  }

  const onSubmit = async (form: FormValues) => {
    if (!product) {
      return;
    }

    if (recipients.length === 0) {
      toast.error('받는 사람이 없습니다.');
      return;
    }

    alert(
      `주문이 완료되었습니다.\n` +
        `상품명: ${product.name}\n` +
        `구매 수량: ${recipients.reduce((sum, r) => sum + r.quantity, 0)}\n` +
        `발신자 이름: ${form.sender}\n` +
        `메시지: ${form.message}`
    );

    const payload: OrderRequest = {
      productId: product.id,
      message: form.message,
      messageCardId: String(selectedCardId),
      ordererName: form.sender,
      receivers: recipients.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    };

    try {
      await orderMutate(payload);
      navigate(ROUTE.MAIN);
    } catch (error) {
      if (error instanceof axios.AxiosError) {
        const status = error.response?.status;
        const msg = error.response?.data?.data?.message || '주문에 실패했습니다.';

        if (status === HttpStatusCode.Unauthorized) {
          navigate(ROUTE.LOGIN);
        } else {
          toast.error(msg);
        }
      } else {
        toast.error('오류가 발생했습니다.');
      }
    }
  };

  if (isProductLoading || !product) {
    return <div>상품을 찾을 수 없습니다.</div>;
  }

  return (
    <Wrapper>
      <CardSelector
        selectedCardId={selectedCardId}
        setSelectedCardId={setSelectedCardId}
        setValue={setValue}
      />

      <SelectedCardImage imageUrl={selectedCard?.imageUrl} />

      <form onSubmit={handleSubmit(onSubmit)}>
        <OrderField
          label="메시지"
          as="textarea"
          placeholder="축하 메시지를 입력하세요."
          {...register('message', { validate: messageRequiredValidator })}
          error={errors.message?.message}
        />

        <SenderField
          register={register('sender', { validate: nameRequiredValidator })}
          error={errors.sender?.message}
          showNote={!errors.sender}
        />

        <RecipientSection recipients={recipients} onEditClick={() => setIsModalOpen(true)} />

        <ProductSection product={product} />

        <OrderButton product={product} recipients={recipients} />
      </form>

      {isModalOpen && (
        <RecipientModal
          initialRecipients={recipients}
          onCancel={() => setIsModalOpen(false)}
          onConfirm={(newList) => {
            setRecipients(newList);
            setIsModalOpen(false);
          }}
        />
      )}

      <ToastContainer position="top-center" autoClose={2000} hideProgressBar />
    </Wrapper>
  );
};

export default OrderPage;
