import styled from '@emotion/styled';
import type { ProductDetail } from '@/types/productDetail';

const DetailDescription = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  line-height: 1.6;
  white-space: pre-line;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  
  /* HTML 이미지 스타일링 */
  img {
    max-width: 100%;
    height: auto;
    margin: ${({ theme }) => theme.spacing.md} 0;
    border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

interface ProductDetailSectionProps {
  productDetail: ProductDetail;
}

const ProductDetailSection = ({ productDetail }: ProductDetailSectionProps) => {
  if (!productDetail.description) {
    return null;
  }

  return (
    <DetailDescription 
      dangerouslySetInnerHTML={{ __html: productDetail.description }}
    />
  );
};

export default ProductDetailSection; 