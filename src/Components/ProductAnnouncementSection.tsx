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
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.lg};
`;

const AnnouncementItem = styled.div`
  padding: ${({ theme }) => theme.spacing.lg};
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.gray.gray200};
  border-radius: ${({ theme }) => theme.spacing.card.borderRadius};
`;

const AnnouncementName = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  font-size: 1rem;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const AnnouncementValue = styled.div`
  color: ${({ theme }) => theme.colors.gray.gray700};
  font-size: 0.95rem;
  line-height: 1.5;
  white-space: pre-line;
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
      <AnnouncementTitle>상세정보</AnnouncementTitle>
      <AnnouncementList>
        {sortedAnnouncements.map((item, index) => (
          <AnnouncementItem key={`${item.name}-${index}`}>
            <AnnouncementName>{item.name}</AnnouncementName>
            <AnnouncementValue>{item.value}</AnnouncementValue>
          </AnnouncementItem>
        ))}
      </AnnouncementList>
    </AnnouncementSection>
  );
};

export default ProductAnnouncementSection; 