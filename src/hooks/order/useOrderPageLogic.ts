import { useOrderForm, useOrderValidation } from "@/hooks/order";
import { useCreateOrder } from "@/hooks/order";
import { useRouter } from "@/hooks/common/useRouter";
import { orderPriceCalculator, showToast } from "@/utils";
import { API_ERROR_MESSAGE } from "@/constants";
import { ApiError, UnauthorizedError } from "@/api/custom-error";

export const useOrderPageLogic = () => {
  const { watch, reset } = useOrderForm();

  const {
    mutateOrder,
    isLoading: OrderLoading,
    error: OrderError,
  } = useCreateOrder();

  const { validateAllFields, isOrderComplete } = useOrderValidation();

  const { goHomePage, goLoginPage } = useRouter();

  const receivers = watch("receivers");

  const { totalQuantity } = orderPriceCalculator(receivers);

  const handleOrderSubmit = async (productId: number, productName?: string) => {
    const isValidForm = await validateAllFields();
    if (!isValidForm) return;
    if (!isOrderComplete()) return;

    const order = watch();
    if (
      !order.cardTemplate ||
      !order.message ||
      !order.senderName ||
      !order.receivers?.length
    ) {
      return;
    }

    mutateOrder(
      {
        productId,
        message: order.message,
        messageCardId: String(order.cardTemplate.id),
        ordererName: order.senderName,
        receivers: order.receivers.map(receiver => ({
          name: receiver.receiverName,
          phoneNumber: receiver.receiverPhone,
          quantity: receiver.quantity,
        })),
      },
      {
        onSuccess: () => {
          alert(
            `주문이 완료되었습니다.\n상품명: ${productName}\n구매 수량:${totalQuantity} \n발신자 이름: ${order.senderName}\n메시지: ${order.message}`,
          );
          reset();
          goHomePage();
        },
        onError: error => {
          if (error instanceof UnauthorizedError) {
            showToast.error(API_ERROR_MESSAGE.LOGIN);
            goLoginPage({ redirect: false });
          } else if (error instanceof ApiError) {
            showToast.error(`주문 실패: ${error.message}`);
          } else {
            showToast.error(
              API_ERROR_MESSAGE.ORDER || API_ERROR_MESSAGE.DEFAULT,
            );
          }
          console.error("주문 처리 중 오류 발생:", error);
        },
      },
    );
  };

  return {
    handleOrderSubmit,
    OrderLoading,
    OrderError,
  };
};
