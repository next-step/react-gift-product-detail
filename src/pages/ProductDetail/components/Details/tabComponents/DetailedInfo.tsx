import { theme } from '@/theme/theme';
import styled from '@emotion/styled/macro';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 1rem;
`;

const Margin = styled.div<{ height: string }>`
  width: 100%;
  height: ${({ height }) => height};
  background-color: transparent;
`;

const TextDummy = styled.div``;

const Title = styled.p`
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.1875rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;

const Content = styled.p`
  white-space: pre-wrap;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.375rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;

const DetailedInfo = () => {
  return (
    <>
      <Wrapper>
        <TextDummy>
          <Margin height="16px" />
          <Title>제목</Title>
          <Margin height="8px" />
          <Content>내용</Content>
          <Margin height="8px" />
        </TextDummy>
      </Wrapper>
    </>
  );
};

export default DetailedInfo;
