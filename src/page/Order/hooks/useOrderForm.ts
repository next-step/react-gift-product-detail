import { toast } from 'react-toastify';
import type { OrderInfoValues } from '@/types';
import useProductSummary from '../../../hooks/useProductSummary';
import useSubmitOrder from './useSubmitOrder';
import showOrderSuccessAlert from '../utils/showOrderSuccessAlert';
import useInitOrderForm from './useInitOrderForm';
import { useParamsIndex } from '@/hooks/useParamsIndex';

const useOrderForm = () => {
  const index = useParamsIndex();
  const productSummaryData = useProductSummary(index);
  const orderForm = useInitOrderForm();
  const orderData = orderForm.getValues();
  const price = orderData.receiverInfos.length * (productSummaryData?.price || 0);
  const order = useSubmitOrder();

  const onSubmit = async (formData: OrderInfoValues) => {
    if (!index) return;
    if (orderData.receiverInfos.length === 0) {
      toast('받는 사람이 없습니다');
      return;
    }
    order({ orderData: formData, index });
    showOrderSuccessAlert({ productSummaryData, formData });
  };

  return { orderForm, onSubmit, price, productSummaryData };
};

export default useOrderForm;
