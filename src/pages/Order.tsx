import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Layout } from "@/Components/layout/Layout";
import styled from "@emotion/styled";
import { cardTemplates } from "@/Components/cardTemplates";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useProductSummary } from "@/hooks/useProductSummary";
import { useOrder } from "@/hooks/useOrder";
import { getUserInfo } from "@/utils/storage";
import { useLoginContext } from "@/hooks/useLoginContext";

// ===== 타입 정의 및 Zod 스키마 =====
const receiverSchema = z.object({
  name: z.string().min(1, "이름을 입력하세요."),
  phone: z.string().regex(/^010[0-9]{8}$/, "01012345678 형식으로 입력하세요."),
  quantity: z.coerce.number().min(1, "최소 1개 이상"),
});

const receiversSchema = z
  .array(receiverSchema)
  .min(1, "최소 1명 이상")
  .max(10, "최대 10명까지")
  .refine((arr) => new Set(arr.map((r) => r.phone)).size === arr.length, {
    message: "전화번호가 중복되었습니다.",
    path: ["phoneDup"],
  });

const orderSchema = z.object({
  selectedCardId: z.number(),
  message: z.string().min(1, "메시지를 입력하세요."),
  sender: z.string().min(1, "보내는 사람 이름을 입력하세요."),
  receivers: receiversSchema,
});

type OrderFormValues = z.infer<typeof orderSchema>;

// ===== 카드 미리보기 관련 스타일 =====
const PreviewWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 32px;
`;

const PreviewImage = styled.img`
  width: 220px;
  height: 220px;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  margin-bottom: 16px;
`;

const MessageInput = styled.textarea`
  width: 100%;
  max-width: 320px;
  min-height: 60px;
  font-size: 1.1rem;
  padding: 12px;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  resize: none;
  box-sizing: border-box;
  margin-bottom: 8px;
  background: #fafafa;
`;

// ===== 카드 선택 관련 스타일 =====
const CardList = styled.div`
  display: flex;
  flex-direction: row;
  gap: 12px;
  margin: 0 0 24px 0;
  overflow-x: auto;
  padding: 8px 0 8px 0;
  scrollbar-width: thin;
  &::-webkit-scrollbar {
    height: 6px;
    background: #f0f0f0;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 4px;
  }
`;

const CardItem = styled.div<{ selected: boolean }>`
  flex: 0 0 auto;
  width: 64px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  border-radius: 10px;
  border: 2px solid ${({ selected }) => (selected ? "#f7e244" : "transparent")};
  background: ${({ selected }) => (selected ? "#fffbe6" : "transparent")};
  box-shadow: ${({ selected }) => (selected ? "0 2px 8px #ffe14a" : "none")};
  transition:
    background 0.2s,
    border 0.2s,
    box-shadow 0.2s;
  &:hover {
    background: ${({ selected }) => (selected ? "#fffbe6" : "#fafafa")};
  }
`;

const CardImage = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 8px;
  margin-bottom: 4px;
`;

const CardName = styled.span`
  font-size: 0.8rem;
  color: #222;
  text-align: center;
  line-height: 1.2;
`;

// ===== 폼 관련 스타일 =====
const FormSection = styled.div`
  background: #fafbfc;
  border-radius: 12px;
  padding: 24px 16px 16px 16px;
  margin-bottom: 24px;
`;

const SectionTitle = styled.h3`
  font-size: 1.1rem;
  font-weight: 700;
  margin-bottom: 12px;
`;

const FormGroup = styled.div`
  margin-bottom: 12px;
`;

const Label = styled.label`
  display: block;
  font-size: 1rem;
  font-weight: 600;
  color: #222;
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  font-size: 1rem;
  padding: 14px 16px;
  border: 1.5px solid #d6dbe1;
  border-radius: 16px;
  background: #fff;
  box-sizing: border-box;
  margin-bottom: 8px;
  &:focus {
    outline: none;
    border-color: #4a90e2;
  }
  &::placeholder {
    color: #b0b3ba;
  }
`;

// ===== 버튼 관련 스타일 =====
const SubmitButton = styled.button`
  width: 100%;
  background: #4a90e2;
  color: #fff;
  border: none;
  border-radius: 12px;
  padding: 18px;
  font-size: 1.1rem;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  &:hover {
    background: #357abd;
  }
  &:disabled {
    background: #b0b3ba;
    cursor: not-allowed;
  }
`;

