import { Image, MessageTextArea } from '@/shared/ui';
import { SenderSection } from '@/features/orderCreation';
import { ReceiverSection } from '@/features/receiverManagement';
import { useReceiver } from '@/entities/receiver/model/context';
import type { Order } from '@/entities/order/model/constants';
import type { ProductSummary } from '@/entities/product/model/types';
import type { TextAreaChangeHandler, InputChangeHandler } from '@/shared/types';
import CardCarousel from '@/features/orderCreation/ui/CardCarousel';
import ProductInfo from '@/features/orderCreation/ui/ProductInfo';
import * as S from './styles';

interface CardState {
  selectedCardId: number;
  message: string;
}

interface FormData {
  senderName: string;
}

interface OrderTemplateProps {
  orders: Order[];
  cardState: CardState;
  selectedCard: Order | undefined;
  onCardClick: (id: number) => void;
  onMessageChange: TextAreaChangeHandler;
  formData: FormData;
  onSenderNameChange: InputChangeHandler;
  product?: ProductSummary;
  onSubmit: () => void;
}

const OrderTemplate = ({
  orders,
  cardState,
  selectedCard,
  onCardClick,
  onMessageChange,
  formData,
  onSenderNameChange,
  product,
  onSubmit,
}: OrderTemplateProps) => {
  const { receiverList } = useReceiver();

  const totalQuantity = receiverList.reduce((sum, receiver) => sum + receiver.quantity, 0);

  return (
    <>
      <S.ContentWrapper>
        <S.Container>
          <S.FirstSection>
            <CardCarousel
              orders={orders}
              selectedCardId={cardState.selectedCardId}
              onCardClick={onCardClick}
            />
            <S.PreviewContainer>
              <S.PreviewImageContainer>
                <Image
                  src={selectedCard?.imageUrl || ''}
                  alt={selectedCard ? `${selectedCard.id}번 메시지 카드` : '메시지 카드'}
                  variant="preview"
                />
              </S.PreviewImageContainer>
            </S.PreviewContainer>
            <MessageTextArea
              value={cardState.message}
              onChange={onMessageChange}
              placeholder="메시지를 입력하세요"
            />
          </S.FirstSection>
          <S.Spacer />
          <SenderSection senderName={formData.senderName} onSenderNameChange={onSenderNameChange} />
          <S.Spacer />
          <ReceiverSection />
          {product && (
            <>
              <S.Spacer />
              <ProductInfo product={product} />
            </>
          )}
        </S.Container>
      </S.ContentWrapper>
      <S.FixedBottomButton onClick={onSubmit}>
        {product && totalQuantity > 0
          ? `${(product.price * totalQuantity).toLocaleString()}원 주문하기`
          : '0원 주문하기'}
      </S.FixedBottomButton>
    </>
  );
};

export default OrderTemplate;
