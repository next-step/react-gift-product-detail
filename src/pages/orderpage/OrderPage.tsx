/** @jsxImportSource @emotion/react */
import styled from "@emotion/styled";
import { Navigate, useParams } from "react-router-dom";
import { FormProvider } from "react-hook-form";
import MessageCardSection from "@/pages/orderpage/MessageCardSection";
import SenderInfoSection from "@/pages/orderpage/SenderInfoSection";
import ReceiverInfoSection from "@/pages/orderpage/ReceiverInfoSection";
import ProductSummarySection from "@/pages/orderpage/ProductSummarySection";
import OrderButton from "@/components/common/BaseButton";
import { useOrderForm } from "@/pages/orderpage/hooks/useOrderForm";
import { useOrderProductSummary } from "@/pages/orderpage/hooks/useOrderProductSummary";
import { useAuth } from "@/contexts/AuthContext";

const OrderPage = () => {
  const { id } = useParams();
  const productId = Number(id);
  const { userInfo } = useAuth();

  if (!userInfo?.authToken) {
    return <Navigate to="/login" replace />;
  }

  const { data: productData } = useOrderProductSummary(productId);

  const { methods, handleSubmit, errors, onSubmit } = useOrderForm(
    productData,
    userInfo
  );

  if (!productData) {
    return <Navigate to="/notfound" replace />;
  }

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <MessageCardSection error={errors.message?.message} />
        <SenderInfoSection error={errors.sender?.message} />
        <ReceiverInfoSection />
        <ProductSummarySection product={productData} />
        <OrderButton
          color="yellow"
          label="주문하기"
          size="large"
          type="submit"
        />
      </Form>
    </FormProvider>
  );
};

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 10px;
`;

export default OrderPage;
