import ProductDescription from '@/components/ProductDetail/ProductMain/Detail/ProductDescription.tsx';
import ProductReview from '@/components/ProductDetail/ProductMain/Review/ProductReview.tsx';
import ProductInfo from '@/components/ProductDetail/ProductMain/Detail/ProductInfo.tsx';
import Loading from '@/components/Common/Loading/Loading.tsx';
import { Suspense } from 'react';
import useFetchProductDetail from '@/hooks/fetch/useFetchProductDetail.ts';
import useFetchProductReview from '@/hooks/fetch/useFetchProductReview.ts';

interface ProductTabProps {
  selectedTab: string;
  productId: number;
}

export default function ProductTab({ selectedTab, productId }: ProductTabProps) {
  const { data, announcements } = useFetchProductDetail(productId);
  const review = useFetchProductReview(productId);

  return (
    <>
      <Suspense fallback={<Loading />}>
        {selectedTab === '상품설명' && <ProductDescription data={data} />}
        {selectedTab === '선물후기' && <ProductReview review={review} />}
        {selectedTab === '상세정보' && <ProductInfo announcements={announcements} />}
      </Suspense>
    </>
  );
}
