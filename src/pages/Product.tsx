import Navbar from '@/components/navbar/Navbar';
import { Padding2, Padding4, Padding5 } from '@/components/common/Padding';
import { Flex, SidePadding } from '@/components/common/SidePadding';
import {
  BottemLine,
  BrandImg,
  BrandSection,
  DetailButton,
  DetailSection,
  GrayLine,
  MainSection,
  ProductImage,
} from './Product.styles';
import { Suspense, useState } from 'react';
import ProductDescription from '@/components/product/ProductDescription';
import GiftReview, { type Review } from '@/components/product/GiftReview';
import ProductDetail from '@/components/product/ProductDetail';
import BottomBtn from '@/components/product/BottomBtn';
import { useQuery, useSuspenseQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProductDetail,
  fetchProductHighlightReview,
  fetchProductIntro,
  fetchProductWish,
  type ProductIntro,
  type ProductWish,
} from '@/services/productApi';
import { ROUTE_PATH } from '@/routes/Router';
import ErrorBoundary from './../components/common/ErrorBoundary';

const ProductContent = () => {
  const navigate = useNavigate();
  const { productId } = useParams();
  const parsedId = Number(productId);

  const [activeTab, setActiveTab] = useState<'상품설명' | '선물후기' | '상세정보'>('상품설명');
  const handleOrderBtnClick = () => {
    if (productId) navigate(ROUTE_PATH.ORDER.replace(':productId', productId));
  };
  const { data: productData } = useSuspenseQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductIntro(parsedId),
  });

  const { data: productDetailData } = useSuspenseQuery<ProductIntro>({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(parsedId),
  });
  const { data: ReviewData } = useSuspenseQuery<Review[]>({
    queryKey: ['productHighlightReview', parsedId],
    queryFn: () => fetchProductHighlightReview(parsedId),
  });

  const { data: wishData } = useSuspenseQuery<ProductWish>({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(parsedId),
  });

  const renderTapContent = () => {
    switch (activeTab) {
      case '상품설명':
        return <ProductDescription description={productDetailData.description} />;
      case '선물후기':
        return <GiftReview reviews={ReviewData ?? []} />;

      case '상세정보':
        return <ProductDetail announcements={productDetailData.announcements} />;
    }
  };
  return (
    <div>
      <Navbar />
      <div>
        <MainSection>
          <ProductImage
            alt={productData.name}
            src="https://st.kakaocdn.net/product/gift/product/20250424150621_f98d9eb304024200bc62261f942e3b62.jpg"
          ></ProductImage>
          <Padding5 />
          <div>
            <h3>{productData.name}</h3>
            <Padding2 />
            <p>
              {productData.price.sellingPrice}
              <span>원</span>
            </p>
          </div>
          <Padding4 />
          <GrayLine></GrayLine>
          <Padding4 />
          <BrandSection>
            <BrandImg src={productData.brandInfo.imageURL}></BrandImg>
            <p>{productData.brandInfo.name}</p>
          </BrandSection>
          <Padding4 />
        </MainSection>

        <Padding2 />
        <DetailSection>
          <Flex>
            {['상품설명', '선물후기', '상세정보'].map((tap) => (
              <DetailButton key={tap} onClick={() => setActiveTab(tap as typeof atctiveTab)}>
                <p>{tap}</p>
                {activeTab === tap && <BottemLine />}
              </DetailButton>
            ))}
          </Flex>

          <SidePadding>{renderTapContent()}</SidePadding>
        </DetailSection>
      </div>
      <BottomBtn handleOrderBtnClick={handleOrderBtnClick} wishData={wishData} />
    </div>
  );
};

const Product = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>서스펜스를 사용한 로딩 화면</div>}>
        <ProductContent />
      </Suspense>
    </ErrorBoundary>
  );
};
export default Product;
