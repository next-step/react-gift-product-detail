import useOrderCompleteMessage from '@/hook/order/useOrderCompleteMessage';
import useProductSummary from '@/hook/common/useProductSummary';

import {
  DefaultComponentDiv,
  Gap,
  OrderButton,
  Price,
  ProductBox,
  ProductImage,
  ProductInfo,
  ProductName,
  SideBlankDiv,
  SubText,
  SubTitle,
} from '@/styles/CommomStyle/Common.styled';

import { ToastContainer } from 'react-toastify';

const OrderCheck = () => {
  const {price, imageUrl, name, brandName} = useProductSummary();
  const {total, submitOrder} = useOrderCompleteMessage();
  const handleClick = () => {
    submitOrder();
  }


  return (
    <DefaultComponentDiv>
      <ToastContainer />
      <SideBlankDiv>
        <Gap height={8}  />
        <SubTitle>상품 정보</SubTitle>
        <ProductBox>
          <ProductImage src={imageUrl} alt={name ?? '상품 이미지'} />

          <ProductInfo>
            <ProductName>{name}</ProductName>
            <SubText>{brandName}</SubText>
            <Price>
              상품가 <span>{price}원</span>
            </Price>
          </ProductInfo>
        </ProductBox>
      </SideBlankDiv>

      <OrderButton onClick={handleClick}>
        {' '}
        {Number(total) * (price ?? 0)} 원 주문하기
      </OrderButton>
    </DefaultComponentDiv>
  );
};

export default OrderCheck;
