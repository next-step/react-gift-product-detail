import styled from "@emotion/styled";
import Container from "@/components/common/Container";
import Divider from "@/components/common/Divider";
import Order from "@/pages/Order/components/Order";
import { useFormContext } from "react-hook-form";
import { useCallback, useState } from "react";
import { useAuth } from "@/contexts/authContext";
import { ROUTE_PATH } from "@/components/routes/routePath";
import { useNavigate } from "react-router-dom";
import type { ApiErrorResponse } from "@/types/ApiErrorResponse";
import { showFetchErrorToast, showFetchSuccessToast } from "@/utils/showFetchToast";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import type { PostOrderParams } from "@/apis/order/postOrder";
import postOrder from "@/apis/order/postOrder";

const OrderPage = () => {
  return (
    <Order>
      <OrderPageContent />
    </Order>
  );
};

const OrderPageContent = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { handleSubmit: createSubmitHandler, getValues } = useFormContext();
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const { mutate } = useMutation({
    mutationFn: (data: PostOrderParams) => postOrder(data),
    onSuccess: () => {
      showFetchSuccessToast("주문에 성공했습니다.", goHome);
    },
    onError: (error) => {
      if (axios.isAxiosError<ApiErrorResponse>(error)) {
        const statusCode = error.response?.data.data.statusCode as number;
        const message = error.response?.data.data.message as string;
        if (statusCode === 401) {
          showFetchErrorToast(statusCode, "유효하지 않은 계정입니다.", goLogin);
        } else {
          showFetchErrorToast(statusCode, message);
        }
      }
    },
  });

  const navigate = useNavigate();
  const { logout } = useAuth();
  const goHome = useCallback(() => navigate(ROUTE_PATH.HOME), [navigate]);
  const goLogin = useCallback(() => {
    logout();
    navigate(ROUTE_PATH.LOGIN);
  }, [logout, navigate]);

  const onSubmit = async (data: any) => {
    const body: PostOrderParams = {
      productId: data.productId,
      message: data.message,
      messageCardId: `card${data.cardId}`,
      ordererName: data.sender,
      receivers: data.recipients,
    };
    mutate(body);
  };
  return (
    <Container>
      <Content onSubmit={createSubmitHandler(onSubmit)}>
        <Order.Card />
        <Divider spacing="0.5rem" fill={false} />
        <Order.Sender />
        <Divider spacing="0.5rem" fill={false} />
        <Order.Recipient openModal={openModal} />
        <Divider spacing="0.5rem" fill={false} />
        <Order.Product />
        <Divider spacing="3.125rem" />
        <Order.Btn />
      </Content>
      {isModalOpen && (
        <Order.Modal closeModal={closeModal} initialRecipients={JSON.parse(JSON.stringify(getValues("recipients")))} />
      )}
    </Container>
  );
};

export default OrderPage;

const Content = styled.form`
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: start;
  align-items: center;
`;
