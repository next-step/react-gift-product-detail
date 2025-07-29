import type { ProductWish } from '@/services/productApi';
import styled  from '@emotion/styled';
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
  wishData:ProductWish
}
const BottomBtn = ({ wishData , handleOrderBtnClick}: Props) => {
 const {isWished, wishCount} = wishData
  console.log(wishData.isWished)
  return (
    <BtnWrapper >
      <BtnAlign>
        <LikeBtn>
          {isWished ? <FaHeart /> : <FaRegHeart />}
          <p>{wishCount}</p>
        </LikeBtn>
        <OrderBtn onClick={handleOrderBtnClick
        }>주문하기 </OrderBtn>
      </BtnAlign>{' '}
    </BtnWrapper>
  );
};

export default BottomBtn;
