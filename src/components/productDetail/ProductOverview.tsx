import styled from '@emotion/styled';
import Text from '@/common/Text';

interface ProductOverviewProps {
  product: {
    name: string;
    imageURL: string;
    price: {
      sellingPrice: number;
    };
    brandInfo: {
      name: string;
      imageURL: string;
    };
  };
}

const ProductOverview = ({ product }: ProductOverviewProps) => {
  return (
    <>
      <ProductImage src={product.imageURL} alt={product.name} />
      <ProductInfo>
        <Text size="title1" weight="bold">
          {product.name}
        </Text>
        <Text size="title2" weight="bold">
          {product.price.sellingPrice}원
        </Text>
        <BrandContent>
          <BrandImage
            src={product.brandInfo.imageURL}
            alt={product.brandInfo.name}
          />
          <Text size="title2" weight="regular">
            {product.brandInfo.name}
          </Text>
        </BrandContent>
      </ProductInfo>
    </>
  );
};

export default ProductOverview;

const ProductImage = styled.img`
  width: 100%;
`;

const ProductInfo = styled.div`
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.spacing3};
`;

const BrandContent = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  border-top: 1px solid ${({ theme }) => theme.colors.gray300};
  display: flex;
  padding: 1rem;
`;

const BrandImage = styled.img`
  width: 5%;
  height: 5%;
  border-radius: 99999px;
  margin-right: 0.5rem;
`;
