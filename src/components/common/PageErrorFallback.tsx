import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { ROUTE } from '@/constants/routes';
import Spinner from './Spinner';

const Wrapper = styled.div`
  padding: 100px ${({ theme }) => theme.spacing.spacing5};
  text-align: center;
`;

const Message = styled.p`
  margin: ${({ theme }) => theme.spacing.spacing3} 0;
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
`;

const Button = styled.button`
  padding: ${({ theme }) => theme.spacing.spacing3} ${({ theme }) => theme.spacing.spacing5};
  margin-top: ${({ theme }) => theme.spacing.spacing3};
  border-radius: ${({ theme }) => theme.spacing.spacing2};
  border: none;
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: ${({ theme }) => theme.colors.gray.gray1000};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
`;

const PageErrorFallback = () => {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <Spinner />
      <Message>문제가 발생했습니다.</Message>
      <Button onClick={() => navigate(ROUTE.MAIN)}>홈으로</Button>
    </Wrapper>
  );
};

export default PageErrorFallback;
