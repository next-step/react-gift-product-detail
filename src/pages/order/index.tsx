import styled from "@emotion/styled";
import { useCallback, useRef, useState } from "react";
import MessageCard, {
  type MessageCardHandle,
} from "@/pages/order/components/MessageCard";
import SenderInfo, {
  type SenderInfoHandle,
} from "@/pages/order/components/SenderInfo";
import ReceiverListSection, {
  type Receiver,
} from "@/pages/order/components/ReceiverListSection";
import ProductInfo from "@/pages/order/components/ProductInfo";
import OrderFooter from "@/pages/order/components/OrderFooter";

import { useParams } from "react-router-dom";
import { validateReceiverCount } from "@/utils/validators";
import { ERROR_MESSAGES } from "@/constants/messages";
import { useProductSummary } from "@/hooks/useProductSummary";
import { useAuth } from "@/hooks/useAuth";
import { useOrder } from "@/hooks/useOrder";
import { toast } from "react-toastify";

export default function OrderPage() {
  const { productId } = useParams();

  const id = Number(productId);
  const { product } = useProductSummary(id);
  const { user } = useAuth();
  const { submitOrder, isPending } = useOrder();

  const messageCardRef = useRef<MessageCardHandle>(null);
  const senderInfoRef = useRef<SenderInfoHandle>(null);

  const [receivers, setReceivers] = useState<Receiver[]>([]);
  const [message, setMessage] = useState("");
  const [messageCardId, setMessageCardId] = useState("");
  const [senderName, setSenderName] = useState(user?.name ?? "");

  const totalQuantity = receivers.reduce(
    (sum, receiver) => sum + receiver.quantity,
    0,
  );

  const totalPrice = product?.price ? product.price * totalQuantity : 0;

  const handleOrderClick = async () => {
    if (isPending) return;

    const isMessageValid = messageCardRef.current?.validate() ?? false;
    const isSenderValid = senderInfoRef.current?.validate() ?? false;

    if (!isMessageValid || !isSenderValid) return;

    const receiverError = validateReceiverCount(receivers.length);
    if (receiverError) {
      toast.error(receiverError);
      return;
    }

    if (!product) {
      toast.error(ERROR_MESSAGES.PRODUCT.NONE);
      return;
    }

    await submitOrder({
      productId: product.id,
      message,
      messageCardId,
      ordererName: senderName,
      receivers: receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    });
  };

  const handleReceiverChange = useCallback((newReceivers: Receiver[]) => {
    setReceivers(newReceivers);
  }, []);

  return (
    <>
      <MessageCard
        ref={messageCardRef}
        onMessageChange={(msg) => setMessage(msg)}
        onCardChange={(id) => setMessageCardId(id)}
      />
      <SectionDivider />
      <SenderInfo
        ref={senderInfoRef}
        onChange={(name) => setSenderName(name)}
        initialValue={user?.name}
      />
      <SectionDivider />
      <ReceiverListSection onChange={handleReceiverChange} />
      <SectionDivider />
      <ProductInfo
        name={product.name}
        imageUrl={product.imageURL}
        brand={product.brandName}
        price={product.price}
      />
      <OrderFooter totalPrice={totalPrice} onClick={handleOrderClick} />
    </>
  );
}

const SectionDivider = styled.div`
  height: 12px;
  background-color: ${({ theme }) => theme.colors.semantic.background.disabled};
`;
