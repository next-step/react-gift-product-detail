import styled from '@emotion/styled/macro';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Container = styled.div`
  white-space: pre-wrap;
  max-width: 100%;
  width: 100%;
  overflow-y: hidden;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
`;

const ImageHolder = styled.p`
  width: 100%;
`;

const Image = styled.img`
  width: 100%;
`;
const ProductExplain = () => {
  return (
    <>
      <Wrapper>
        <Container>
          <ImageHolder>
            <Image />
          </ImageHolder>
        </Container>
      </Wrapper>
    </>
  );
};

export default ProductExplain;
