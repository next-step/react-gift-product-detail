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

const AnnouncementSection = styled.div`
  margin-top: ${({ theme }) => theme.spacing.lg};
`;

const AnnouncementTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const AnnouncementList = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.gray.gray200};
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
  overflow: hidden;
`;

const AnnouncementItem = styled.div<{ isLast: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.md};
  background: white;
  border-bottom: ${({ isLast, theme }) => 
    isLast ? 'none' : `1px solid ${theme.colors.gray.gray200}`};
  
  &:hover {
    background: ${({ theme }) => theme.colors.gray.gray100};
  }
`;

const AnnouncementName = styled.span`
  font-weight: 500;
  color: ${({ theme }) => theme.colors.gray.gray600};
  font-size: 0.95rem;
`;

const AnnouncementValue = styled.span`
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  font-size: 0.95rem;
`;

interface ProductDetailSectionProps {
  productDetail: ProductDetail;
}

const ProductDetailSection = ({ productDetail }: ProductDetailSectionProps) => {
  const sortedAnnouncements = productDetail.announcement
    ?.sort((a, b) => a.displayOrder - b.displayOrder) || [];

  // description이나 announcement가 모두 없는 경우 섹션을 숨김
  if (!productDetail.description && sortedAnnouncements.length === 0) {
    return null;
  }

  return (
    <DetailSection>
      <SectionTitle>상품 상세 정보</SectionTitle>
      
      {productDetail.description && (
        <DetailDescription 
          dangerouslySetInnerHTML={{ __html: productDetail.description }}
        />
      )}

      {sortedAnnouncements.length > 0 && (
        <AnnouncementSection>
          <AnnouncementTitle>공지사항</AnnouncementTitle>
          <AnnouncementList>
            {sortedAnnouncements.map((item, index) => (
              <AnnouncementItem 
                key={`${item.name}-${index}`} 
                isLast={index === sortedAnnouncements.length - 1}
              >
                <AnnouncementName>{item.name}</AnnouncementName>
                <AnnouncementValue>{item.value}</AnnouncementValue>
              </AnnouncementItem>
            ))}
          </AnnouncementList>
        </AnnouncementSection>
      )}
    </DetailSection>
  );
};

export default ProductDetailSection; 