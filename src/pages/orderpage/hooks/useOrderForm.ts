import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { fullOrderSchema } from "@/utils/validator";
import type { FullOrderFormValues } from "@/utils/validator";
import { useApiMutation } from "@/hooks/useApiMutation";
import { API_ENDPOINTS } from "@/utils/API_ENDPOINTS";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function useOrderForm(productData: any, userInfo: any) {
  const navigate = useNavigate();
  const orderMutation = useApiMutation<{ success: boolean }>({
    url: API_ENDPOINTS.ORDER,
    method: "post",
  });

  const methods = useForm<FullOrderFormValues>({
    resolver: zodResolver(fullOrderSchema),
    defaultValues: {
      message: "",
      sender: userInfo?.name ?? "",
      receivers: [],
      messageCardId: "",
    },
  });
  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit = async (data: FullOrderFormValues) => {
    if (data.receivers.length === 0) {
      toast.error("받는 사람이 없습니다.");
      return;
    }
    if (!productData) return;

    try {
      const result = await orderMutation.mutateAsync({
        productId: productData.id,
        message: data.message,
        messageCardId: data.messageCardId,
        ordererName: data.sender,
        receivers: data.receivers,
      });

      if (result?.success) {
        alert(
          `주문이 완료되었습니다.\n상품명: ${productData.name}\n구매 수량: ${data.receivers.reduce((acc, cur) => acc + cur.quantity, 0)}\n발신자 이름: ${data.sender}\n메시지: ${data.message}`
        );
        navigate("/", { replace: true });
      }
    } catch (error: any) {
      throw error;
    }
  };

  return {
    methods,
    handleSubmit,
    errors,
    onSubmit,
  };
}
