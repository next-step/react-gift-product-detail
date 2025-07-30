import Spacing from "@/components/Spacing";
import styled from "@emotion/styled";
import { useProductDetail } from "@/hooks/useProductDetail";

export default function ProductCard({ productId }: { productId: string }) {
  const { data: product, isLoading, isError } = useProductDetail(productId);

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !product) return <div>에러 발생</div>;

  return (
    <ProductWrapper>
      <ProudctImg src={product.imageURL} alt={product.name} />
      <Spacing height="20px" />
      <Product>
        <ProductName>{product.name}</ProductName>
        <Spacing height="8px" />
        <ProductPrice>
          {product.price.sellingPrice.toLocaleString()}원
        </ProductPrice>
      </Product>
      <Spacing height="16px" />
      <Spacing height="1px" />
      <Spacing height="16px" />
      <BrandBox>
        <BrandImg src={product.brandInfo.imageURL} />
        <BrandName>{product.brandInfo.name}</BrandName>
      </BrandBox>
      <Spacing height="16px" />
    </ProductWrapper>
  );
}

const ProductWrapper = styled.section`
  width: 100%;
`;

const ProudctImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: ${({ theme }) => theme.colors.gray[200]};
`;

const Product = styled.div`
  width: 100%;
  padding: 0px 1rem;
`;

const ProductName = styled.h3`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;

const ProductPrice = styled.p`
  ${({ theme }) => theme.typography.title1Bold};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;

const BrandBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0px 1rem;
`;

const BrandImg = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

const BrandName = styled.p`
  ${({ theme }) => theme.typography.subtitle1Regular};
  color: ${({ theme }) => theme.colors.gray[900]};
  margin: 0px;
  text-align: left;
`;
