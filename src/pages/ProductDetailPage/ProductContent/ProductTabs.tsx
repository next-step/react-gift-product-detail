import { ErrorBoundary } from '@/components/ErrorBoundary';
import styled from '@emotion/styled';
import { Suspense } from 'react';

interface Props {
  activeTab: number;
  setActiveTab: (index: number) => void;
  detailHTML: string | undefined;
  highlightReviews: { id: string; authorName: string; content: string }[];
  announcements: { name: string; value: string; displayOrder: number }[];
}

const ProductTabs = ({
  activeTab,
  setActiveTab,
  detailHTML,
  highlightReviews,
  announcements,
}: Props) => {
  return (
    <>
      <TabNav>
        <Tab onClick={() => setActiveTab(0)} isActive={activeTab === 0}>
          상품설명
        </Tab>
        <Tab onClick={() => setActiveTab(1)} isActive={activeTab === 1}>
          선물후기
        </Tab>
        <Tab onClick={() => setActiveTab(2)} isActive={activeTab === 2}>
          상세정보
        </Tab>
      </TabNav>

      <SectionContent>
        {activeTab === 0 && (
          <ErrorBoundary fallback={<p>상품 설명을 불러오지 못했습니다.</p>}>
            <Suspense fallback={<p>상품 설명 로딩 중...</p>}>
              <DescriptionHTML dangerouslySetInnerHTML={{ __html: detailHTML ?? '' }} />
            </Suspense>
          </ErrorBoundary>
        )}

        {activeTab === 1 && (
          <ErrorBoundary fallback={<p>후기를 불러오지 못했습니다.</p>}>
            <Suspense fallback={<p>후기 로딩 중...</p>}>
              <ReviewList>
                {highlightReviews.map((review) => (
                  <ReviewItem key={review.id}>
                    <Reviewer>{review.authorName}</Reviewer>
                    <ReviewContent>{review.content}</ReviewContent>
                  </ReviewItem>
                ))}
              </ReviewList>
            </Suspense>
          </ErrorBoundary>
        )}

        {activeTab === 2 && (
          <ErrorBoundary fallback={<p>상세 정보를 불러오지 못했습니다.</p>}>
            <Suspense fallback={<p>상세 정보 로딩 중...</p>}>
              <AnnouncementList>
                {announcements.map((item) => (
                  <AnnouncementItem key={item.displayOrder}>
                    <strong>{item.name}</strong>
                    <span>{item.value}</span>
                  </AnnouncementItem>
                ))}
              </AnnouncementList>
            </Suspense>
          </ErrorBoundary>
        )}
      </SectionContent>
    </>
  );
};

export default ProductTabs;

const TabNav = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.gray200};
`;

const Tab = styled.button<{ isActive: boolean }>`
  padding: 17px 83px;
  background-color: white;
  color: ${({ isActive, theme }) => (isActive ? theme.color.text.default : theme.color.gray600)};
  border: none;
  border-bottom: ${({ isActive, theme }) =>
    isActive ? `2px solid ${theme.color.text.default}` : '2px solid transparent'};
  cursor: pointer;
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};

  &:hover {
    background-color: ${({ theme }) => theme.color.gray100};
  }
`;

const SectionContent = styled.div`
  min-height: 200px;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 50px;
`;

const DescriptionHTML = styled.div`
  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

const ReviewList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ReviewItem = styled.li`
  padding: 12px 16px;
  background-color: ${({ theme }) => theme.color.gray100};
  border-radius: 8px;
`;

const Reviewer = styled.p`
  font-weight: 600;
  margin-bottom: 4px;
  color: ${({ theme }) => theme.color.gray800};
`;

const ReviewContent = styled.p`
  color: ${({ theme }) => theme.color.gray700};
  font-size: 15px;
  line-height: 1.5;
`;

const AnnouncementList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const AnnouncementItem = styled.li`
  strong {
    display: block;
    font-weight: bold;
    margin-bottom: 4px;
    color: ${({ theme }) => theme.color.gray800};
  }
  span {
    color: ${({ theme }) => theme.color.gray700};
    font-size: 14px;
  }
  margin-bottom: 20px;
`;
