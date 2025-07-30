import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import type { OrderInfoValues } from '@/types';
import useProductSummary from './useProductSummary';
import useSubmitOrder from './useSubmitOrder';
import showOrderSuccessAlert from '../utils/showOrderSuccessAlert';
import useInitOrderForm from './useInitOrderForm';

const useOrderForm = () => {
  const { id } = useParams<{ id: string }>();
  const productSummaryData = useProductSummary(id as string);
  const orderForm = useInitOrderForm();
  const orderData = orderForm.getValues();
  const price = orderData.receiverInfos.length * (productSummaryData?.price || 0);
  const { mutate: order } = useSubmitOrder();

  const onSubmit = async (formData: OrderInfoValues) => {
    if (!id) return;
    if (orderData.receiverInfos.length === 0) {
      toast('받는 사람이 없습니다');
      return;
    }
    order({ orderData: formData, id });
    showOrderSuccessAlert({ productSummaryData, formData });
  };

  return { orderForm, onSubmit, price, productSummaryData };
};

export default useOrderForm;
