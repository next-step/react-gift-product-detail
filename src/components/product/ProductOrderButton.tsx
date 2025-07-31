import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';

const Button = styled.button`
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 690px;
  margin: 0 auto;
  width: 100%;
  padding: ${({ theme }) => theme.spacing.spacing5};
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  font-weight: ${({ theme }) => theme.typography.body1Bold.fontWeight};
  font-size: ${({ theme }) => theme.typography.body1Bold.fontSize};
  color: ${({ theme }) => theme.colors.gray.gray1000};
  text-align: center;
  border: none;
`;

interface Props {
  productId: number;
}

const ProductOrderButton = ({ productId }: Props) => {
  const navigate = useNavigate();
  return <Button onClick={() => navigate(`/order/${productId}`)}>주문하기</Button>;
};

export default ProductOrderButton;
