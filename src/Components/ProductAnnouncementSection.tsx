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
  const sortedAnnouncements = productDetail.announcement
    ?.sort((a, b) => a.displayOrder - b.displayOrder) || [];

  if (sortedAnnouncements.length === 0) {
    return null;
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