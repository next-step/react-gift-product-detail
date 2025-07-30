// src/components/Order/Container/useOrderForm.ts (수정)
import { zodResolver } from '@hookform/resolvers/zod';
import { URLS } from '@src/assets/urls';
import { orderSchema } from '@src/components/Schemas/orderSchmea';
import type { OrderFormValue } from '@src/types/OrderFormValues';
import type { Recipient } from '@src/types/Recipient';
import { useEffect } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useGetOrderForm } from './useGetOrderForm';
import { usePostOrderForm, type OrderRequestData } from './usePostOrderForm';

export const useOrderForm = () => {
  const navigate = useNavigate();

  const { productId } = useParams<{ productId: string }>();
  const { data: selectedProduct, isError, isLoading } = useGetOrderForm(productId);
  useEffect(() => {
    if (isError) {
      toast('상품 정보 로딩에 실패하였습니다.');
      navigate(URLS.home);
    }
  }, [isError, navigate]);

  const {
    mutate: postOrder,
    isError: isOrderError,
    error: orderError,
  } = usePostOrderForm(navigate);

  const methods = useForm<OrderFormValue>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      msg: '',
      msgId: '',
      sendName: '',
      recipients: [],
      total_count: 0,
    },
  });
  const {
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<OrderFormValue> = (data) => {
    const orderBody: OrderRequestData = {
      productId: selectedProduct?.id,
      message: data.msg,
      messageCardId: data.msgId,
      ordererName: String(data.sendName),
      receivers: data.recipients.map((recipient: Recipient) => {
        return {
          name: recipient.receiveName,
          phoneNumber: recipient.receiveTel,
          quantity: recipient.count,
        };
      }),
    };
    postOrder(orderBody);
  };

  const currentRecipients = watch('recipients');
  const totalCount = currentRecipients.reduce(
    (sum, recipient) => sum + Number(recipient.count || 0),
    0
  );

  useEffect(() => {
    setValue('total_count', totalCount);
  }, [currentRecipients, setValue, totalCount]);

  const totalPrice = selectedProduct ? totalCount * selectedProduct.price : 0;

  return {
    selectedProduct,
    isProductError: isError,
    isOrderError,
    orderErrorMessage: orderError?.message,
    methods,
    handleSubmit,
    control,
    errors,
    onSubmit,
    currentRecipients,
    totalPrice,
  };
};
