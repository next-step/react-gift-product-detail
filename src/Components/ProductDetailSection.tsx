import styled from '@emotion/styled';
import type { ProductDetail } from '@/types/productDetail';

const DetailSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.xxl};
  padding-top: ${({ theme }) => theme.spacing.lg};
  border-top: 1px solid ${({ theme }) => theme.colors.gray.gray200};
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const DetailDescription = styled.div`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.gray.gray700};
  line-height: 1.6;
  white-space: pre-line;
`;

interface ProductDetailSectionProps {
  productDetail: ProductDetail;
}

const ProductDetailSection = ({ productDetail }: ProductDetailSectionProps) => {
  return (
    <DetailSection>
      <SectionTitle>상품 상세 정보</SectionTitle>
      
      <DetailDescription>{productDetail.description}</DetailDescription>

      {productDetail.announcement && productDetail.announcement.length > 0 && (
        <div style={{ marginTop: '24px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '16px' }}>
            공지사항
          </h3>
          {productDetail.announcement
            .sort((a, b) => a.displayOrder - b.displayOrder)
            .map((item, index) => (
              <div key={index} style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                padding: '12px 0',
                borderBottom: index < productDetail.announcement.length - 1 ? '1px solid #eee' : 'none'
              }}>
                <span style={{ fontWeight: 500, color: '#666' }}>{item.name}</span>
                <span>{item.value}</span>
              </div>
            ))}
        </div>
      )}
    </DetailSection>
  );
};

export default ProductDetailSection; 