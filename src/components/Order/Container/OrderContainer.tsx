import StyledTopestDiv from '@src/styles/StyledTopesDiv';
import OrderCardTemplateContainer from '@src/components/Order/OrderCardTemplate/OrderCardTemplateContainer';

import { Spacer } from '@src/styles/Spacer';
import { FormProvider } from 'react-hook-form';
import SenderContainer from '../Sender/SenderContainer';
import RecipientsModalContainer from '../RecipientsModal/RecipientsModalContainer';
import {
  StyledItemInfoContainer,
  StyledOrderButton,
} from '@src/components/Order/Container/StyledOrderContainer';
import { useOrderForm } from './useOrderForm';

const OrderContainer = () => {
  const {
    methods,
    handleSubmit,
    control,
    errors,
    onSubmit,
    currentRecipients,
    totalPrice,
    selectedProduct, // useOrderForm에서 반환하는 selectedProduct
    isLoadingProduct, // 상품 정보 로딩 상태
    isProductError, // 상품 정보 에러 상태
    // productErrorMessage, // 상품 정보 에러 메시지
    // isOrderMutating, // 주문 전송 로딩 상태
  } = useOrderForm();
  return (
    <FormProvider {...methods}>
      <StyledTopestDiv>
        <form onSubmit={handleSubmit(onSubmit)}>
          <OrderCardTemplateContainer />
          <SenderContainer />
          <RecipientsModalContainer
            control={control}
            errors={errors}
            currentRecipients={currentRecipients}
          />
          <StyledItemInfoContainer className='item-info background-default'>
            <p className='title2Bold basic-label'>상품 정보</p>
            {isLoadingProduct ? <div>Loading</div> : <></>}
            {selectedProduct ? (
              <div className='item-info-text'>
                <img
                  src={selectedProduct.imageURL}
                  alt={selectedProduct.name}
                  className='item-info-img'
                  loading='lazy'
                />
                <div>
                  <p className='body1Regular'>{selectedProduct.name}</p>
                  <p className='label2Regular'>{selectedProduct.brandName}</p>

                  <p className='item-price body2Bold basic-label'>
                    <span className='label1Regular'>상품가 {selectedProduct.price}원</span>
                  </p>
                </div>
              </div>
            ) : (
              <p>선택된 상품이 없습니다.</p>
            )}
            {isProductError ? <div>에러 발생</div> : <></>}
          </StyledItemInfoContainer>

          <StyledOrderButton type='submit' className='order body1Bold'>
            {selectedProduct ? `${totalPrice}원 주문하기` : '상품을 선택해주세요'}
          </StyledOrderButton>
          <Spacer />
        </form>
      </StyledTopestDiv>
    </FormProvider>
  );
};

export default OrderContainer;
