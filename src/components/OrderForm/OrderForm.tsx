import styled from '@emotion/styled';
import Card from '@/components/OrderForm/Card';
import { Sender } from '@/components/OrderForm/Sender';
import { Recipient } from '@/components/OrderForm/Recipient';
import { ProductInfo } from '@/components/OrderForm/ProductInfo';
import { OrderButton } from '@/components/OrderForm/OrderButton';
import { MOCK_CARDFORM_LIST } from '@/components/OrderForm/mock';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTE_PATH } from '@/routes/Routes';
import { useForm, FormProvider, Controller, useWatch } from 'react-hook-form';
import { useContext, useEffect, useState } from 'react';
import { useProductSummary } from '@/queries/useProductSummary';
import { postOrder } from '@/Api/api';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { queryKeys } from '@/queries/queryKeys';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '@/contexts/AuthContext';

const Wrapper = styled.section(({ theme }) => ({
  width: '100%',
  paddingBottom: '3.125rem',
  backgroundColor: theme.semanticColors.background.default,
}));

const Margin = styled.div<{ height: string }>(({ theme, height }) => ({
  width: '100%',
  height: height,
  backgroundColor: theme.semanticColors.background.fill,
}));

interface RecipientItem {
  name: string;
  phone: string;
  quantity: number;
}
export interface OrderFormValues {
  message: string;
  sender: string;
  recipients: RecipientItem[];
}

const OrderForm = () => {
  const auth = useContext(AuthContext);
  const user = auth?.user ?? null;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const productId = Number(searchParams.get('productId'));
  const [messageCardId, setMessageCardId] = useState(String(MOCK_CARDFORM_LIST[0].id));

  const { data: summary, isError, error } = useProductSummary(productId);

  const selectedProduct = summary
    ? {
        imageURL: summary.imageURL,
        name: summary.name,
        price: { sellingPrice: summary.price },
        brandInfo: { name: summary.brandName },
      }
    : null;

  useEffect(() => {
    if (isError && axios.isAxiosError(error) && error.response?.status === 404) {
      toast.error('상품 정보를 불러오지 못했어요.');
      navigate(ROUTE_PATH.HOME, { replace: true });
    }
  }, [isError, error, navigate]);

  const methods = useForm<OrderFormValues>({
    defaultValues: {
      message: MOCK_CARDFORM_LIST[0].defaultTextMessage || '',
      sender: user?.name ?? '',
      recipients: [],
    },
    mode: 'onBlur',
  });

  const { setValue } = methods;

  useEffect(() => {
    if (user?.name) {
      setValue('sender', user.name, { shouldDirty: false });
    }
  }, [user, setValue]);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const qc = useQueryClient();
  const { mutate: submitOrder } = useMutation({
    mutationFn: postOrder,
    onSuccess: () => {
      qc.invalidateQueries({
        queryKey: queryKeys.productSummary(productId),
      });
    },
  });

  const onSubmit = (data: OrderFormValues) => {
    if (data.recipients.length === 0) {
      toast.error('받는 사람을 한 명 이상 추가해 주세요.');
      return;
    }
    if (!selectedProduct) {
      toast.error('상품 정보를 불러오지 못했습니다.');
      return;
    }

    const totalQty = data.recipients.reduce((s, r) => s + r.quantity, 0);

    submitOrder(
      {
        productId,
        message: data.message,
        messageCardId,
        ordererName: data.sender,
        receivers: data.recipients.map((r) => ({
          name: r.name,
          phoneNumber: r.phone,
          quantity: r.quantity,
        })),
      },
      {
        onSuccess: () => {
          alert(
            `주문 완료!\n` +
              `상품명: ${selectedProduct.name}\n` +
              `구매 수량: ${totalQty}\n` +
              `발신자 이름: ${user?.name}\n` +
              `메시지: ${messageCardId}`
          );
          navigate(ROUTE_PATH.HOME);
        },
        onError: (e: any) => {
          if (e.response?.status === 401) {
            toast.error('로그인이 필요합니다.');
            navigate('/login');
            return;
          }
          toast.error(e.response?.data?.message ?? '주문 요청 실패');
        },
      }
    );
  };

  const recipients = useWatch({
    control: methods.control,
    name: 'recipients',
  });
  const totalQuantity = recipients.reduce((sum, r) => sum + (r.quantity ?? 0), 0);
  const totalPrice = selectedProduct?.price.sellingPrice
    ? selectedProduct.price.sellingPrice * totalQuantity
    : 0;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <Controller
            name="message"
            control={control}
            rules={{ required: '메시지를 입력해주세요' }}
            render={({ field }) => (
              <Card
                message={field.value}
                onMessageChange={field.onChange}
                messageError={errors.message?.message}
                onCardChange={(id) => setMessageCardId(String(id))}
              />
            )}
          />
          <Margin height="8px" />

          <Controller
            name="sender"
            control={control}
            rules={{ required: '이름을 입력해주세요' }}
            render={({ field }) => (
              <Sender
                value={field.value}
                onChange={field.onChange}
                error={errors.sender?.message}
              />
            )}
          />
          <Margin height="8px" />

          <Recipient />

          <Margin height="8px" />

          <ProductInfo product={selectedProduct} />

          <OrderButton type="submit" totalPrice={totalPrice} />
        </Wrapper>
      </form>
    </FormProvider>
  );
};

export default OrderForm;
