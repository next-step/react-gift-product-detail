import { useState } from 'react';
import styled from '@emotion/styled';
import { FaHeart } from 'react-icons/fa';
import { CiHeart } from 'react-icons/ci';

interface WishBtnProps {
  isWished: boolean;
  wishCount?: number;
}

const WishBtn = ({
  isWished: initialIsWished,
  wishCount: initialWishCount = 0,
}: WishBtnProps) => {
  const [isWished, setIsWished] = useState(initialIsWished);
  const [wishCount, setWishCount] = useState(initialWishCount);

  const handleClick = () => {
    if (isWished) {
      setIsWished(false);
      setWishCount((prev) => Math.max(prev - 1, 0));
    } else {
      setIsWished(true);
      setWishCount((prev) => prev + 1);
    }
  };

  return (
    <Button onClick={handleClick}>
      {isWished ? <FilledIcon /> : <OutlineIcon />}
      {wishCount}
    </Button>
  );
};

export default WishBtn;

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0 ${({ theme }) => theme.spacing.spacing3} 0 0;
  display: flex;
  align-items: center;
  font-size: 1rem;
`;

const OutlineIcon = styled(CiHeart)`
  width: 24px;
  height: 24px;
  color: ${({ theme }) => theme.colors.gray600};
  margin-right: 4px;
`;

const FilledIcon = styled(FaHeart)`
  width: 24px;
  height: 24px;
  color: red;
  margin-right: 4px;
`;
