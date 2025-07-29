import getProductSummary from "@/apis/products/getProductSummary";
import type { OrderFormType } from "@/pages/Order/components/Order";
import styled from "@emotion/styled";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useMemo } from "react";
import { useFormContext } from "react-hook-form";
import { useParams } from "react-router-dom";
import { QUERY_KEYS } from "@/constants/queryKeys";
import Button from "@/components/common/Button";

const OrderBtn = () => {
  const { watch } = useFormContext<OrderFormType>();
  const { productId } = useParams();
  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.ORDER_PRODUCTS(productId ?? ""),
    queryFn: () => getProductSummary({ productId: productId ?? "" }),
  });
  const product = useMemo(() => data, [data]);
  const receivers = watch("receivers");
  const totalQuantity = receivers.reduce((accumulator, currentValue) => {
    return accumulator + currentValue.quantity;
  }, 0);
  const totalPrice = product ? product.price * totalQuantity : 0;
  return (
    <Btn type="submit" fullWidth>
      {totalPrice}원 주문하기
    </Btn>
  );
};

export default OrderBtn;

const Btn = styled(Button)`
  font: ${({ theme }) => theme.typography.label2Bold};
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0;
  z-index: 999;
`;
