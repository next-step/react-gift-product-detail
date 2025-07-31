import styled from '@emotion/styled';

const OrderButton = styled.button`
  background: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  color: ${({ theme }) => theme.colors.semantic.textDefault};
  border: none;
  padding: ${({ theme }) => theme.spacing.button.paddingLarge};
  border-radius: ${({ theme }) => theme.spacing.button.borderRadiusLarge};
  font-size: 1.3rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  width: 100%;
  max-width: 300px;
  margin-top: ${({ theme }) => theme.spacing.xxl};

  &:hover {
    background: ${({ theme }) => theme.colors.semantic.kakaoYellowHover};
  }
`;

interface ProductOrderSectionProps {
  onOrderClick: () => void;
}

const ProductOrderSection = ({ onOrderClick }: ProductOrderSectionProps) => {
  return (
    <OrderButton onClick={onOrderClick}>
      주문하기
    </OrderButton>
  );
};

export default ProductOrderSection; 