/** @jsxImportSource @emotion/react */
import * as S from "@/styles/OrderPageStyles";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

import { orderFormSchema } from "@/validations/orderSchema";
import type { OrderFormValues } from "@/validations/orderSchema";
import type { AxiosError } from "axios";
import { PageLayout } from "@/components/layout/PageLayout";
import { PageContainer } from "@/components/layout/PageContainer";
import { Navigation } from "@/components/header/Navigation";
import MessageCardSection from "@/components/order/MessageCardSection";
import SenderInfoSection from "@/components/order/SenderInfoSection";
import ReceiverModal from "@/components/order/ReceiverModal";
import ReceiverTable from "@/components/order/ReceiverTable";
import OrderSummary from "@/components/order/OrderSummary";
import OrderButton from "@/components/order/OrderButton";

import { useAuth } from "@/contexts/AuthContext";
import { PATH } from "@/constants/path";
import { messageCards } from "@/mock/messageCards";

import { useProductSummary } from "@/hooks/queries/useProductSummary";
import { useCreateOrder } from "@/hooks/mutations/useCreateOrder";
import AsyncBoundary from "@/components/common/AsyncBoundary";
import { Spinner } from "@/components/common/Spinner";

const OrderPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { token, isInitialized, isLoggedIn, user } = useAuth();

  const productId = Number(id);
  const { data: product } = useProductSummary(productId);
  const [isReceiverModalOpen, setReceiverModalOpen] = useState(false);

  const methods = useForm<OrderFormValues>({
    resolver: zodResolver(orderFormSchema),
    defaultValues: {
      senderName: user?.email.split("@")[0] ?? "",
      message: "",
      selectedCardId: "904",
      receivers: [],
    },
    mode: "onBlur",
  });

  useEffect(() => {
    const defaultCard = messageCards.find(
      c => c.id === Number(methods.getValues("selectedCardId")),
    );
    if (defaultCard) {
      methods.setValue("message", defaultCard.defaultTextMessage);
    }
  }, [methods]);

  const { handleSubmit, watch, setValue } = methods;
  const receivers = watch("receivers") ?? [];

  const totalQuantity = receivers.reduce(
    (sum, r) => sum + (r.quantity ?? 0),
    0,
  );
  const totalAmount = (product?.price.sellingPrice ?? 0) * totalQuantity;

  const onReceiverComplete = (data: OrderFormValues["receivers"]) => {
    setValue("receivers", data);
  };

  const { mutate } = useCreateOrder({
    productId: product?.id ?? 0,
    token: token ?? "",
  });

  const onValid = (data: OrderFormValues) => {
    if (!product) return;

    if (!token) {
      toast.error("로그인이 필요합니다.");
      navigate(PATH.LOGIN, { replace: true });
      return;
    }

    mutate(data, {
      onSuccess: (_response, variables) => {
        methods.reset();

        const totalQuantity = variables.receivers.reduce(
          (sum, r) => sum + r.quantity,
          0,
        );

        const confirmed = window.confirm(
          `🎉 주문이 완료되었습니다.\n\n` +
            `상품명: ${product.name}\n` +
            `구매 수량: ${totalQuantity}\n` +
            `받는 사람: ${variables.receivers[0]?.name}\n` +
            `메시지: ${variables.message}\n\n`,
        );

        if (confirmed) {
          navigate(PATH.HOME, { replace: true });
        }
      },
      onError: err => {
        const axiosError = err as AxiosError<{
          data: { message: string };
        }>;

        const msg =
          axiosError.response?.data?.data?.message ||
          axiosError.message ||
          "주문 요청 중 오류가 발생했습니다.";

        toast.error(msg);
      },
    });
  };

  if (!isInitialized || !isLoggedIn) return null;

  return (
    <PageLayout>
      <PageContainer>
        <Navigation />

        <AsyncBoundary fallback={<Spinner withWrapper />}>
          {!product && (
            <FormProvider {...methods}>
              <S.Form onSubmit={handleSubmit(onValid)}>
                <S.Container>
                  <S.SectionCard>
                    <MessageCardSection />
                  </S.SectionCard>

                  <S.SectionCard>
                    <SenderInfoSection />
                  </S.SectionCard>

                  <S.SectionCard>
                    <S.SectionHeader>
                      <S.SectionTitle>받는 사람</S.SectionTitle>
                      <S.AddReceiverButton
                        type="button"
                        onClick={() => setReceiverModalOpen(true)}
                      >
                        {receivers.length > 0 ? "수정" : "추가"}
                      </S.AddReceiverButton>
                    </S.SectionHeader>

                    {receivers.length === 0 ? (
                      <S.EmptyBox>
                        <S.EmptyText>
                          받는 사람이 없습니다.
                          <br />
                          받는 사람을 추가해주세요.
                        </S.EmptyText>
                      </S.EmptyBox>
                    ) : (
                      <ReceiverTable />
                    )}
                  </S.SectionCard>

                  <S.SectionCard>
                    <OrderSummary product={product} />
                  </S.SectionCard>
                </S.Container>

                <S.StickyFooter>
                  <S.StickyInner>
                    <OrderButton amount={totalAmount} type="submit" />
                  </S.StickyInner>
                </S.StickyFooter>
              </S.Form>
            </FormProvider>
          )}
        </AsyncBoundary>

        <ReceiverModal
          isOpen={isReceiverModalOpen}
          onClose={() => setReceiverModalOpen(false)}
          onComplete={onReceiverComplete}
        />
      </PageContainer>
    </PageLayout>
  );
};

export default OrderPage;