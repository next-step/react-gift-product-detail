import { useSuspenseProduct } from '@/queries/useProduct';
import styled from '@emotion/styled';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: rgb(243, 244, 245);
`;

const Placeholder = () => <Image alt="상품사진" />;

interface ProductImageProps {
  productId: number;
}

const ProductImage = ({ productId }: ProductImageProps) => {
  const { data } = useSuspenseProduct(productId);
  if (!data?.imageURL) return <Placeholder />;
  return (
    <>
      <Image src={data.imageURL} alt={data.name} />
    </>
  );
};

export default ProductImage;
