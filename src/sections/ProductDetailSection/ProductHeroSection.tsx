import styled from '@emotion/styled';
import { useProductQuery } from '@/queries/useProductDetailQuery';

const Image = styled.img`
  width: 100%;
  height: auto;
`;

const Info = styled.div`
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing5} ${({ theme }) => theme.spacing.spacing4};
`;

const Name = styled.h2`
  ${({ theme }) => theme.typography.title.title1Bold};
  margin-bottom: ${({ theme }) => theme.spacing.spacing2};
`;

const Price = styled.div`
  ${({ theme }) => theme.typography.title.title2Bold};
  margin-bottom: ${({ theme }) => theme.spacing.spacing3};
`;

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.spacing2};
`;

const BrandLogo = styled.img`
  width: 24px;
  height: 24px;
  border-radius: 50%;
`;

const BrandName = styled.span`
  ${({ theme }) => theme.typography.body.body1Regular};
  color: ${({ theme }) => theme.color.semantic.textDefault};
`;

interface Props {
  productId: number;
}

export default function ProductHeroSection({ productId }: Props) {
  const { data: product } = useProductQuery(productId);
  return (
    <>
      <Image src={product.imageURL} alt={product.name} />
      <Info>
        <Name>{product.name}</Name>
        <Price>{product.price.sellingPrice.toLocaleString()}원</Price>
        <Brand>
          <BrandLogo src={product.brandInfo.imageURL} />
          <BrandName>{product.brandInfo.name}</BrandName>
        </Brand>
      </Info>
    </>
  );
}
