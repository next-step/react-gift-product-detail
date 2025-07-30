import { Spinner } from '@/components/common/Spinner';
import styled from '@emotion/styled';

export const SelectThemeSectionLoader = () => (
  <LoadingWrapper>
    <Spinner size='large' color='kakaoBrown' />
  </LoadingWrapper>
);

const LoadingWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 15.625rem;
  grid-column: span 5;
`;
