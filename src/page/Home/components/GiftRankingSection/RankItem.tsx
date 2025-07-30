import type { ProductInfo } from '@/types';
import toLocaleString from '@/utils/toLocaleString';
import styled from '@emotion/styled';

interface ItemProps {
  rank: ProductInfo;
  index: number;
  onClick: (id: number) => void;
}

const RankItem = ({ rank, index, onClick }: ItemProps) => {
  return (
    <RankItemContainer key={rank.id} onClick={() => onClick(rank.id)}>
      <RankNumber>{index + 1}</RankNumber>
      <ItemContainer>
        <Image src={rank.imageURL} alt={rank.name} />
        <ItemBrandName>{rank.brandInfo.name}</ItemBrandName>
        <ItemName>{rank.name}</ItemName>
        <ItemPrice>{toLocaleString(rank.price.basicPrice)} 원</ItemPrice>
      </ItemContainer>
    </RankItemContainer>
  );
};

export default RankItem;

const RankItemContainer = styled.div`
  width: 100%;
  position: relative;
  cursor: pointer;
`;

const RankNumber = styled.span`
  position: absolute;
  z-index: 2;
  width: 1.25rem;
  height: 1.25rem;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: ${({ theme }) => theme.typography.subtitle2Bold.fontSize};
  line-height: 1;
  font-weight: ${({ theme }) => theme.typography.subtitle2Bold.fontWeight};
  top: ${({ theme }) => theme.spacing.spacing1};
  left: ${({ theme }) => theme.spacing.spacing1};
  color: rgb(255, 255, 255);
  background-color: ${({ theme }) => theme.colors.colorScale.red[600]};
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
  object-position: center center;
  border-radius: 4px;
  overflow: hidden;
`;

const ItemContainer = styled.div`
  margin: 0;
  padding: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  box-sizing: border-box;
`;

const ItemBrandName = styled.p`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.sub};
  margin: 0px;
  text-align: left;
`;

const ItemName = styled.h6`
  font-size: ${({ theme }) => theme.typography.body2Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body2Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body2Regular.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0px;
  text-align: left;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;

const ItemPrice = styled.p`
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Bold.lineHeight};
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: 0px;
  text-align: left;
  word-break: break-word;
`;
