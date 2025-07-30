import { useEffect, useState } from 'react';
import styled from '@emotion/styled';
import type { GiftItemData } from '@/api/types/giftItem.dto';
import { GiftItemCard } from '@/components/shared/GiftItemCard';
import { Header } from './Header';
import { MoreButton } from './MoreButton';
import { keyframes } from '@emotion/react';
import { getGiftItems } from '@/api/services/giftItem.service';
import { useQuery } from '@tanstack/react-query';

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

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  width: 1.7rem;
  height: 1.7rem;
  border: 0.2rem solid #ccc;
  border-top-color: ${({ theme }) => theme.colors.gray900};
  border-radius: 50%;
  animation: ${spin} 0.7s linear infinite;
`;

const ErrorText = styled.div`
  position: absolute;
  justify-self: center;
  align-self: center;
  font-size: 1rem;
  font-weight: 500;
`;

export const GiftList = () => {
  const [giftItems, setGiftItems] = useState<GiftItemData[]>([]);
  const [isViewMore, setIsViewMore] = useState(false);
  const [targetType, setTargetType] = useState(localStorage.getItem('currentTarget') || 'ALL');
  const [rankType, setRankType] = useState(localStorage.getItem('currentTopic') || 'MANY_WISH');
  const { data, isLoading, isError } = useQuery({
    queryKey: ['giftItems', { targetType, rankType }],
    queryFn: getGiftItems,
  });

  useEffect(() => {
    if (isLoading) return;

    if (isViewMore) {
      setGiftItems(data!);
    } else {
      setGiftItems(data!.slice(0, 6));
    }
  }, [data, isLoading, isViewMore]);

  return (
    <>
      <Header
        targetType={targetType}
        setTargetType={setTargetType}
        rankType={rankType}
        setRankType={setRankType}
      />
      <Container>
        {isLoading && <Spinner />}
        {!isLoading && (
          <List>
            {giftItems.map((item, i) => {
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
        )}
        {isError && (
          <ErrorText>⚠️ 요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</ErrorText>
        )}
        {!isLoading && giftItems?.length === 0 && <ErrorText>상품이 없습니다.</ErrorText>}
      </Container>
      {!isLoading && !isError && !(giftItems?.length === 0) && (
        <MoreButton isViewMore={isViewMore} setIsViewMore={setIsViewMore} />
      )}
    </>
  );
};
