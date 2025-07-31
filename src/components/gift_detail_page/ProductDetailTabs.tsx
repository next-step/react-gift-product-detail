import { getGiftItemDetail, getReviews } from '@/api/services/giftItem.service';
import styled from '@emotion/styled';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { HtmlRenderer } from '../shared/HtmlRenderer';
import { InfoList } from './InfoList';
import type { QueryKey } from '@/api/types/giftItem.dto';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-top: 0.5rem;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.4rem;
  background-color: white;
`;

const TabItem = styled.div<{ isClicked: boolean }>`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1rem;
  font-weight: 400;
  color: ${({ theme, isClicked }) => (isClicked ? 'black' : theme.colors.gray600)};
  box-shadow: ${({ isClicked }) => isClicked && '0 0.1rem 0 0 black'};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.gray300};
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  min-height: 50rem;
  margin-top: 0.1rem;
  margin-bottom: 3.1rem;
  padding: ${({ theme }) => theme.spacing.spacing4};
  box-sizing: border-box;
  background-color: white;
`;

type Tab = 'description' | 'reviews' | 'details';

export const ProductDetailTabs = () => {
  const [currentTab, setCurrentTab] = useState<Tab>('description');
  const { id } = useParams();
  if (!id) throw new Error('id가 없습니다');
  const parsedId = parseInt(id!);
  const { data: detailData } = useQuery({
    queryKey: ['giftItem-summary', { id: parsedId }],
    queryFn: ({ queryKey }: { queryKey: QueryKey }) => {
      const { id } = queryKey[1];
      if (!id) throw new Error('id is required');
      return getGiftItemDetail(id);
    },
  });
  const { data: reviewsData } = useQuery({
    queryKey: ['highlight-review', { id: parsedId }],
    queryFn: ({ queryKey }: { queryKey: QueryKey }) => {
      const { id } = queryKey[1];
      if (!id) throw new Error('id is required');
      return getReviews(id);
    },
  });

  return (
    <Container>
      <Tabs>
        <TabItem
          isClicked={currentTab === 'description' ? true : false}
          onClick={() => setCurrentTab('description')}
        >
          상품설명
        </TabItem>
        <TabItem
          isClicked={currentTab === 'reviews' ? true : false}
          onClick={() => setCurrentTab('reviews')}
        >
          선물후기
        </TabItem>
        <TabItem
          isClicked={currentTab === 'details' ? true : false}
          onClick={() => setCurrentTab('details')}
        >
          상세정보
        </TabItem>
      </Tabs>
      <Content>
        {currentTab === 'description' && <HtmlRenderer html={detailData?.description || ''} />}
        {currentTab === 'reviews' && (
          <InfoList items={reviewsData?.reviews} label="authorName" value="content" />
        )}
        {currentTab === 'details' && (
          <InfoList items={detailData?.announcements} label="name" value="value" />
        )}
      </Content>
    </Container>
  );
};
