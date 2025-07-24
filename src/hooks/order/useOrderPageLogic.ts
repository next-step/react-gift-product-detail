import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRouter } from "@/hooks/common/useRouter";
import {
  useOrderValidation,
  useOrderCalculation,
  useOrderForm,
} from "@/hooks/order";
import { getProductSummary } from "@/api/product";
import { createOrder } from "@/api/order/create-order";
import { ApiError, UnauthorizedError } from "@/api/custom-error";
import { showToast } from "@/utils";
import { API_ERROR_MESSAGE } from "@/constants";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useOrderPageLogic = () => {
  const { goHomePage, goLoginPage } = useRouter();
  const { watch, reset, setValue } = useOrderForm();
  const { validateAllFields, isOrderComplete } = useOrderValidation();
  const { totalQuantity } = useOrderCalculation();
  const { id } = useParams<{ id: string }>();

  const order = watch();
  const {
    data: productData,
    error: productError,
    isLoading: isProductLoading,
  } = useQuery({
    queryKey: ["productSummary", id],
    queryFn: () => getProductSummary(Number(id)),
    enabled: !!id,
  });

  const orderMutation = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      alert(
        `주문이 완료되었습니다.\n상품명: ${order.product?.name}\n구매 수량:${totalQuantity} \n발신자 이름: ${order.senderName}\n메시지: ${order.message}`,
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
        showToast.error(API_ERROR_MESSAGE.ORDER || API_ERROR_MESSAGE.DEFAULT);
      }
      console.error("주문 처리 중 오류 발생:", error);
    },
  });

  useEffect(() => {
    if (productData) {
      setValue("product", {
        id: productData.id,
        name: productData.name,
        imageURL: productData.imageURL,
        price: {
          basicPrice: productData.price,
          discountRate: 0,
          sellingPrice: productData.price,
        },
        brandInfo: {
          name: productData.brandName,
          id: productData.id,
          imageURL: productData.imageURL,
        },
      });
    }
  }, [productData, setValue]);

  useEffect(() => {
    if (productError) {
      if (
        productError instanceof ApiError &&
        productError.statusCode >= 400 &&
        productError.statusCode < 500
      ) {
        showToast.error(productError.message);
        goHomePage();
      } else if (productError instanceof UnauthorizedError) {
        showToast.error(API_ERROR_MESSAGE.LOGIN);
        goLoginPage({ redirect: false });
      } else {
        showToast.error(API_ERROR_MESSAGE.DEFAULT);
      }
    }
  }, [productError, goHomePage, goLoginPage]);

  const handleOrderSubmit = async () => {
    const isValidForm = await validateAllFields();
    if (!isValidForm) return;

    if (!isOrderComplete()) return;

    if (!order.product) return;

    const product = order.product;

    orderMutation.mutate({
      productId: product.id,
      message: order.message,
      messageCardId: String(order.cardTemplate?.id || ""),
      ordererName: order.senderName,
      receivers:
        order.receivers?.map(receiver => ({
          name: receiver.receiverName,
          phoneNumber: receiver.receiverPhone,
          quantity: receiver.quantity,
        })) || [],
    });
  };
  return {
    order,
    handleOrderSubmit,
    isLoading: isProductLoading || orderMutation.isPending,
    error: productError || orderMutation.error,
  };
};
