import styled from '@emotion/styled';
import ProductWishButton from './ProductWishButton';
import ProductOrderButton from '@/components/product/ProductOrderButton';

interface Props {
  productId: number;
}

const FooterWrapper = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProductWishOrderFooter = ({ productId }: Props) => {
  return (
    <FooterWrapper>
      <ProductWishButton productId={productId} />
      <ProductOrderButton productId={productId} />
    </FooterWrapper>
  );
};

export default ProductWishOrderFooter;
