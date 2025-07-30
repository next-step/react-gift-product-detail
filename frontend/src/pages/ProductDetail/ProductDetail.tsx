import { useNavigate, useParams } from 'react-router-dom';
import Header from '@/components/Header/Header.tsx';
import { ErrorBoundary } from '@/components/Common/ErrorBoundary.tsx';
import { PATH } from '@/constants/path.ts';
import { Suspense, useEffect, useState } from 'react';
import ProductHead from '@/components/ProductDetail/ProductHead.tsx';
import Loading from '@/components/Common/Loading/Loading.tsx';
import ProductTab from '@/components/ProductDetail/ProductMain/ProductTab.tsx';
import { productTabs } from '@/constants/productTab.ts';
import {
  ProductDetailWrapper,
  ProductTabButton,
  TabButtonWrapper,
} from '@/pages/ProductDetail/ProductDetail.style.ts';
import ProductOrderButton from '@/components/ProductDetail/ProductOrderButton.tsx';
import { AxiosError, HttpStatusCode } from 'axios';

export default function ProductDetail() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const productId = Number(id);
  const [selectedTab, setSelectedTab] = useState<string>(productTabs[0]);

  useEffect(() => {
    // 컴포넌트가 마운트(처음 렌더링) 될 때 스크롤을 맨 위로 이동
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <>
      <Header />
      <ErrorBoundary
        onError={(error) => {
          const axiosError = error as AxiosError;

          if (axiosError.response?.status === HttpStatusCode.NotFound) {
            navigate(PATH.HOME);
          }
        }}
      >
        <Suspense fallback={<Loading />}>
          <ProductHead productId={productId} />
        </Suspense>

        <ProductDetailWrapper>
          <TabButtonWrapper>
            {productTabs.map((tab) => (
              <ProductTabButton
                key={tab}
                isActive={selectedTab === tab}
                onClick={() => setSelectedTab(tab)}
              >
                {tab}
              </ProductTabButton>
            ))}
          </TabButtonWrapper>
          <ProductTab selectedTab={selectedTab} productId={productId} />
        </ProductDetailWrapper>

        <ProductOrderButton productId={productId} />
      </ErrorBoundary>
    </>
  );
}
