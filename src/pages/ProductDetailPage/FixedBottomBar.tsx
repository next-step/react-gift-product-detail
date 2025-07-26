/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import { useWishInfo } from '../../apis/product_detail';

const FixedBottomBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const match = location.pathname.match(/^\/detail\/(\d+)$/);
  const productId = match?.[1];

  const { data: wish } = useWishInfo(productId || '');
  const [isWished, setIsWished] = useState(wish?.isWished ?? false);

  useEffect(() => {
    if (wish) {
      setIsWished(wish.isWished);
    }
  }, [wish]);

  if (!productId) return null;

  return (
    <div css={barStyle}>
      <button css={wishButton} onClick={() => setIsWished((prev) => !prev)}>
        {isWished ? (
          <AiFillHeart size={24} color="red" />
        ) : (
          <AiOutlineHeart size={24} />
        )}
        <span>{wish?.wishCount?.toLocaleString()}</span>
      </button>
      <button css={orderButton} onClick={() => navigate(`/order/${productId}`)}>
        주문하기
      </button>
    </div>
  );
};

export default FixedBottomBar;

const barStyle = css`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  max-width: 720px;
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  border-top: 1px solid #eee;
  background-color: #fff;
  z-index: 10;
`;

const wishButton = css`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 14px;
  background: none;
  border: none;
  cursor: pointer;
`;

const orderButton = css`
  flex: 1;
  margin-left: 16px;
  background: #feda00;
  color: #000;
  font-weight: bold;
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  text-align: center;
`;
