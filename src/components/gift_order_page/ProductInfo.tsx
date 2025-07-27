import useProductInfo from '@/hooks/useProductInfo';
import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import type { GiftItemData } from '@/types/giftItemData';
import { useQuery } from '@tanstack/react-query';
import { getGiftItemDetail } from '@/api/services/getGiftItemDetail';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
  height: auto;
  background-color: white;
`;

const Label = styled.div`
  ${({ theme }) => theme.typography.title2Bold};
  margin-left: 1rem;
  margin-top: 0.7rem;
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: calc(100% - 2rem);
  height: 5.6rem;
  box-sizing: border-box;
  margin: 0.8rem 1rem 4.6rem 1rem;
  border-radius: 0.5rem;
  border-style: solid;
  border-color: ${({ theme }) => theme.colors.gray300};
  border-width: 1px;
`;

const ProductImg = styled.img`
  width: 4rem;
  aspect-ratio: 1 / 1;
  margin-left: 1rem;
  border-radius: 0.3rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  height: auto;
  margin-left: 0.8rem;
`;

const Name = styled.div`
  ${({ theme }) => theme.typography.body2Regular}
`;

const Brand = styled.div`
  ${({ theme }) => theme.typography.label2Regular}
  color: ${({ theme }) => theme.colors.gray700};
`;

const Price = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.3rem;
`;

const PriceLabel = styled.div`
  ${({ theme }) => theme.typography.label1Regular}
  color: ${({ theme }) => theme.colors.gray700};
`;

const PriceValue = styled.div`
  ${({ theme }) => theme.typography.title2Bold}
  margin-left: 0.3rem;
`;

type Params = {
  id: number;
};

export const ProductInfo = () => {
  const { id } = useParams();
  if (!id) throw new Error('id가 없습니다');
  const parsedId = parseInt(id!);
  const { data, isLoading } = useQuery<GiftItemData, Error, GiftItemData, [string, Params]>({
    queryKey: ['giftItemDetail', { id: parsedId }],
    queryFn: getGiftItemDetail,
  });
  const { setId, setName, setPrice, setBrand } = useProductInfo();

  useEffect(() => {
    if (isLoading) return;

    setId(data!.id);
    setName(data!.name);
    setPrice(data!.price.basicPrice);
    setBrand(data!.brandInfo.name);
  }, [data, isLoading, setBrand, setId, setName, setPrice]);

  return (
    <Container>
      <Label>상품 정보</Label>
      <Body>
        {data?.imageURL && <ProductImg src={data.imageURL} />}
        <Info>
          <Name>{data?.name}</Name>
          <Brand>{data?.brandInfo.name}</Brand>
          <Price>
            <PriceLabel>상품가</PriceLabel>
            <PriceValue>{data?.price.basicPrice}원</PriceValue>
          </Price>
        </Info>
      </Body>
    </Container>
  );
};
