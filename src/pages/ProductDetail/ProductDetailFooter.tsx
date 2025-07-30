import {
  FooterContainer,
  FooterLikeButton,
  FooterOrderButton,
} from '@/styles/Product/ProductFooter.styles';
import useProductDetail from '@/hooks/product/useProductDetail';
import { HiHeart, HiOutlineHeart } from 'react-icons/hi';

function ProductDetailFooter() {
  const { likeCount, isWished, handleLikeClick, handleOrderClick } = useProductDetail();
  return (
    <FooterContainer>
      <FooterLikeButton onClick={handleLikeClick}>
        {isWished ? <HiHeart size={24} color="#ff4757" /> : <HiOutlineHeart size={24} />}
        <p>{likeCount}</p>
      </FooterLikeButton>
      <FooterOrderButton onClick={handleOrderClick}>주문하기</FooterOrderButton>
    </FooterContainer>
  );
}

export default ProductDetailFooter;
