import parse from 'html-react-parser';

import { productDetailQueryOptions } from '@/hooks/useProduct';
import { useSuspenseQuery } from '@tanstack/react-query';

import Gap from '@/components/common/Gap.style';
import { Description } from '@/components/product/ProductDescription.style';

interface ProductDescriptionProps {
  productId: number;
}

const ProductDescription = ({ productId }: ProductDescriptionProps) => {
  const { data } = useSuspenseQuery(productDetailQueryOptions(productId));
  return (
    <>
      <Description>{parse(data.description)}</Description>
      <Gap height={20} />
    </>
  );
};

export default ProductDescription;
