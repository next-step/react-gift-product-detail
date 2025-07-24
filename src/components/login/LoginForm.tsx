import styled from "@emotion/styled";
import { checkEmailError, checkPasswordError } from "@/utils/validation";
import ErrorMessage from "../common/ErrorMessage";
import { postLogin } from "@/api/login";
import useApiRequest from "@/hooks/useApiRequest";
import useHandleLoginSuccess from "@/hooks/useHandleLoginSuccess";
import { useForm, type SubmitHandler } from "react-hook-form";
import type { LoginFormValues } from "@/types/user";

const LoginForm = () => {
  const method = useForm<LoginFormValues>({
    mode: "onBlur",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const {
    data: userData,
    isLoading,
    isError,
    refetch: postLoginRequest,
  } = useApiRequest({
    requestFn: postLogin,
    immediate: false,
  });

  const onValid: SubmitHandler<LoginFormValues> = async (
    data: LoginFormValues,
  ) => {
    postLoginRequest({
      email: data.email,
      password: data.password,
    });
  };

  useHandleLoginSuccess({
    email: userData?.email,
    name: userData?.name,
    authToken: userData?.authToken,
    isLoading,
    isError,
  });

  return (
    <Form onSubmit={method.handleSubmit(onValid)}>
      <Input
        error={!!method.formState.errors.email}
        type="text"
        placeholder="이메일"
        {...method.register("email", {
          validate: checkEmailError,
          onChange: () => {
            if (method.formState.errors.email) {
              method.trigger("email");
            }
          },
        })}
      />
      {method.formState.errors.email && (
        <ErrorMessage message={method.formState.errors.email.message || ""} />
      )}
      <Input
        error={!!method.formState.errors.password}
        type="password"
        placeholder="비밀번호"
        {...method.register("password", {
          validate: checkPasswordError,
          onChange: () => {
            if (method.formState.errors.password) {
              method.trigger("password");
            }
          },
        })}
      />
      {method.formState.errors.password && (
        <ErrorMessage
          message={method.formState.errors.password.message || ""}
        />
      )}
      <Button type="submit" disabled={isLoading || !method.formState.isValid}>
        로그인
      </Button>
    </Form>
  );
};

export default LoginForm;

const Form = styled.form`
  width: 100%;
  max-width: 420px;
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing.spacing4};
`;

const Input = styled.input<{ error: boolean }>`
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.semantic.text.default};
  margin: ${({ theme }) => `${theme.spacing.spacing4} 0 0`};
  padding: ${({ theme }) => theme.spacing.spacing2};
  border-bottom: 1px solid
    ${({ theme, error }) =>
      error ? theme.colors.red.red700 : theme.colors.gray.gray400};
  font-size: ${({ theme }) => theme.typography.body1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.body1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.body1Regular.lineHeight};

  &::placeholder {
    color: ${({ theme }) => theme.colors.semantic.text.placeholder};
  }
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  border-radius: 4px;
  color: ${({ theme }) => theme.colors.semantic.text.default};
  font-size: ${({ theme }) => theme.typography.label1Regular.fontSize};
  font-weight: ${({ theme }) => theme.typography.label1Regular.fontWeight};
  line-height: ${({ theme }) => theme.typography.label1Regular.lineHeight};
  margin-top: ${({ theme }) => theme.spacing.spacing12};
  background-color: ${({ theme }) => theme.colors.semantic.kakaoYellow};
  cursor: pointer;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;
