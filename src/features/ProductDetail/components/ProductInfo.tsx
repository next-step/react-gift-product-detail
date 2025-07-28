import type { ProductBasicInfo } from 'src/types/product';
import styled from '@emotion/styled';

interface ProductInfoProps {
  product: ProductBasicInfo;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const {
    imageURL,
    name,
    price: { basicPrice },
    brandInfo,
  } = product;
  return (
    <div>
      <Image src={imageURL} alt={name} />
      <Text>{name}</Text>
      <Text>{basicPrice}</Text>
      <StyleDivider />
      <BrandWrapper>
        <Logo src={brandInfo.imageURL} alt={brandInfo.name} />
        <BrandName>{brandInfo.name}</BrandName>
      </BrandWrapper>
    </div>
  );
};

export default ProductInfo;
//(({ theme }) => ({}));

const Image = styled.img`
  width: 100%;
`;

const Text = styled.p(({ theme }) => ({
  ...theme.typography.title1Bold,
  margin: theme.spacing.spacing4,
}));

const StyleDivider = styled.div(({ theme }) => ({
  width: '100%',
  height: '2px',
  backgroundColor: theme.colors.semantic.backgroundDisabled,
  margin: `${theme.spacing.spacing3} auto`,
}));

const BrandWrapper = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.spacing2,
  margin: theme.spacing.spacing4,
}));

const Logo = styled.img(({ theme }) => ({
  width: theme.spacing.spacing7,
  height: theme.spacing.spacing7,
  borderRadius: ' 50%',
}));

const BrandName = styled.span(({ theme }) => ({
  ...theme.typography.body1Regular,
}));
