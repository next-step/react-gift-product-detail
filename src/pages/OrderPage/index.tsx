import NavigationBar from '@/components/NavigationBar/NavigationBar';
import { messageCards } from '@/data/messageCards';
import MessageCardSelector, { type MessageCard } from './MessageCardSelector/MessageCardSelector';
import SelectedCardPreview from './SelectedCardPreview/SelectedCardPreview';
import { Suspense, useEffect, useState } from 'react';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import Layout from '@/components/Layout';
import SectionTitle from '@/components/SectionTitle';
import SectionDivider from '@/components/SectionDivider';
import SenderInfo from './SenderInfo/SenderInfo';
import ProductSummary from './ProductSummary/ProductSummary';
import BottomButton from '@/components/BottomButton';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { OrderFormSchema } from './schemas/orderSchema';
import type { z } from 'zod';
import ReceiverSection from './ReceiverInfo/ReceiverSection';
import { useAuth } from '@/contexts/AuthContext';
import { useCreateOrder } from '@/api/order';
import { useNavigate, useParams } from 'react-router-dom';

const OrderPage = () => {
  type OrderFormType = z.infer<typeof OrderFormSchema>;

  const methods = useForm<OrderFormType>({
    resolver: zodResolver(OrderFormSchema),
    defaultValues: {
      senderName: '',
      receivers: [],
      message: '',
    },
  });

  const { handleSubmit, setValue, watch } = methods;

  const [selectedCard, setSelectedCard] = useState<MessageCard | null>(null);

  useEffect(() => {
    if (selectedCard) return;

    const defaultCard = messageCards.find((card) => card.id === 904) ?? null;
    setSelectedCard(defaultCard);

    if (!defaultCard) return;

    setValue('message', defaultCard.defaultTextMessage, { shouldValidate: true });
  }, []);

  const handleSelectCard = (card: MessageCard) => {
    setSelectedCard(card);
    setValue('message', card.defaultTextMessage, { shouldValidate: true });
  };

  const { userInfo } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = parseInt(id ?? '', 10);

  const mutation = useCreateOrder({
    authToken: userInfo?.authToken ?? '',
    onSuccess: () => {
      alert('주문이 완료되었습니다!');
      navigate('/');
    },
    onError: () => {
      alert('주문 도중 오류가 발생했습니다.');
    },
  });

  const onSubmit = async (data: OrderFormType) => {
    if (!userInfo?.authToken) {
      window.location.href = '/login';
      return;
    }
    if (isNaN(productId)) {
      alert('유효하지 않은 상품 ID입니다.');
      return;
    }

    const orderData = {
      productId,
      message: data.message,
      messageCardId: String(selectedCard?.id ?? ''),
      ordererName: data.senderName,
      receivers: data.receivers.map((r) => ({
        name: r.receiverName,
        phoneNumber: r.receiverPhone,
        quantity: r.quantity,
      })),
    };

    //test
    console.log('주문 요청 데이터:', orderData);

    mutation.mutate(orderData);
  };

  return (
    <Layout>
      <NavigationBar />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <MessageCardSelector
            cards={messageCards}
            selectedId={selectedCard?.id ?? null}
            onSelect={handleSelectCard}
          />
          <SelectedCardPreview
            card={selectedCard ?? messageCards[0]}
            message={watch('message') ?? ''}
            onChange={(val) => setValue('message', val, { shouldValidate: true })}
          />
          <SectionDivider />
          <SenderInfo />
          <SectionDivider />
          <ReceiverSection />
          <SectionDivider />
          <ErrorBoundary fallback={<div>상품 정보를 불러오는 중 오류가 발생했어요.</div>}>
            <Suspense fallback={<div>상품 정보를 불러오는 중이에요...</div>}>
              <SectionTitle title="상품 정보" />
              <ProductSummary />
            </Suspense>
          </ErrorBoundary>
          <BottomButton type="submit">주문하기</BottomButton>
        </form>
      </FormProvider>
    </Layout>
  );
};

export default OrderPage;
