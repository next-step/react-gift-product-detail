import { useParams } from 'react-router-dom';
import { useWishCount, useToggleWish } from '@/hooks/useProduct';
import { useNavigate } from 'react-router-dom';
import HeartIcon from '@/components/icons/HeartIcon';
import {Wrapper,WishBox,WishCount,OrderButton,OrderText} from '@/components/product/WishAndOrderBar.style'
const WishAndOrderBar = () => {
  const { productId } = useParams();
  const id = Number(productId);

  const navigate = useNavigate();
  const { data } = useWishCount(id);
  const { mutate: toggleWish } = useToggleWish(id);

  if (!data) return null;

  return (
    <Wrapper>
      <WishBox onClick={() => toggleWish()}>
        <HeartIcon filled={data.isWished} size={24} />
        <WishCount>{data.wishCount.toLocaleString()}</WishCount>
      </WishBox>
      <OrderButton onClick={() => navigate('/order', { state: { id: productId } })}>
        <OrderText>주문하기</OrderText>
      </OrderButton>
    </Wrapper>
  );
};

export default WishAndOrderBar;
