import { useParams, useNavigate } from 'react-router-dom';
import { Layout } from '@/components/Layout';
import { NavBar } from '@/components/NavBar';
import { useProductQuery } from '@/hooks/queries/useProductQuery';
import { useProductWishQuery } from '@/hooks/queries/useProductWishQuery';
import { WishButton } from '@/components/product/WishButton';
import { css } from '@emotion/react';
import { palette, spacing } from '@/styles/theme';
import { useProductDetailQuery } from '@/hooks/queries/useProductDetailQuery';
import { useProductReviewsQuery } from '@/hooks/queries/useProductReviewsQuery';
import { ProductDetailTabs } from '@/components/product/ProductDetailTabs';

const pageWrapper = css` padding-bottom: 100px; `;
const imgBox = css` width: 100%; aspect-ratio: 1/1; img { width: 100%; height: 100%; object-fit: cover; } `;
const infoWrapper = css` padding: ${spacing.spacing5}; `;
const brandName = css` font-size: 14px; color: ${palette.gray700}; `;
const productName = css` font-size: 20px; font-weight: bold; margin-top: ${spacing.spacing1}; `;
const price = css` font-size: 24px; font-weight: bold; margin-top: ${spacing.spacing3}; `;
const footer = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 720px;
  margin: 0 auto;
  padding: ${spacing.spacing3} ${spacing.spacing4};
  background: ${palette.white};
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  align-items: center;
  gap: ${spacing.spacing3};
`;
const orderButton = css`
  flex: 1;
  width: 100%;
  padding: 14px 0;
  border-radius: 8px;
  font-weight: 700;
  font-size: 16px;
  color: ${palette.black};
  background: ${palette.primary};
`;

const divider= css`
  height: 8px;
  background-color: ${palette.gray100};
  margin: ${spacing.spacing4} 0;
  border: none;
`;

const ProductDetailPage = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  
  const { data: product, isLoading: isProductLoading, isError: isProductError } = useProductQuery(productId!);
  const { data: detail, isLoading: isDetailLoading, isError: isDetailError } = useProductDetailQuery(productId!);
  const { data: reviews, isLoading: isReviewsLoading, isError: isReviewsError } = useProductReviewsQuery(productId!);
  const { data: wishData, isLoading: isWishLoading, isError: isWishError } = useProductWishQuery(productId!);

  const isLoading = isProductLoading || isDetailLoading || isReviewsLoading || isWishLoading;
  const isError = isProductError || isDetailError || isReviewsError || isWishError;

  if (isLoading) {
    return (
      <Layout>
        <NavBar />
        <div>상품 정보를 불러오는 중...</div>
      </Layout>
    );
  }

  if (isError || !product || !detail || !reviews || !wishData) {
    return (
      <Layout>
        <NavBar />
        <div>페이지를 표시하는 중 에러가 발생했습니다.</div>
      </Layout>
    );
  }
  console.log('Final data before render:', { product, detail, reviews, wishData });

  return (
    <Layout>
      <NavBar />
      <div css={pageWrapper}>
        <div css={imgBox}>
          <img src={product.imageURL} alt={product.name} />
        </div>
        <div css={infoWrapper}>
          <div css={brandName}>{product.brandInfo.name}</div>
          <div css={productName}>{product.name}</div>
          <div css={price}>{product.price.sellingPrice.toLocaleString()}원</div>
        </div>

        <hr css={divider} />

        <ProductDetailTabs detail={detail} reviews={reviews} />

        <div css={footer}>
          <WishButton productId={productId!} wishData={wishData} />
          <button css={orderButton} onClick={() => navigate(`/order/${productId}`)}>
            주문하기
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetailPage;
