import styled from '@emotion/styled';
import type { ProductDetail } from '@/types/productDetail';

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

interface ProductAnnouncementSectionProps {
  productDetail: ProductDetail;
}

const ProductAnnouncementSection = ({ productDetail }: ProductAnnouncementSectionProps) => {
  // productDetail이 없거나 announcements가 없는 경우
  if (!productDetail) {
    return (
      <div>
        <h3>상세정보</h3>
        <p>상품 상세 정보를 불러올 수 없습니다.</p>
      </div>
    );
  }

  // announcements 배열이 있는지 확인
  const announcements = Array.isArray(productDetail.announcements) 
    ? productDetail.announcements 
    : [];
  
  const sortedAnnouncements = announcements
    .sort((a, b) => a.displayOrder - b.displayOrder);

  if (sortedAnnouncements.length === 0) {
    return (
      <div>
        <h3>상세정보</h3>
        <p>공지사항이 없습니다.</p>
      </div>
    );
  }

  return (
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
  );
};

export default ProductAnnouncementSection; 