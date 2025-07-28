import * as S from './styles';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@/shared/config';
import { useParams } from 'react-router-dom';
import { useMutation, useQueryClient, useSuspenseQuery } from '@tanstack/react-query';
import { getProductWish } from '@/entities/product/api/productApi';
import { QUERY_KEYS } from '@/shared/config/queryKeys';
import type { ProductWish } from '@/entities/product/model/types';

export const ProductActionGroup = () => {
  const navigate = useNavigate();
  const { productId } = useParams<{ productId: string }>();
  const numericProductId = productId ? parseInt(productId, 10) : undefined;
  const queryClient = useQueryClient();

  if (!numericProductId) {
    return null;
  }

  const { data: wishData } = useSuspenseQuery<ProductWish>({
    queryKey: QUERY_KEYS.PRODUCT_WISH(numericProductId),
    queryFn: () => getProductWish(numericProductId),
  });

  const wishMutation = useMutation({
    mutationFn: async (nextWished: boolean) => {
      return nextWished;
    },
    onMutate: async (nextWished: boolean) => {
      const previous = queryClient.getQueryData<ProductWish>(QUERY_KEYS.PRODUCT_WISH(numericProductId));
      
      queryClient.setQueryData<ProductWish>(QUERY_KEYS.PRODUCT_WISH(numericProductId), (prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          isWished: nextWished,
          wishCount: prev.wishCount + (nextWished ? 1 : -1),
        };
      });

      return { previous };
    },
    onError: (_err, _vars, context) => {
      if (context?.previous) {
        queryClient.setQueryData(QUERY_KEYS.PRODUCT_WISH(numericProductId), context.previous);
      }
    },
  });

  const toggleWish = () => {
    if (!wishData) return;
    wishMutation.mutate(!wishData.isWished);
  };

  return (
    <S.Container>
      <S.WishButton 
        isWished={wishData?.isWished || false}
        onClick={toggleWish}
      >
        <Heart 
          fill={wishData?.isWished ? "#ff0000" : "none"} 
          color={wishData?.isWished ? "#ff0000" : "#2a3038"}
        />
        <p>{wishData?.wishCount || 0}</p>
      </S.WishButton>
      <S.OrderButton onClick={() => navigate(`/${ROUTES.ORDER}/${numericProductId}`)}>
        주문하기
      </S.OrderButton>
    </S.Container>
  );
};