import { useState } from 'react';
import { FormProvider } from 'react-hook-form';
import { useProductSummary } from '@/features/Order/hooks/useProductSummary';
import { cards } from '@/data/cards';
import { useOrderForm } from '@/features/Order/hooks/useOrderForm';

import CardSelect from '@/features/Order/components/CardSelect/CardSelect';
import CardPreview from '@/features/Order/components/CardPreview/CardPreview';
import MessageInput from '@/features/Order/components/MessageInput/MessageInput';
import SenderInput from '@/features/Order/components/SenderInput/SenderInput';
import ProductInfo from '@/features/Order/components/ProductInfo/ProductInfo';
import BottomPurchaseBar from '@/features/Order/components/BottomPurchaseBar/BottomPurchaseBar';
import ReceiverSection from '@/features/Order/components/ReceiverSection/ReceiverSection';

interface Props {
  idNum: number;
}

const OrderPageContent = ({ idNum }: Props) => {
  const product = useProductSummary(idNum);

  if (!product) {
    return <div>상품 정보를 찾을 수 없습니다.</div>;
  }

  const [selectedCardId, setSelectedCardId] = useState<number>(904);
  const selectedCard = cards.find((card) => card.id === selectedCardId)!;
  const [message, setMessage] = useState<string>(
    selectedCard.defaultTextMessage
  );

  const {
    methods,
    fields,
    append,
    remove,
    getValues,
    trigger,
    confirmReceivers,
    totalPrice,
    onSubmit,
  } = useOrderForm({
    productId: idNum,
    defaultMessage: message,
    productName: product.name ?? '',
    sellingPrice: product.price ?? 0,
    selectedCardId,
    selectedCardMessage: message,
  });

  const {
    register,
    formState: { errors },
  } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={onSubmit}>
        <CardSelect
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
        <CardPreview selectedCardId={selectedCardId} />
        <MessageInput
          message={message}
          setMessage={setMessage}
          error={errors?.message?.message}
        />
        <SenderInput
          register={register('sender')}
          error={errors?.sender?.message}
        />
        <ReceiverSection
          fields={fields}
          register={register}
          errors={errors}
          append={append}
          remove={remove}
          getValues={getValues}
          trigger={trigger}
          onConfirm={confirmReceivers}
        />
        <ProductInfo product={product} />
        <BottomPurchaseBar handlePurchase={onSubmit} totalPrice={totalPrice} />
      </form>
    </FormProvider>
  );
};

export default OrderPageContent;
