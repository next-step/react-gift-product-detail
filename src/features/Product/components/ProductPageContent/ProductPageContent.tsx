import BottomBar from '@/features/Product/components/BottomBar/BottomBar';
import ProductMain from '@/features/Product/components/ProductMain/ProductMain';
import ProductDescription from '@/features/Product/components/ProductDescription/ProductDescription';
import { useParams, useNavigate } from 'react-router';
import { ROUTE_PATH } from '@/routes/Router';
import useProductInfo from '@/features/Product/hooks/useProductInfo';
import { useProductDetail } from '@/features/Product/hooks/useProductDetail';
import { useHighlightReview } from '@/features/Product/hooks/useHighlightReview';

const ProductPageContent = () => {
  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();

  const productIdNum =
    productId && !isNaN(Number(productId)) ? Number(productId) : null;

  if (!productIdNum) {
    navigate(ROUTE_PATH.GIFT, { replace: true });
    return null;
  }

  const productInfo = useProductInfo(productIdNum);
  const productDetail = useProductDetail(productIdNum);
  const highlightReviews = useHighlightReview(productIdNum);

  const handleOrderClick = () => {
    navigate(ROUTE_PATH.ORDER.replace(':productId', String(productId)));
  };

  return (
    <>
      {productInfo && <ProductMain product={productInfo} />}
      <ProductDescription
        description={productDetail.description}
        reviews={highlightReviews.reviews}
        announcements={productDetail.announcements}
      />
      <BottomBar productId={productIdNum} handleOrder={handleOrderClick} />
    </>
  );
};

export default ProductPageContent;