// ===== 메시지 관련 스타일 =====
const ErrorMessage = styled.div`
  color: #e74c3c;
  font-size: 0.9rem;
  margin-top: 4px;
`;

// ===== 레이아웃 관련 스타일 =====
const ContentWrapper = styled.div`
  padding-bottom: 100px;
`;

const FixedFooter = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100vw;
  max-width: 720px;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.04);
  padding: 0 16px 24px 16px;
  z-index: 100;
  @media (min-width: 720px) {
    left: 50%;
    transform: translateX(-50%);
  }
`;

// ===== 커스텀 모달 스타일 =====
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.25);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ModalContent = styled.div`
  background: #fff;
  border-radius: 16px;
  max-width: 480px;
  width: 95vw;
  max-height: 80vh;
  overflow-y: auto;
  padding: 24px;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const ModalTitle = styled.h2`
  font-size: 1.2rem;
  font-weight: 700;
  color: #222;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  &:hover {
    color: #222;
  }
`;

const ModalFooter = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 20px;
`;

const ModalButton = styled.button<{ primary?: boolean }>`
  flex: 1;
  padding: 12px;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  background: ${({ primary }) => (primary ? "#4a90e2" : "#f0f0f0")};
  color: ${({ primary }) => (primary ? "#fff" : "#222")};
  &:hover {
    background: ${({ primary }) => (primary ? "#357abd" : "#e0e0e0")};
  }
