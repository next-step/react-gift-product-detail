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
import { useProductDetail } from '@/hooks/product';

function Product() {
  const { activeTab, setActiveTab, productBasicInfo, productDetailInfo, productReviewInfo } =
    useProductDetail();

  return (
    <ProductDetailContainerWrapper>
      <ProductoDetailInfoContainer>
        <ProductoDetailImg src={productBasicInfo?.imageURL} alt="productDetailImg" />
        <ProductoDetailName>{productBasicInfo?.name}</ProductoDetailName>
        <ProductoDetailPrice>{productBasicInfo?.price.basicPrice}원</ProductoDetailPrice>
      </ProductoDetailInfoContainer>
      <ProductoDetailBrandContainer>
        <ProductoDetailBrandImg
          src={productBasicInfo?.brandInfo.imageURL}
          alt="productDetailBrandImg"
        />
        <ProductoDetailBrand>{productBasicInfo?.brandInfo.name}</ProductoDetailBrand>
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
      {activeTab === 'description' && <ProductDetail productDetailInfo={productDetailInfo} />}
      {activeTab === 'review' && <ProductReview productReviewInfo={productReviewInfo} />}
      {activeTab === 'detail' && productDetailInfo?.announcements && (
        <Detail detailInfo={productDetailInfo.announcements} />
      )}
      <ProductDetailFooter />
    </ProductDetailContainerWrapper>
  );
}

export default Product;
