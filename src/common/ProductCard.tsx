import styled from '@emotion/styled';

interface ProductCardProps {
  src: string;
  brandName: string;
  productName: string;
  price: string;
  onClick?: () => void;
}

const ProductCard = ({ onClick, src, brandName, productName, price }: ProductCardProps) => {
  return (
    <Card onClick={onClick}>
      <ProductImage src={src} alt={brandName} />
      <BrandName>{brandName}</BrandName>
      <ProductName>{productName}</ProductName>
      <Price>{price}원</Price>
    </Card>
  );
};

export default ProductCard;

const Card = styled.div`
  width: 215px;
  display: flex;
  flex-direction: column;
  margin-bottom: ${({ theme }) => theme.spacing.spacing4};
  cursor: pointer;
`;

const ProductImage = styled.img`
  width: 100%;
  border-radius: 8px;
`;

const BrandName = styled.div`
  margin-top: 8px;
  font-size: 0.875rem;
  color: ${({ theme }) => theme.colors.textSub};
`;

const ProductName = styled.div`
  margin-top: 4px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.textDefault};
`;

const Price = styled.div`
  margin-top: 4px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.textDefault};
`;