`;

const Order = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = id ? parseInt(id) : 0;
  const { isLoggedIn, isInitialized } = useLoginContext();

  // 모든 hooks를 early return 이전에 호출
  const {
    product,
    loading: productLoading,
    error: productError,
  } = useProductSummary(productId);
  const { order, isLoading: orderLoading } = useOrder();

  // userInfo에서 name 가져오기
  const userInfo = getUserInfo();
  const senderName = userInfo?.name || "";

  const selectedCardDefault = cardTemplates[0];

  // react-hook-form 세팅 (메인 폼, Zod resolver 적용)
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      selectedCardId: selectedCardDefault?.id ?? 0,
      message: selectedCardDefault?.defaultTextMessage ?? "",
      sender: senderName, // userInfo의 name을 defaultValue로 설정 (없으면 빈 문자열)
      receivers: [],
    },
  });

  // 모달 상태
  const [receiverModalOpen, setReceiverModalOpen] = useState(false);

  // 모달용 react-hook-form 세팅 (받는 사람 입력/수정)
  const {
    control: modalControl,
    register: modalRegister,
    handleSubmit: modalHandleSubmit,
    reset: modalReset,
  } = useForm<{ receivers: OrderFormValues["receivers"] }>({
    resolver: zodResolver(z.object({ receivers: receiversSchema })),
    defaultValues: { receivers: [] },
  });
  const {
    fields: modalFields,
    append: modalAppend,
    remove: modalRemove,
  } = useFieldArray({
    control: modalControl,
    name: "receivers",
  });

  // 로그인 상태 확인 - 로그인이 안 되어 있으면 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (isInitialized && !isLoggedIn) {
      navigate("/login", {
        state: { redirect: `/order/${productId}` },
      });
    }
  }, [isLoggedIn, isInitialized, navigate, productId]);

  // 초기화가 완료되지 않았으면 로딩 상태 표시
  if (!isInitialized) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          로그인 상태를 확인하는 중...
        </div>
      </Layout>
    );
  }

  // 로그인이 안 되어 있으면 로딩 상태 표시
  if (!isLoggedIn) {
    return (
      <Layout>
        <div style={{ textAlign: "center", padding: "50px" }}>
          로그인 페이지로 이동 중...
        </div>
      </Layout>
    );
  }

  // 모달 열기: 기존 데이터 복사
  const openReceiverModal = () => {
    modalReset({ receivers: watch("receivers") });
    setReceiverModalOpen(true);
  };
  // 모달 완료: 메인 폼에 반영
  const handleReceiverModalComplete = modalHandleSubmit((data) => {
    if (data.receivers.length === 0) return; // 0명일 때 반영 X
    // 모든 정보가 정확히 입력되어야만 반영
    const valid = data.receivers.every(
      (r) => r.name && /^010[0-9]{8}$/.test(r.phone) && r.quantity >= 1,
    );
    if (!valid) return;
    setValue("receivers", data.receivers);
    setReceiverModalOpen(false);
  });

  // 카드 선택 핸들러
  const handleSelect = (cardId: number) => {
    setValue("selectedCardId", cardId);
    const card = cardTemplates.find((c) => c.id === cardId);
    setValue("message", card?.defaultTextMessage ?? "");
  };

  // 주문 제출 핸들러
  const onSubmit = async (data: OrderFormValues) => {
    // 주문 데이터 준비
    const orderData = {
      productId: productId,
      message: data.message,
      messageCardId: data.selectedCardId.toString(),
      ordererName: data.sender,
      receivers: data.receivers.map((r) => ({
        name: r.name,
        phoneNumber: r.phone,
        quantity: r.quantity,
      })),
    };

    const result = await order(orderData, userInfo!.authToken);
    if (result) {
      // 주문 성공 시 처리 (예: 주문 완료 페이지로 이동)
      console.log("주문 성공:", result);
    }
  };

  // 제품 로딩 중이거나 에러인 경우 처리
  if (productLoading) {
    return (
      <Layout>
        <div>제품 정보를 불러오는 중...</div>
      </Layout>
    );
  }

  if (productError || !product) {
    return (
      <Layout>
        <div>제품 정보를 불러올 수 없습니다.</div>
      </Layout>
    );
  }

  // 선택된 카드
  const selectedCard = cardTemplates.find(
    (card) => card.id === watch("selectedCardId"),
  );

  return (
    <Layout>
      <ContentWrapper>
        {/* ===== 카드 선택 섹션 ===== */}
        <h2>카드 템플릿 선택</h2>
        <CardList>
          {cardTemplates.map((card) => (
            <CardItem
              key={card.id}
              selected={watch("selectedCardId") === card.id}
              onClick={() => handleSelect(card.id)}
            >
              <CardImage src={card.thumbUrl} alt={card.defaultTextMessage} />
              <CardName>{card.defaultTextMessage}</CardName>
            </CardItem>
          ))}
        </CardList>

        {/* ===== 카드 미리보기 섹션 ===== */}
        <PreviewWrapper>
          {selectedCard && (
            <>
              <PreviewImage
                src={selectedCard.imageUrl}
                alt={selectedCard.defaultTextMessage}
              />
              <MessageInput
                {...register("message", { required: "메시지를 입력하세요." })}
                placeholder="메시지를 입력하세요."
              />
              {errors.message && (
                <ErrorMessage>{errors.message.message}</ErrorMessage>
              )}
            </>
          )}
        </PreviewWrapper>

        {/* ===== 보내는 사람 섹션 ===== */}
        <FormSection>
          <SectionTitle>보내는 사람</SectionTitle>
          <FormGroup>
            <Label>이름</Label>
            <Input
              type="text"
              placeholder="이름을 입력하세요."
              defaultValue={senderName}
              {...register("sender", {
                required: "보내는 사람 이름을 입력하세요.",
              })}
            />
            {errors.sender && (
              <ErrorMessage>{errors.sender.message}</ErrorMessage>
            )}
          </FormGroup>
        </FormSection>

        {/* ===== 받는 사람 섹션 (요약 테이블/리스트 + 추가/수정 버튼만) ===== */}
        <FormSection>
          <SectionTitle>받는 사람</SectionTitle>
          {/* 받는 사람 요약 테이블 */}
          {watch("receivers").length === 0 ? (
            <div
              style={{
                minHeight: 120,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#b0b3ba",
                background: "#fff",
                borderRadius: 12,
                border: "1.5px solid #e0e0e0",
                marginBottom: 16,
              }}
            >
              받는 사람이 없습니다.
              <br />
              받는 사람을 추가해주세요.
            </div>
          ) : (
            <table
              style={{
                width: "100%",
                background: "#fff",
                borderRadius: 12,
                borderCollapse: "collapse",
                marginBottom: 16,
              }}
            >
              <thead>
                <tr style={{ background: "#f5f6fa" }}>
                  <th style={{ padding: "10px 0", fontWeight: 700 }}>이름</th>
                  <th style={{ padding: "10px 0", fontWeight: 700 }}>
                    전화번호
                  </th>
                  <th style={{ padding: "10px 0", fontWeight: 700 }}>수량</th>
                </tr>
              </thead>
              <tbody>
                {watch("receivers").map((r, idx) => (
                  <tr
                    key={idx}
                    style={{ textAlign: "center", borderTop: "1px solid #eee" }}
                  >
                    <td style={{ padding: "8px 0" }}>{r.name}</td>
                    <td style={{ padding: "8px 0" }}>{r.phone}</td>
                    <td style={{ padding: "8px 0" }}>{r.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
          <SubmitButton
            type="button"
            onClick={openReceiverModal}
            style={{
              marginBottom: 0,
              background: "#f5f6fa",
              color: "#222",
              fontWeight: 500,
            }}
          >
            {watch("receivers").length === 0 ? "추가" : "수정"}
          </SubmitButton>
        </FormSection>

        {/* ===== 제품 정보 섹션 (주문 버튼 위) ===== */}
        <FormSection>
          <SectionTitle>선택한 상품</SectionTitle>
          <div style={{ display: "flex", alignItems: "center", background: "#fff", borderRadius: 12, padding: "18px 20px", gap: 18, marginBottom: 16 }}>
            <img src={product.imageURL} alt={product.name} style={{ width: 72, height: 72, borderRadius: 10, background: "#f0f0f0" }} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <div style={{ fontSize: "1.08rem", fontWeight: 600, color: "#222" }}>{product.name}</div>
              <div style={{ color: "#666", fontSize: "0.95rem" }}>{product.brandName}</div>
              <div style={{ fontWeight: 700, color: "#222", marginTop: 4 }}>{product.price?.toLocaleString()}원</div>
            </div>
          </div>
        </FormSection>
      </ContentWrapper>
      <FixedFooter>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SubmitButton type="submit" disabled={orderLoading}>
            {orderLoading
              ? "주문 처리 중..."
              : userInfo?.authToken
                ? "주문하기"
                : "로그인 후 주문하기"}
          </SubmitButton>
        </form>
      </FixedFooter>
      {/* ===== 받는 사람 입력/수정 모달 ===== */}
      {receiverModalOpen && (
        <ModalOverlay onClick={() => setReceiverModalOpen(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ModalTitle>받는 사람</ModalTitle>
              <CloseButton onClick={() => setReceiverModalOpen(false)}>&times;</CloseButton>
            </ModalHeader>
            <div style={{ fontSize: "0.98rem", color: "#888", marginBottom: 12 }}>
              * 최대 10명까지 추가 할 수 있어요.
              <br />* 받는 사람의 전화번호를 중복으로 입력할 수 없어요.
            </div>
            <ModalButton
              type="button"
              onClick={() => modalAppend({ name: "", phone: "", quantity: 1 })}
              disabled={modalFields.length >= 10}
              style={{ marginBottom: 16 }}
            >
              추가하기
            </ModalButton>
            {modalFields.length === 0 && (
              <div
                style={{
                  minHeight: 120,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#b0b3ba",
                  background: "#f8f8f8",
                  borderRadius: 12,
                  border: "1.5px solid #e0e0e0",
                  marginBottom: 16,
                }}
              >
                받는 사람이 없습니다.
                <br />
                받는 사람을 추가해주세요.
              </div>
            )}
            {modalFields.map((field, idx) => (
              <div
                key={field.id}
                style={{
                  marginBottom: 18,
                  background: "#fafbfc",
                  borderRadius: 12,
                  padding: 16,
                  position: "relative",
                }}
              >
                <div style={{ fontWeight: 700, marginBottom: 8 }}>
                  받는 사람 {idx + 1}{" "}
                  <span
                    style={{
                      cursor: "pointer",
                      color: "#e74c3c",
                      marginLeft: 8,
                    }}
                    onClick={() => modalRemove(idx)}
                  >
                    ×
                  </span>
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <Label>이름</Label>
                  <Input
                    {...modalRegister(`receivers.${idx}.name`)}
                    placeholder="이름"
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <Label>전화번호</Label>
                  <Input
                    {...modalRegister(`receivers.${idx}.phone`)}
                    placeholder="01012345678"
                  />
                </div>
                <div style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                  <Label>수량</Label>
                  <Input
                    type="number"
                    min={1}
                    {...modalRegister(`receivers.${idx}.quantity`)}
                  />
                </div>
              </div>
            ))}
            <ModalFooter>
              <ModalButton type="button" onClick={handleReceiverModalComplete}>
                완료
              </ModalButton>
            </ModalFooter>
          </ModalContent>
        </ModalOverlay>
      )}
    </Layout>
  );
};

export default Order;
