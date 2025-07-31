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
const Brand = () => {
  return (
    <>
      <Wrapper>
        <Image alt="브랜드 로고" />
        <Text>브랜드명</Text>
      </Wrapper>
    </>
  );
};

export default Brand;
