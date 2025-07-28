import {
  FooterContainer,
  FooterLikeButton,
  FooterOrderButton,
} from '@/styles/Product/ProductFooter.styles';

function ProductDetailFooter() {
  return (
    <FooterContainer>
      <FooterLikeButton>좋아요</FooterLikeButton>
      <FooterOrderButton>주문하기</FooterOrderButton>
    </FooterContainer>
  );
}
export default ProductDetailFooter;
