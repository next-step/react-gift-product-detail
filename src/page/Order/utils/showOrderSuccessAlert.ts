import type { OrderInfoValues, ProductSummaryData } from '@/types';

interface useOrderAlertProps {
  productSummaryData?: ProductSummaryData;
  formData: OrderInfoValues;
}

const showOrderSuccessAlert = ({ productSummaryData, formData: orderData }: useOrderAlertProps) => {
  return alert(`
      주문이 완료되었습니다.
      상품명: ${productSummaryData?.name}
      구매 수량: ${orderData.receiverInfos.length}
      발신자 이름: ${orderData.name}
      메시지: ${orderData.message}`);
};
export default showOrderSuccessAlert;
