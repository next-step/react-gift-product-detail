import { useAuth } from '@/hooks/useAuth';
import { theme } from '@/theme/theme';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: ${theme.semanticColors.brand.kakaoYellow};
`;

const Text = styled.p`
  font-size: 1rem;
  font-weight: 700;
  line-height: 1.375rem;
  color: ${theme.semanticColors.text.default};
  margin: 0px;
  text-align: left;
`;

interface OrderButtonProps {
  productId: number;
}

const OrderButton = ({ productId }: OrderButtonProps) => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleClick = () => {
    const to = `/Order?productId=${productId}`;

    if (user) navigate(to);
    else navigate('/login', { state: { from: to } });
  };
  return (
    <Button onClick={handleClick}>
      <Text>주문하기</Text>
    </Button>
  );
};

export default OrderButton;
