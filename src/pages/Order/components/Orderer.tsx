import Divider from "@/components/common/Divider";
import styled from "@emotion/styled";
import OutlineInputField from "@/components/form/OutlineInputField";
import { useFormContext } from "react-hook-form";
import type { OrderFormType } from "@/pages/Order/components/Order";
import { useEffect } from "react";
import { getCookieValue } from "@/utils/cookie";
import { AUTH_COOKIE_KEY_NAME } from "@/contexts/authContext";

const Sender = () => {
  const {
    register,
    setValue,
    formState: { errors },
  } = useFormContext<OrderFormType>();

  useEffect(() => {
    setValue("ordererName", getCookieValue(AUTH_COOKIE_KEY_NAME) || "");
  }, [setValue]);

  return (
    <Content>
      <Divider spacing="1rem" />
      <Title>보내는 사람</Title>
      <Divider spacing="1rem" />
      <OutlineInputField
        {...register("ordererName")}
        placeholder="이름을 입력하세요."
        errorMsg={errors.ordererName?.message}
      />
      {!errors.ordererName?.message && <Msg>* 실제 선물 발송 시 발신자이름으로 반영되는 정보입니다.</Msg>}
      <Divider spacing="1.5rem" />
    </Content>
  );
};

export default Sender;

const Content = styled.div`
  width: 100%;
  padding: 0 ${({ theme }) => theme.spacing.spacing4};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const Title = styled.p`
  width: 100%;
  font: ${({ theme }) => theme.typography.title2Bold};
  text-align: left;
`;
const Msg = styled.p`
  width: 100%;
  font: ${({ theme }) => theme.typography.label2Regular};
  color: ${({ theme }) => theme.color.gray600};
  padding: ${({ theme }) => theme.spacing.spacing1};
  text-align: left;
`;
