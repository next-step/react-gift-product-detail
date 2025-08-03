import styled from '@emotion/styled';
import { Heart } from 'lucide-react';
import isPropValid from '@emotion/is-prop-valid';

interface WishButtonProps {
  wishCount: number;
  isWished: boolean;
  onClick: () => void;
}

const WishButton = ({ wishCount, isWished, onClick }: WishButtonProps) => {
  return (
    <WishIcon onClick={onClick}>
      <StyledHeartIcon isWished={isWished} />
      <Count isWished={isWished}>{wishCount}</Count>
    </WishIcon>
  );
};

export default WishButton;

const StyledHeartIcon = styled(Heart, {
  shouldForwardProp: (prop) => isPropValid(prop) && prop !== 'isWished',
})<{ isWished: boolean }>`
  width: 18px;
  height: 18px;
  color: ${({ isWished, theme }) => (isWished ? theme.color.red700 : theme.color.gray600)};
  fill: ${({ isWished, theme }) => (isWished ? theme.color.red700 : 'none')};
`;

const WishIcon = styled.button`
  position: fixed;
  bottom: 72px;
  left: 16px;
  background: white;
  border: none;
  border-radius: 50%;
  width: 48px;
  height: 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  cursor: pointer;
  padding: 4px 0;
`;

const Count = styled.div<{ isWished: boolean }>`
  font-size: 10px;
  color: ${({ isWished, theme }) => (isWished ? theme.color.text.default : theme.color.gray600)};
  line-height: 1;
`;
