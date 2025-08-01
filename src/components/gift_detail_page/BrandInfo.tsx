import { getGiftItem } from '@/api/services/giftItem.service';
import type { QueryKey } from '@/api/types/giftItem.dto';
import styled from '@emotion/styled';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: auto;
  margin-top: 0.1rem;
  background-color: white;
  padding: ${({ theme }) => theme.spacing.spacing4};
  box-sizing: border-box;
`;

const Image = styled.img`
  height: 2rem;
  border-radius: 1rem;
  overflow: hidden;
`;

const Name = styled.div`
  font-size: 1rem;
  font-weight: 400;
  margin-left: ${({ theme }) => theme.spacing.spacing2};
`;

export const BrandInfo = () => {
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
  const { brandInfo } = data || {};

  return (
    <Container>
      <Image src={brandInfo?.imageURL} />
      <Name>{brandInfo?.name}</Name>
    </Container>
  );
};
