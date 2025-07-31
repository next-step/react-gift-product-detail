import React, { useContext, useEffect, useState } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, useFieldArray } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import styled from '@emotion/styled';
import { AuthContext } from '@/context/AuthContext';
import { templates } from '@/resources/mock/templates';
import { useProduct, useCreateOrder, OrderPayload } from '@/hooks/orderHooks';

type Receiver = { name: string; phone: string; quantity: number };
type FormValues = { sender: string; receivers: Receiver[] };
const MAX_RECEIVERS = 10;
const DEFAULT_RECEIVER: Receiver = { name: '', phone: '', quantity: 1 };

export default function OrderPage() {
  // Hooks at top-level
  const params = useParams<{ id: string }>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, token, initialized } = useContext(AuthContext);
  const userName = user?.name ?? '';
  const productId = Number(params.id);

  // Data fetching & mutation
  const { data: productSummary, isLoading, isError } = useProduct(productId);
  const { mutate: createOrder } = useCreateOrder();

  // Form setup
  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: { errors },
    trigger,
  } = useForm<FormValues>({
    defaultValues: { sender: userName, receivers: [DEFAULT_RECEIVER] },
    mode: 'onChange',
  });
  const receivers = watch('receivers');
  const { fields, append, remove } = useFieldArray({ control, name: 'receivers' });

  // Template state
  const initialTemplateId = Number(searchParams.get('template')) || templates[0].id;
  const [selectedTemplateId, setSelectedTemplateId] = useState<number>(initialTemplateId);
  const selectedTemplate = templates.find((t) => t.id === selectedTemplateId) || templates[0];
  const [messageText, setMessageText] = useState<string>(selectedTemplate.defaultTextMessage);

  useEffect(() => {
    setMessageText(selectedTemplate.defaultTextMessage);
  }, [selectedTemplate.defaultTextMessage]);

  // Redirect if not authenticated
  useEffect(() => {
    if (initialized && !token) {
      const redirectTo = location.pathname + location.search;
      navigate(`/login?redirect=${encodeURIComponent(redirectTo)}`, { replace: true });
    }
  }, [initialized, token, navigate]);

  // Early returns
  if (!initialized) return <Loader>로딩 중…</Loader>;
  if (!token || !user) return null;
  if (isLoading) return <Loader>상품 정보를 로딩 중…</Loader>;
  if (isError || !productSummary)
    return <ErrorMsg>상품 정보를 가져올 수 없습니다. (ID: {productId})</ErrorMsg>;

  // Submit handler
  const onSubmit = (data: FormValues) => {
    const payload: OrderPayload = {
      productId,
      message: messageText,
      messageCardId: String(selectedTemplateId),
      ordererName: data.sender,
      receivers: data.receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    };
    createOrder(payload, {
      onSuccess: () => {
        alert('주문이 완료되었습니다!');
        navigate('/', { replace: true });
      },
      onError: (error: AxiosError<{ data: { message: string } }>) => {
        const msg = error.response?.data.data.message || '주문 중 오류가 발생했습니다.';
        toast.error(msg);
      },
    });
  };

  // Price formatting
  const price = productSummary.price?.sellingPrice ?? 0;

  return (
    <Container>
      <TemplateList>
        {templates.map((t) => (
          <Thumb
            key={t.id}
            selected={t.id === selectedTemplateId}
            onClick={() => setSelectedTemplateId(t.id)}
            src={t.thumbUrl}
            alt={t.defaultTextMessage}
          />
        ))}
      </TemplateList>

      <PreviewImage src={selectedTemplate.imageUrl} alt='템플릿 카드 미리보기' />

      <Section>
        <Label>메시지 내용:</Label>
        <MessageInput
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          rows={3}
        />
      </Section>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label>보내는 사람</Label>
          <Input
            {...register('sender', { required: '보내는 사람 이름을 입력하세요.' })}
            defaultValue={userName}
          />
          {errors.sender && <ErrorMsg>{errors.sender.message}</ErrorMsg>}
        </FormGroup>

        <FormGroup>
          <Label>받는 사람 (최대 {MAX_RECEIVERS}명)</Label>
          <AddButton
            type='button'
            onClick={() => {
              if (fields.length < MAX_RECEIVERS) append(DEFAULT_RECEIVER);
              trigger();
            }}
          >
            추가하기
          </AddButton>
        </FormGroup>

        {fields.map((field, idx) => (
          <ReceiverSection key={field.id}>
            <ReceiverHeader>
              <h3>받는 사람 {idx + 1}</h3>
              <RemoveButton type='button' onClick={() => remove(idx)}>
                ✕
              </RemoveButton>
            </ReceiverHeader>

            <FormGroup>
              <Label>이름</Label>
              <Input {...register(`receivers.${idx}.name`, { required: '이름을 입력하세요.' })} />
              {errors.receivers?.[idx]?.name && (
                <ErrorMsg>{errors.receivers[idx]?.name?.message}</ErrorMsg>
              )}
            </FormGroup>

            <FormGroup>
              <Label>전화번호</Label>
              <Input
                {...register(`receivers.${idx}.phone`, {
                  required: '전화번호를 입력하세요.',
                  pattern: { value: /^010\d{8}$/, message: '01012345678 형식이어야 해요.' },
                  validate: (val) =>
                    receivers.filter((r) => r.phone === val).length === 1 ||
                    '중복된 전화번호가 있습니다.',
                })}
              />
              {errors.receivers?.[idx]?.phone && (
                <ErrorMsg>{errors.receivers[idx]?.phone?.message}</ErrorMsg>
              )}
            </FormGroup>

            <FormGroup>
              <Label>수량</Label>
              <Input
                type='number'
                {...register(`receivers.${idx}.quantity`, {
                  min: { value: 1, message: '1개 이상 입력하세요.' },
                })}
              />
              {errors.receivers?.[idx]?.quantity && (
                <ErrorMsg>{errors.receivers[idx]?.quantity?.message}</ErrorMsg>
              )}
            </FormGroup>
          </ReceiverSection>
        ))}

        <SubmitButton type='submit'>{fields.length}명 완료</SubmitButton>
      </Form>

      <ProductSection>
        <ProductImage src={productSummary.imageURL} alt={productSummary.name} />
        <ProductInfo>
          <div>{productSummary.name}</div>
          <div>₩{price.toLocaleString()}</div>
        </ProductInfo>
      </ProductSection>
    </Container>
  );
}

