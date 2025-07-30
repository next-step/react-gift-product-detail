import styled from '@emotion/styled';
import { GiftItemCard } from '../shared/GiftItemCard';
import { useEffect, useRef } from 'react';
import { keyframes } from '@emotion/react';
import { useParams } from 'react-router-dom';
import { useInfiniteQuery } from '@tanstack/react-query';
import { getThemedGiftItems } from '@/api/services/giftItem.service';

const Container = styled.div`
  flex: 1;
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

const IntersectionTrigger = styled.div`
  width: 100%;
  height: 1rem;
`;

export const GiftList = () => {
  const intersectionTriggerRef = useRef<HTMLDivElement | null>(null);
  const { id } = useParams();
  if (!id) throw new Error('id가 없습니다');
  const parsedId = parseInt(id!);
  const { data, isLoading, isError, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ['themedGiftItems', { id: parsedId }],
    queryFn: ({ queryKey, pageParam }) => {
      const { id } = queryKey[1] as { id: number };
      const cursor = pageParam || 0;
      if (!id) throw new Error('id is required');
      return getThemedGiftItems(id, cursor);
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage) => (lastPage?.hasMoreList ? lastPage.cursor : undefined),
  });

  console.log('data', data);

  useEffect(() => {
    if (!data) return;

    const targetElement = intersectionTriggerRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && data.pages[data.pages.length - 1].hasMoreList) {
          fetchNextPage();
        }
      },
      {
        root: null,
        rootMargin: '300px',
        threshold: 0.1,
      }
    );
    if (targetElement) observer.observe(targetElement);

    return () => {
      if (targetElement) observer.unobserve(targetElement);
    };
  }, [data, fetchNextPage]);

  return (
    <Container>
      {isLoading && <Spinner />}
      {!isLoading && (
        <List>
          {data?.pages.map((item) =>
            item.list.map((item) => {
              return (
                <GiftItemCard
                  key={`GIFT_THEMED_LIST_${item.id}`}
                  id={item.id}
                  name={item.name}
                  image={item.imageURL}
                  brandName={item.brandInfo.name}
                  price={item.price.basicPrice}
                />
              );
            })
          )}
        </List>
      )}
      {isError && (
        <ErrorText>⚠️ 요청 처리 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.</ErrorText>
      )}
      {!isLoading && data?.pages.length === 0 && <ErrorText>상품이 없습니다.</ErrorText>}
      {data?.pages[data.pages.length - 1].hasMoreList && (
        <IntersectionTrigger ref={intersectionTriggerRef}>
          {isFetchingNextPage && <Spinner />}
        </IntersectionTrigger>
      )}
    </Container>
  );
};
