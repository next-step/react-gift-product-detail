import { toast } from 'react-toastify';
import { ROUTES } from '@/constants/routes';
import { ERROR_MESSAGES } from '@/constants/validation';
import { hasAxiosErrorStatus } from '@/utils/error';
import type { OrderFormValues } from '@/types/order';
import type { ProductSummary } from '@/hooks/useProductSummary';
import type { NavigateFunction } from 'react-router-dom';

interface HandleOrderSubmitParams {
  data: OrderFormValues;
  product: ProductSummary;
  selectedCardId: number;
  authToken: string;
  totalQuantity: number;
  navigate: NavigateFunction;
  mutateAsync: (payload: {
    formData: OrderFormValues;
    productId: number;
    messageCardId: string;
    authToken: string;
  }) => Promise<unknown>;
}

export const handleOrderSubmit = async ({
  data,
  product,
  selectedCardId,
  authToken,
  totalQuantity,
  navigate,
  mutateAsync,
}: HandleOrderSubmitParams) => {
  if (data.receivers.length === 0) {
    toast.error(ERROR_MESSAGES.EMPTY_RECEIVERS);
    return;
  }

  try {
    await mutateAsync({
      formData: data,
      productId: product.id,
      messageCardId: String(selectedCardId),
      authToken,
    });

    alert(
      `주문이 완료되었습니다.\n` +
        `상품명: ${product.name}\n` +
        `구매 수량: ${totalQuantity}\n` +
        `발신자 이름: ${data.senderName}\n` +
        `메시지: ${data.textMessage}`
    );

    navigate(ROUTES.HOME);
  } catch (err) {
    if (hasAxiosErrorStatus(err, 401)) {
      toast.error(ERROR_MESSAGES.LOGIN_REQUIRED);
      navigate(ROUTES.LOGIN, {
        state: {
          from: {
            pathname: window.location.pathname,
            search: window.location.search,
          },
        },
      });
    } else {
      toast.error(ERROR_MESSAGES.ORDER_FAIL);
    }
  }
};
