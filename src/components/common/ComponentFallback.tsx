import styled from '@emotion/styled';
import Spinner from './Spinner';

const Wrapper = styled.div`
  padding: ${({ theme }) => theme.spacing.spacing10} 0;
  text-align: center;
`;

const Message = styled.p`
  margin-top: ${({ theme }) => theme.spacing.spacing4};
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  color: ${({ theme }) => theme.colors.semantic.textSub};
`;

const ComponentFallback = () => {
  return (
    <Wrapper>
      <Spinner />
      <Message>불러오는 중입니다...</Message>
    </Wrapper>
  );
};

export default ComponentFallback;
