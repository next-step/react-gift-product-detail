import PageContainer from "@/components/PageContainer";
import CardSelectionSection from "@/sections/OrderSection/CardSelectionSection";
import MessageInputSection from "@/sections/OrderSection/MessageInputSection";
import SenderSection from "@/sections/OrderSection/SenderSection";
import ReceiverModalSection from "@/sections/OrderSection/ReceiverModalSection";
import ProductInfoSection from "@/sections/OrderSection/ProductInfoSection";
import BottomOrderBar from "@/sections/OrderSection/BottomOrderBar";
import { useParams, useNavigate } from "react-router";
import { useState, useEffect } from "react";
import { messageCardData } from "@/mocks/messageCardData";
import { withAuth } from "@/hoc/withAuth";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { orderSchema, type OrderFormData } from "@/utils/validateOrderSchema";
import * as z from "zod";
import { toast } from "react-toastify";
import { AxiosError, HttpStatusCode } from "axios";
import { useAuth } from "@/hooks/useAuth";
import { useOrderMutation } from "@/hooks/useOrderMutation";
import { useProductSummaryQuery } from "@/hooks/useProductSummaryQuery";
import { Suspense } from "react";
import Spinner from "@/components/Spinner";
import { ErrorBoundary } from "react-error-boundary";

type FormData = z.infer<typeof orderSchema>;

function OrderPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const productId = Number(id);

  if (isNaN(productId)) {
    navigate("/");
    return;
  }

  const { data: product } = useProductSummaryQuery(productId);

  const defaultCardId = messageCardData[0]?.id ?? 1;
  const [selectedCardId, setSelectedCardId] = useState(defaultCardId);

  const { user } = useAuth();
  const { mutate: submitOrder } = useOrderMutation();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, touchedFields, isSubmitted },
    setValue,
    watch,
    trigger,
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      message: "",
      sender: "",
      receivers: [],
    },
  });

  useEffect(() => {
    if (user?.name) {
      setValue("sender", user.name);
    }
  }, [user?.name, setValue]);

  const totalQuantity = watch("receivers").reduce((sum, r) => sum + (r.quantity || 0), 0);

  const totalPrice = product ? product.price * totalQuantity : 0;

  const onSubmit = (data: FormData) => {
    if (!product) return;
    submitOrder(
      {
        data: {
          productId: product.id,
          message: data.message,
          messageCardId: String(selectedCardId),
          ordererName: data.sender,
          receivers: data.receivers.map((r) => ({
            name: r.name,
            phoneNumber: r.phone,
            quantity: r.quantity,
          })),
        },
        authToken: user?.authToken || "",
      },
      {
        onSuccess: () => {
          const message =
            `주문이 완료되었습니다.
상품명: ${product?.name}
구매 수량: ${totalQuantity}
발신자 이름: ${data.sender}
메시지: ${data.message}`;

          alert(message);
          navigate("/");
        },
        onError: (error) => {
          if (error instanceof AxiosError && error.response?.status === HttpStatusCode.Unauthorized) {
            toast.error("로그인이 필요합니다. 로그인 페이지로 이동합니다.");
            navigate("/login");
          } else {
            toast.error("주문에 실패했습니다. 다시 시도해주세요.")
          }
        },
      }
    );
  };

  return (
    <PageContainer>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardSelectionSection
          selectedCardId={selectedCardId}
          onSelect={setSelectedCardId}
          setMessage={(msg) => setValue("message", msg)}
        />
        <MessageInputSection
          register={register}
          error={errors.message?.message || ""}
          touched={!!touchedFields.message || isSubmitted}
        />
        <SenderSection
          register={register}
          error={errors.sender?.message || ""}
          touched={!!touchedFields.sender || isSubmitted}
        />
        <ReceiverModalSection
          register={register}
          control={control}
          errors={errors}
          trigger={trigger}
        />
        <ProductInfoSection
          product={{
            imageUrl: product.imageURL,
            name: product.name,
            brand: product.brandName,
            price: product.price,
          }}
        />
        <BottomOrderBar totalPrice={totalPrice} isValid onOrder={handleSubmit(onSubmit)} />
      </form>
    </PageContainer>
  );
}
const ProtectedOrderPage = withAuth(OrderPage);

export default function SuspenseOrderPage() {
  return (
    <ErrorBoundary fallback={<p>에러가 발생했습니다. 다시 시도해주세요.</p>}>
      <Suspense fallback={<Spinner />}>
        <ProtectedOrderPage />
      </Suspense>
    </ErrorBoundary>
  );
}
