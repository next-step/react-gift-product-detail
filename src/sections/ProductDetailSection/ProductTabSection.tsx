import styled from '@emotion/styled';
import { useState } from 'react';
import { useProductDetailQuery, useProductReviewQuery } from '@/queries/useProductDetailQuery';

const TabList = styled.div`
  display: flex;
  width: 100%;
  border-top: 1px solid ${({ theme }) => theme.color.gray.gray200};
  border-bottom: 1px solid ${({ theme }) => theme.color.gray.gray200};
`;

const TabButton = styled.button<{ active: boolean }>`
  flex: 1;
  padding: ${({ theme }) => theme.spacing.spacing3} 0;
  background: ${({ theme }) => theme.color.semantic.backgroundDefault};
  color: ${({ active, theme }) =>
    active ? theme.color.semantic.textDefault : theme.color.semantic.textPlaceholder};
  border: none;
  ${({ theme }) => theme.typography.title.title2Regular};
  border-bottom: ${({ active, theme }) =>
    active ? `2px solid ${theme.color.semantic.textDefault}` : '2px solid transparent'};
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.color.gray.gray100};
  }
`;

const TabContent = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing4};
`;

const Review = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
  ${({ theme }) => theme.typography.body.body1Regular};
`;

const Announcement = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.spacing6};
  ${({ theme }) => theme.typography.body.body1Regular};
`;

interface Props {
  productId: number;
}

const tabs = ['상품설명', '선물후기', '상세정보'] as const;
type Tab = (typeof tabs)[number];

export default function ProductTabSection({ productId }: Props) {
  const [selectedTab, setSelectedTab] = useState<Tab>('상품설명');

  const { data: detail } = useProductDetailQuery(productId);
  const { data: review } = useProductReviewQuery(productId, {
    enabled: selectedTab === '선물후기',
  });

  return (
    <>
      <TabList>
        {tabs.map(tab => (
          <TabButton key={tab} active={selectedTab === tab} onClick={() => setSelectedTab(tab)}>
            {tab}
          </TabButton>
        ))}
      </TabList>
      <TabContent>
        {selectedTab === '상품설명' && (
          <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        )}
        {selectedTab === '선물후기' &&
          review.reviews.map(r => (
            <Review key={r.id}>
              <b>{r.authorName}</b>
              <p>{r.content}</p>
            </Review>
          ))}
        {selectedTab === '상세정보' &&
          detail.announcements.map(a => (
            <Announcement key={a.displayOrder}>
              <b>{a.name}</b>
              <p>{a.value}</p>
            </Announcement>
          ))}
      </TabContent>
    </>
  );
}
