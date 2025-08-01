import type { ProductDetail } from '@/types/product';

export const ProductInfoTab = ({ productDetail }: { productDetail: ProductDetail }) => {
  return (
    <div>
      <h2>상품 정보</h2>
      <div dangerouslySetInnerHTML={{ __html: productDetail.description }} />
    </div>
  );
};