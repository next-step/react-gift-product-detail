import styled from "@emotion/styled";
import Heart from "@/components/icons/Heart";
import { generatePath, Link } from "react-router-dom";
import { ROUTE_PATH } from "@/components/routes/routePath";
import { useSuspenseQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/constants/queryKeys";
import getProductWish, { type getProductWishResponse } from "@/apis/products/getProductWish";

interface ProductOrderProps {
  productId: string;
}

const ProductOrder = ({ productId }: ProductOrderProps) => {
  const queryClient = useQueryClient();

  const { data } = useSuspenseQuery({
    queryKey: QUERY_KEYS.PRODUCT_WISH(productId),
    queryFn: () => getProductWish({ productId }),
  });

  const wishMutation = useMutation({
    // 낙관적 업데이트를 위한 임시 mutationFn
    mutationFn: () => Promise.resolve(console.log("wish post 전송")),

    onMutate: async () => {
      await queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCT_WISH(productId) });

      queryClient.setQueryData(QUERY_KEYS.PRODUCT_WISH(productId), (old: getProductWishResponse) => ({
        ...old,
        isWished: !old.isWished,
        wishCount: old.isWished ? old.wishCount - 1 : old.wishCount + 1,
      }));

      return { previousData: data };
    },

    onError: (_error, _variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(QUERY_KEYS.PRODUCT_WISH(productId), context.previousData);
      }
      console.error("위시 업데이트 실패:", _error);
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: QUERY_KEYS.PRODUCT_WISH(productId) });
    },
  });

  const handleWishClick = () => {
    wishMutation.mutate();
  };

  return (
    <Container>
      <WishBtn onClick={handleWishClick} disabled={wishMutation.isPending}>
        <Heart fill={data.isWished} />
        <WishCount>{data.wishCount}</WishCount>
      </WishBtn>
      <OrderBtn to={generatePath(ROUTE_PATH.ORDER, { productId })}>주문하기</OrderBtn>
    </Container>
  );
};

export default ProductOrder;

const Container = styled.div`
  width: 100%;
  max-width: 720px;
  height: 50px;
  margin: 0 auto;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WishBtn = styled.button<{ disabled?: boolean }>`
  background-color: ${({ theme }) => theme.color.backgroundColor.default};
  border: none;
  width: 4rem;
  height: 3.125rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
`;
const WishCount = styled.p`
  font: ${({ theme }) => theme.typography.label2Regular};
  font-size: 0.625rem;
`;
const OrderBtn = styled(Link)`
  background-color: ${({ theme }) => theme.color.kakaoYellow};
  color: ${({ theme }) => theme.color.gray1000};
  width: 100%;
  height: 100%;
  text-decoration: none;
  display: flex;
  justify-content: center;
  align-items: center;
  font: ${({ theme }) => theme.typography.body1Bold};
  cursor: pointer;
`;
