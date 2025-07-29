import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import type { Product } from '@/types/product';

interface Props {
  product: Product;
  rank: number;
}

export function ProductItem({ product, rank }: Props) {
  return (
    <Card>
      <Link to={`/order/${product.id}`}>
        <ThumbWrapper>
          <RankBadge rank={rank}>{rank}</RankBadge>
          <Thumb src={product.imageURL} alt={product.name} loading="lazy" />
        </ThumbWrapper>

        <InfoContainer>
          <Brand>{product.brandName}</Brand>
          <Name title={product.name}>{product.name}</Name>
          <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        </InfoContainer>
      </Link>
    </Card>
  );
}

/* ───────── styles ───────── */

const Card = styled.li`
  position: relative;
  width: 100%;
`;

const ThumbWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1 / 1;
`;

const Thumb = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 4px;
  object-fit: cover;
`;

const RankBadge = styled.span<{ rank: number }>`
  position: absolute;
  top: 4px;
  left: 4px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 20px;
  height: 20px;
  border-radius: 4px;
  font-size: ${({ theme }) => theme.typography.label.label2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.label.label2Bold.fontWeight};
  color: #fff;
  background-color: ${({ rank, theme }) =>
    rank <= 3 ? theme.colors.red.red600 : theme.colors.gray.gray600};
`;

const InfoContainer = styled.div`
  padding: 8px 0;
`;

const Brand = styled.p`
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray600};
`;

const Name = styled.p`
  color: #000;
  font-size: ${({ theme }) => theme.typography.label.label1Bold.fontSize};
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const Price = styled.h3`
  margin-top: 4px;
  font-size: ${({ theme }) => theme.typography.title.title2Bold.fontSize};
  font-weight: ${({ theme }) => theme.typography.title.title2Bold.fontWeight};
`;