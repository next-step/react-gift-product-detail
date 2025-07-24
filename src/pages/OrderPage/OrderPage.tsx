import Layout from "@/layout";
import { orderCardMockData } from "@/data/orderCardMockData";
import styled from "@emotion/styled";
import CardSelection from "./components/CardSelection/CardSelection";
import SenderSectionComponent from "./components/SenderSection/SenderSection";
import ReceiverSectionComponent from "./components/ReceiverSection/ReceiverSection";
import ProductInfo from "./components/ProductInfo/ProductInfo";
import { useState } from "react";
import { useOrderForm } from "./hooks/useOrderForm";
import { Loading } from "@/components/Loading/Loading";
import { useOrderSubmit } from "./hooks/useOrderSubmit";
import { useQuery } from "@tanstack/react-query";
import type { ProductInfoSummary } from "@/types/ProductInfoSummary";
import { getProductInfo } from "@/data/api";
import { useNavigate, useParams } from "react-router-dom";
import { isClientError } from "@/constants/httpStatus";
import { ROUTES } from "@/constants/routes";
import { AxiosError } from "axios";
import { toast } from "react-toastify";
import { API_ERROR_MESSAGES } from "./constants/apiMessage";
import { QUERY_KEY } from "@/constants/queryKey";

const OrderPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.background.disabled};
  gap: ${({ theme }) => theme.spacing[2]};
`;

function OrderPage() {
  const [isSubmittedOnce, setIsSubmittedOnce] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery<ProductInfoSummary, AxiosError>({
    queryKey: QUERY_KEY.PRODUCT_INFO(id),
    queryFn: () => getProductInfo(id!),
    retry: false,
  });

  const {
    messageCard,
    setMessageCard,
    cardSelectionControl,
    cardSelectionErrors,
    senderControl,
    senderErrors,
    receivers,
    setReceivers,
    validateAllForms,
    getFormValues,
  } = useOrderForm({ isSubmittedOnce });

  const { onSubmitHandler } = useOrderSubmit({
    validateAllForms,
    setIsSubmittedOnce,
    getFormValues,
    receivers,
    messageCard,
    product,
  });

  if (isLoading) {
    return (
      <Layout>
        <Loading />
      </Layout>
    );
  }

  if (isError && error) {
    const status = error.response?.status;
    if (status && isClientError(status)) {
      toast.error(API_ERROR_MESSAGES.PRODUCT_NOT_FOUND);
      navigate(ROUTES.HOME);
    }
    return;
  }

  const totalQuantity = receivers.reduce(
    (acc, cur) => acc + Number(cur.quantity),
    0
  );

  return (
    <Layout>
      <form onSubmit={onSubmitHandler}>
        <OrderPageContainer>
          <CardSelection
            cards={orderCardMockData}
            control={cardSelectionControl}
            errors={cardSelectionErrors}
            messageCard={messageCard}
            setMessageCard={setMessageCard}
          />
          <SenderSectionComponent
            control={senderControl}
            errors={senderErrors}
          />
          <ReceiverSectionComponent
            receivers={receivers}
            setReceivers={setReceivers}
          />
          <ProductInfo product={product!} quantity={totalQuantity.toString()} />
        </OrderPageContainer>
      </form>
    </Layout>
  );
}

export default OrderPage;
