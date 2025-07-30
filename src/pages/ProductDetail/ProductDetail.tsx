import type { ProductDetailInfo } from '@/types/DTO/productDTO';
import parse from 'html-react-parser';
import { ProductDetailContainer } from '@/styles/Product/ProductDetail.styles';
interface ProductDetailProps {
  productDetailInfo: ProductDetailInfo | undefined;
}

function ProductDetail({ productDetailInfo }: ProductDetailProps) {
  if (!productDetailInfo) {
    return <div>Loading...</div>;
  }

  return <ProductDetailContainer>{parse(productDetailInfo.description)}</ProductDetailContainer>;
}

export default ProductDetail;
