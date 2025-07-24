import styled from "@emotion/styled";

export const Spinner = () => {
  return <Wrapper>로딩중...</Wrapper>;
};

const Wrapper = styled.div`
  padding: 40px 0;
  text-align: center;
  font-size: 14px;
  color: ${({ theme }) => theme.colors.semantic.text.disabled};
`;
