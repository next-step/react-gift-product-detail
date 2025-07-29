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
import { useState } from 'react';
import ProductDescription from '@/components/product/ProductDescription';
import GiftReview, { type Review } from '@/components/product/GiftReview';
import ProductDetail from '@/components/product/ProductDetail';
import BottomBtn from '@/components/product/BottomBtn';
import { useQuery } from '@tanstack/react-query';
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

const Product = () => {
  const navigate=useNavigate()
  const { productId } = useParams();
  const parsedId = Number(productId);

  const [activeTab, setActiveTab] = useState<'상품설명' | '선물후기' | '상세정보'>('상품설명');
const handleOrderBtnClick =()=>{
  if(productId) navigate(ROUTE_PATH.ORDER.replace(":productId", productId))
}
  const {
    data: productData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProductIntro(parsedId),
  });

  const {
    data: productDetailData,
    isLoading: isDetailLoading,
    error: detailError,
  } = useQuery<ProductIntro>({
    queryKey: ['productDetail', productId],
    queryFn: () => fetchProductDetail(parsedId),
  });
  const {
    data: ReviewData,
    isLoading: isReviewLoading,
    error: ReviewError,
  } = useQuery<Review[]>({
    queryKey: ['productHighlightReview', parsedId],
    queryFn: () => fetchProductHighlightReview(parsedId),
  });

  const {
    data: wishData,
    isLoading: wishDataLoading,
    error: wishError,
  } = useQuery<ProductWish>({
    queryKey: ['productWish', productId],
    queryFn: () => fetchProductWish(parsedId),
  });
  console.log(wishData?.isWished);

  if (!productDetailData) return <div>상세정보 없음</div>;
  if (isReviewLoading) return <div>로딩중입니다..</div>;
  if (ReviewError) return <div>에러 발생: {String(error)}</div>;
  console.dir(productDetailData);
  console.log('타입은? ', typeof productDetailData);
  if (isDetailLoading) return <div>상세로딩중입니다.</div>;
  console.log(productData);
  if (isLoading) return <div>로딩중입니다..</div>;
  if (error) return <div>에러 발생: {String(error)}</div>;
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

export default Product;
