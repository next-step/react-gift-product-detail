import { getGiftItem } from '@/api/services/giftItem.service';
import type { QueryKey } from '@/api/types/giftItem.dto';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-top: 2.8rem;
  background-color: white;
`;

const Image = styled.img`
  width: 100%;
`;

const Name = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: ${({ theme }) => theme.spacing.spacing6};
  margin-left: ${({ theme }) => theme.spacing.spacing4};
`;

const Price = styled.div`
  font-size: 1.25rem;
  font-weight: 700;
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  margin-left: ${({ theme }) => theme.spacing.spacing4};
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
`;

export const ProductOverview = () => {
  const { id } = useParams();
  if (!id) throw new Error('id가 없습니다');
  const parsedId = parseInt(id!);
  const { data } = useSuspenseQuery({
    queryKey: ['giftItem', { id: parsedId }],
    queryFn: ({ queryKey }: { queryKey: QueryKey }) => {
      const { id } = queryKey[1];
      if (!id) throw new Error('id is required');
      return getGiftItem(id);
    },
  });
  const { name, imageURL, price } = data || {};

  return (
    <Container>
      <Image src={imageURL} />
      <Name>{name}</Name>
      <Price>{price?.basicPrice}원</Price>
    </Container>
  );
};
