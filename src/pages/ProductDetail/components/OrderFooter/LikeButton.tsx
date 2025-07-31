import styled from '@emotion/styled';
import { Heart } from 'lucide-react';

const Button = styled.button`
  width: 4rem;
  height: 3.125rem;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
`;

const Counter = styled.p`
  font-size: 0.625rem;
  font-weight: 400;
  line-height: 1rem;
  color: rgb(42, 48, 56);
  margin: 0px;
  text-align: left;
`;

const LikeButton = () => {
  return (
    <Button>
      <Heart size={20} strokeWidth={1.5} />
      <Counter></Counter>
    </Button>
  );
};

export default LikeButton;
