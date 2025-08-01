import ProductDetailFooter from '@/pages/ProductDetail/ProductDetailFooter';
import ProductDetail from '@/pages/ProductDetail/ProductDetail';
import Detail from '@/pages/ProductDetail/Detail';
import ProductReview from '@/pages/ProductDetail/ProductReview';
import {
  ProductDetailContainerWrapper,
  ProductoDetailInfoContainer,
  ProductoDetailImg,
  ProductoDetailName,
  ProductoDetailPrice,
  ProductoDetailBrandContainer,
  ProductoDetailBrandImg,
  ProductoDetailBrand,
  TabContainer,
  ProductDetailContainer,
} from '@/styles/Product/Product.styles';
import { useProductData, useProductTab } from '@/hooks/product';

function Product() {
  const { productData, isLoading } = useProductData();
  const { activeTab, setActiveTab } = useProductTab();

  if (isLoading) {
    return <div>로딩중...</div>;
  }

  if (!productData) {
    return <div>상품 정보를 불러올 수 없습니다.</div>;
  }

  return (
    <ProductDetailContainerWrapper>
      <ProductoDetailInfoContainer>
        <ProductoDetailImg src={productData.basicInfo.imageURL} alt="productDetailImg" />
        <ProductoDetailName>{productData.basicInfo.name}</ProductoDetailName>
        <ProductoDetailPrice>{productData.basicInfo.price.basicPrice}원</ProductoDetailPrice>
      </ProductoDetailInfoContainer>
      <ProductoDetailBrandContainer>
        <ProductoDetailBrandImg
          src={productData.basicInfo.brandInfo.imageURL}
          alt="productDetailBrandImg"
        />
        <ProductoDetailBrand>{productData.basicInfo.brandInfo.name}</ProductoDetailBrand>
      </ProductoDetailBrandContainer>
      <TabContainer>
        <ProductDetailContainer
          isActive={activeTab === 'description'}
          onClick={() => setActiveTab('description')}
        >
          상품설명
        </ProductDetailContainer>
        <ProductDetailContainer
          isActive={activeTab === 'review'}
          onClick={() => setActiveTab('review')}
        >
          선물후기
        </ProductDetailContainer>
        <ProductDetailContainer
          isActive={activeTab === 'detail'}
          onClick={() => setActiveTab('detail')}
        >
          상세정보
        </ProductDetailContainer>
      </TabContainer>
      {activeTab === 'description' && <ProductDetail productDetailInfo={productData.detailInfo} />}
      {activeTab === 'review' && <ProductReview productReviewInfo={productData.reviewInfo} />}
      {activeTab === 'detail' && productData.detailInfo.announcements && (
        <Detail detailInfo={productData.detailInfo.announcements} />

      )}
      <ProductDetailFooter />
    </ProductDetailContainerWrapper>
  );
}

export default Product;
