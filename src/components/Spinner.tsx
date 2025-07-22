import styled from '@emotion/styled';

const Spinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 325px;
  background-color: white;

  &::after {
    content: '';
    width: 40px;
    height: 40px;
    border: 4px solid ${({ theme }) => theme.colors.gray.gray300};
    border-top: 4px solid ${({ theme }) => theme.colors.semantic.kakaoYellow};
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
  }

  @keyframes spin {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default Spinner;
