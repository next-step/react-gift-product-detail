import { useReadProductsById } from '@/apis/hooks/useReadProductsById';
import { HorizontalSpacing } from '@/components/common/Spacing/HorizontalSpacing';
import { Typography } from '@/components/common/Typography';
import styled from '@emotion/styled';

type Props = {
  productId: string;
};

export const ProductDetailHeroSection = ({ productId }: Props) => {
  const { data: product } = useReadProductsById({ productId });

  return (
    <Wrapper>
      <Image src={product.imageURL} alt={product.name} />
      <HorizontalSpacing size='spacing5' />
      <ContentWrapper>
        <Typography as='h3' variant='title1Bold'>
          {product.name}
        </Typography>
        <HorizontalSpacing size='spacing2' />
        <Typography variant='title1Bold'>
          {product.price.sellingPrice}
          <span style={{ fontWeight: 400 }}>원</span>
        </Typography>
      </ContentWrapper>
      <HorizontalSpacing size='spacing4' />
      <Spacer />
      <HorizontalSpacing size='spacing4' />
      <ContentWrapper
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <BrandImage src={product.brandInfo.imageURL} alt={product.brandInfo.name} />
        <Typography variant='subtitle1Regular'>{product.brandInfo.name}</Typography>
      </ContentWrapper>
      <HorizontalSpacing size='spacing4' />
    </Wrapper>
  );
};

const Wrapper = styled.section`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1/1;
  background-color: ${({ theme }) => theme.colors.scale.gray200};
`;

const ContentWrapper = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const BrandImage = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1/1;
`;

const Spacer = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.scale.gray300};
`;
