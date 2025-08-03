import { useState } from 'react';
import styled from '@emotion/styled';
import type { QueryKey } from '@/api/types/giftItem.dto';
import { GiftItemCard } from '@/components/shared/GiftItemCard';
import { Header } from './Header';
import { MoreButton } from './MoreButton';
import { getGiftItems } from '@/api/services/giftItem.service';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useSelectedFilter } from '@/hooks/useSelectedFilter';

const Container = styled.div`
  width: 100%;
  min-height: 16rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: ${({ theme }) => theme.spacing.spacing2};
  width: calc(100% - ${({ theme }) => theme.spacing.spacing8});
  height: fit-content;
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  background-color: white;
`;

const ErrorText = styled.div`
  position: absolute;
  justify-self: center;
  align-self: center;
  font-size: 1rem;
  font-weight: 500;
`;

export const GiftList = () => {
  const [isViewMore, setIsViewMore] = useState(false);
  const { targetType, setTargetType, rankType, setRankType } = useSelectedFilter();
  const { data } = useSuspenseQuery({
    queryKey: ['giftItems', { targetType, rankType }],
    queryFn: ({ queryKey }: { queryKey: QueryKey }) => {
      const { targetType, rankType } = queryKey[1];
      if (!targetType || !rankType) throw new Error('arguments are required');
      return getGiftItems(targetType, rankType);
    },
  });

  return (
    <>
      <Header
        targetType={targetType}
        setTargetType={setTargetType}
        rankType={rankType}
        setRankType={setRankType}
      />
      <Container>
        <List>
          {(data && isViewMore ? data : data!.slice(0, 6)).map((item, i) => {
            return (
              <GiftItemCard
                key={`GIFT_LIST_${item.id}`}
                rank={i + 1}
                id={item.id}
                name={item.name}
                image={item.imageURL}
                brandName={item.brandInfo.name}
                price={item.price.basicPrice}
              />
            );
          })}
        </List>
        {data?.length === 0 && <ErrorText>상품이 없습니다.</ErrorText>}
      </Container>
      {!(data?.length === 0) && (
        <MoreButton isViewMore={isViewMore} setIsViewMore={setIsViewMore} />
      )}
    </>
  );
};
