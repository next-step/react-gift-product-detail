import { useSuspenseQuery } from '@tanstack/react-query';
import { getProductDetail } from '@/entities/product/api/productApi';
import { productQueryKeys } from '@/entities/product/api/queryKeys';
import type { ProductDetail } from '@/entities/product/model/types';
import * as S from '../styles';

interface DetailTabContentProps {
  productId: number;
}

const DetailTabContent = ({ productId }: DetailTabContentProps) => {
  const { data } = useSuspenseQuery<ProductDetail>({
    queryKey: productQueryKeys.detail(productId),
    queryFn: () => getProductDetail(productId),
  });

  return (
    <S.TabContent>
      <S.DetailContent>
        {data?.announcements?.length ? (
          data.announcements.map((item, index) => (
            <S.DetailItem key={index}>
              <S.DetailName>{item.name}</S.DetailName>
              <S.DetailValue>{item.value}</S.DetailValue>
            </S.DetailItem>
          ))
        ) : (
          <S.ContentPlaceholder />
        )}
      </S.DetailContent>
    </S.TabContent>
  );
};

export default DetailTabContent;
