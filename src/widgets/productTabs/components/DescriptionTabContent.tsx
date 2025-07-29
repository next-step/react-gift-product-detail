import { useSuspenseQuery } from '@tanstack/react-query';
import parse from 'html-react-parser';
import { getProductDetail } from '@/entities/product/api/productApi';
import { productQueryKeys } from '@/entities/product/api/queryKeys';
import type { ProductDetail } from '@/entities/product/model/types';
import * as S from '../styles';

interface DescriptionTabContentProps {
  productId: number;
}

const DescriptionTabContent = ({ productId }: DescriptionTabContentProps) => {
  const { data } = useSuspenseQuery<ProductDetail>({
    queryKey: productQueryKeys.detail(productId),
    queryFn: () => getProductDetail(productId),
  });

  return (
    <S.TabContent>
      <S.DescriptionContent>
        {data?.description ? parse(data.description) : <S.ContentPlaceholder />}
      </S.DescriptionContent>
    </S.TabContent>
  );
};

export default DescriptionTabContent;