// Styled components
const Container = styled.div`
  padding: 20px;
`;
const TemplateList = styled.div`
  display: flex;
  overflow-x: auto;
  gap: 8px;
  padding: 8px 0;
`;
const Thumb = styled.img<{ selected: boolean }>`
  width: 80px;
  height: 80px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid ${(props) => (props.selected ? '#467DE9' : 'transparent')};
  border-radius: 4px;
`;
const PreviewImage = styled.img`
  width: 100%;
  border-radius: 8px;
  margin-bottom: 16px;
`;
const Section = styled.div`
  margin-bottom: 16px;
`;
const Label = styled.label`
  display: block;
  margin-bottom: 8px;
`;
const MessageInput = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const Form = styled.form`
  margin-top: 24px;
`;
const FormGroup = styled.div`
  margin-bottom: 16px;
`;
const Input = styled.input`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;
const AddButton = styled.button`
  padding: 4px 12px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const ReceiverSection = styled.div`
  margin-bottom: 16px;
`;
const ReceiverHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const RemoveButton = styled.button`
  background: none;
  border: none;
  color: #e53e3e;
  cursor: pointer;
`;
const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #f3f4f6;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;
const ProductSection = styled.div`
  display: flex;
  align-items: center;
  margin-top: 32px;
`;
const ProductImage = styled.img`
  width: 80px;
  border-radius: 8px;
  margin-right: 16px;
`;
const ProductInfo = styled.div`
  font-size: 16px;
  line-height: 1.5;
`;
const Loader = styled.div`
  padding: 20px;
  text-align: center;
`;
const ErrorMsg = styled.div`
  padding: 20px;
  text-align: center;
  color: #e53e3e;
`;
