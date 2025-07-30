import styled from '@emotion/styled';
import { useProductDetail } from '@/hooks/useProductDetail';
import { useProductHighlightReview } from '@/hooks/useProductDetail';

const Wrapper = styled.section``;

const Tabs = styled.div`
  display: flex;
  background: #fff;
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[300]};
`;

const Tab = styled.button<{ active: boolean }>`
  flex: 1;
  padding: 16px 20px;
  text-align: center;
  border: none;
  border-bottom: 2px solid ${({ active }) => (active ? '#000' : 'transparent')};
  color: ${({ theme, active }) => (active ? '#000' : theme.colors.gray[600])};
  ${({ theme }) => theme.typography.body1Regular};
  cursor: pointer;
`;

const TabContent = styled.div`
  background: #fff;
  padding: 16px;
  min-height: 400px;
`;

const DescriptionImg = styled.div`
  display: flex;
  flex-direction: column;

  img {
    width: 100%;
    height: auto;
  }

  p {
    ${({ theme }) => theme.typography.body1Regular};
  }
`;

const ReviewList = styled.div`
  display: flex;
  flex-direction: column;
`;

const ReviewItem = styled.div`
  margin-top: 16px;
`;

const ReviewerName = styled.p`
  ${({ theme }) => theme.typography.body2Bold};
`;

const ReviewContent = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  margin: 8px 0;
`;

const DetailList = styled.div`
  display: flex;
  flex-direction: column;
`;

const DetailItem = styled.div`
  margin-top: 16px;
`;

const DetailLabel = styled.p`
  ${({ theme }) => theme.typography.body2Bold};
`;

const DetailText = styled.p`
  ${({ theme }) => theme.typography.body1Regular};
  margin: 8px 0;
`;

type TabType = 'description' | 'review' | 'detail';

interface ProductTabsProps {
  activeTab: TabType;
  setActiveTab: (tab: TabType) => void;
  productId: string;
}

export default function ProductTabs({ activeTab, setActiveTab, productId }: ProductTabsProps) {
  const { data: detailData, isLoading: isDetailLoading } = useProductDetail(productId);
  const { data: reviewData, isLoading: isReviewLoading } = useProductHighlightReview(productId);

  return (
    <Wrapper>
      <Tabs>
        <Tab active={activeTab === 'description'} onClick={() => setActiveTab('description')}>
          상품설명
        </Tab>
        <Tab active={activeTab === 'review'} onClick={() => setActiveTab('review')}>
          선물후기
        </Tab>
        <Tab active={activeTab === 'detail'} onClick={() => setActiveTab('detail')}>
          상세정보
        </Tab>
      </Tabs>

      <TabContent>
        {activeTab === 'description' &&
          (isDetailLoading ? (
            <div>로딩 중...</div>
          ) : detailData?.description ? (
            <DescriptionImg dangerouslySetInnerHTML={{ __html: detailData.description }} />
          ) : (
            <div>설명 정보가 없습니다.</div>
          ))}

        {activeTab === 'review' &&
          (isReviewLoading ? (
            <div>로딩 중...</div>
          ) : (
            <ReviewList>
              {reviewData?.reviews.map((review) => (
                <ReviewItem key={review.id}>
                  <ReviewerName>{review.authorName}</ReviewerName>
                  <ReviewContent>{review.content}</ReviewContent>
                </ReviewItem>
              ))}
            </ReviewList>
          ))}

        {activeTab === 'detail' &&
          (isDetailLoading ? (
            <div>로딩 중...</div>
          ) : detailData?.announcements?.length ? (
            <DetailList>
              {detailData.announcements.map((item) => (
                <DetailItem key={item.displayOrder}>
                  <DetailLabel>{item.name}</DetailLabel>
                  <DetailText>{item.value}</DetailText>
                </DetailItem>
              ))}
            </DetailList>
          ) : (
            <div>상세 정보가 없습니다.</div>
          ))}
      </TabContent>
    </Wrapper>
  );
}
