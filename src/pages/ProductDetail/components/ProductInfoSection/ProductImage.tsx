import styled from '@emotion/styled';

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  aspect-ratio: 1 / 1;
  background-color: rgb(243, 244, 245);
`;

const ProductImage = () => {
  return (
    <>
      <Image alt="상품사진" />
    </>
  );
};

export default ProductImage;
