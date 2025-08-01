import { useProduct } from '@/queries/useProduct';
import { theme } from '@/theme/theme';
import styled from '@emotion/styled';

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  //
  width: 100%;
  padding: 0px 1rem;
`;

const Image = styled.img`
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;

interface BrandProps {
  productId: number;
}

const Brand = ({ productId }: BrandProps) => {
  const { data, isLoading, isError } = useProduct(productId);

  if (isLoading || isError || !data) return null;
  return (
    <>
      <Wrapper>
        <Image src={data.brandInfo.imageURL} alt={data.brandInfo.name} />
        <Text>{data.brandInfo.name}</Text>
      </Wrapper>
    </>
  );
};

export default Brand;
