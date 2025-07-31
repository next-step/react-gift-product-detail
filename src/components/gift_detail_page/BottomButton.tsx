import styled from '@emotion/styled';
import { HeartIcon } from './HeartIcon';
import { getWishInfo } from '@/api/services/giftItem.service';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import type { QueryKey, WishInfo } from '@/api/types/giftItem.dto';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: auto;
  max-width: 720px;
  position: fixed;
  bottom: 0;
  z-index: 1;
  background-color: white;
`;

const OrderButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3.1rem;
  background-color: ${({ theme }) => theme.colors.yellow600};
`;

const LikeButton = styled.button`
  all: unset;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 4rem;
  height: 100%;
`;

const Number = styled.div`
  ${({ theme }) => theme.typography.label2Regular};
`;

const Text = styled.div`
  ${({ theme }) => theme.typography.title2Bold};
`;

const SVG_SIZE = 22;

export const BottomButton = () => {
  const { id } = useParams();
  if (!id) throw new Error('id가 없습니다');
  const parsedId = parseInt(id!);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data } = useQuery({
    queryKey: [`wish-${parsedId}`, { id: parsedId }],
    queryFn: ({ queryKey }: { queryKey: QueryKey }) => {
      const { id } = queryKey[1];
      if (!id) throw new Error('id is required');
      return getWishInfo(id);
    },
  });
  const handleLike = () => {
    queryClient.setQueryData<WishInfo>([`wish-${parsedId}`, { id: parsedId }], (old) => {
      if (!old) return old;
      return {
        ...old,
        isWished: !old.isWished,
        wishCount: old.isWished ? old.wishCount - 1 : old.wishCount + 1,
      };
    });
  };

  return (
    <Container>
      <LikeButton onClick={handleLike}>
        <HeartIcon
          size={SVG_SIZE}
          strokeColor={data?.isWished ? 'red' : 'black'}
          fillColor={data?.isWished ? 'red' : 'transparent'}
        />
        <Number>{data?.wishCount}</Number>
      </LikeButton>
      <OrderButton onClick={() => navigate(`/order/${parsedId}`)}>
        <Text>주문하기</Text>
      </OrderButton>
    </Container>
  );
};
