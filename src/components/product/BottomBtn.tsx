import type { ProductWish } from '@/services/productApi';
import styled from '@emotion/styled';
import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const BtnWrapper = styled.div`
  width: 100%;
  height: 64px;
  background-color: transparent;
`;
const BtnAlign = styled.div`
  width: 100%;
  max-width: 720px;
  height: 3.125rem;
  position: fixed;
  bottom: 0px;
  left: 0px;
  right: 0px;
  margin: 0px auto;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(255, 255, 255);
`;
const LikeBtn = styled.button`
  width: 4rem;
  height: 3.125rem;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-direction: column;
  color:red;
`;
const OrderBtn = styled.button`
  width: 100%;
  height: 50px;
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-color: rgb(254, 229, 0);
`;
type Props = {
  wishData: ProductWish;
  handleOrderBtnClick: () => void;
};
const BottomBtn = ({ wishData, handleOrderBtnClick }: Props) => {
  const [isWished, setIsWished] = useState(wishData.isWished);
  const [wishCount, setWishCount] = useState(wishData.wishCount);
  const toggleWish = () => {
    if (isWished) {
      setWishCount((prev) => prev - 1);
    } else {
      setWishCount((prev) => prev + 1);
    }
    setIsWished((prev) => !prev);
  };
  return (
    <BtnWrapper>
      <BtnAlign>
        <LikeBtn onClick={toggleWish}>
          {isWished ? <FaHeart /> : <FaRegHeart />}
          <p>{wishCount}</p>
        </LikeBtn>
        <OrderBtn onClick={handleOrderBtnClick}>주문하기 </OrderBtn>
      </BtnAlign>
    </BtnWrapper>
  );
};

export default BottomBtn;
