import styled from '@emotion/styled';

const Gap = styled.div<{ height: number }>`
  width: 100%;
  height: ${({ height }) => height}px;
  background-color: transparent;
`;

export default Gap;