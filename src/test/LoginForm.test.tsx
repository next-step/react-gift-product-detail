import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import { vi, test, expect } from "vitest";
import { theme } from "@/styles/theme";
import LoginForm from "@/pages/login/components/LoginForm";

const mockLogin = vi.fn();

vi.mock("@/api/hooks/useLogin", () => ({
  default: () => ({
    data: undefined,
    isPending: false,
    isError: false,
    login: mockLogin,
  }),
}));

vi.mock("@/hooks/useHandleLoginSuccess", () => ({
  default: vi.fn(),
}));

test("이메일 형식이 잘못되었을 때 에러 텍스트가 뜨는지 확인", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </QueryClientProvider>,
  );

  const emailInput = screen.getByPlaceholderText("이메일");

  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  fireEvent.blur(emailInput);

  const errorMsg = await screen.findByText(
    "ID는 이메일 형식으로 입력해주세요.",
  );

  await waitFor(() => {
    expect(errorMsg).toBeInTheDocument();
  });
});

test("비밀번호가 8자 미만일 때 에러 텍스트가 뜨는지 확인", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </QueryClientProvider>,
  );

  const passwordInput = screen.getByPlaceholderText("비밀번호");

  fireEvent.change(passwordInput, { target: { value: "1234567" } });
  fireEvent.blur(passwordInput);

  const errorMsg = await screen.findByText(
    "PW는 최소 8글자 이상이어야 합니다.",
  );

  await waitFor(() => {
    expect(errorMsg).toBeInTheDocument();
  });
});

test("올바른 이메일과 비밀번호를 입력했을 때 로그인 버튼이 활성화되는지 확인", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </QueryClientProvider>,
  );

  const emailInput = screen.getByPlaceholderText("이메일");
  const passwordInput = screen.getByPlaceholderText("비밀번호");
  const loginButton = screen.getByRole("button", { name: "로그인" });

  fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
  fireEvent.change(passwordInput, { target: { value: "12345678" } });

  await waitFor(() => {
    expect(loginButton).not.toBeDisabled();
  });
});

test("유효한 데이터로 로그인 버튼을 클릭했을 때 login 함수가 호출되는지 확인", async () => {
  const queryClient = new QueryClient();

  render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <LoginForm />
      </ThemeProvider>
    </QueryClientProvider>,
  );

  const emailInput = screen.getByPlaceholderText("이메일");
  const passwordInput = screen.getByPlaceholderText("비밀번호");
  const loginButton = screen.getByRole("button", { name: "로그인" });

  fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
  fireEvent.change(passwordInput, { target: { value: "12345678" } });

  await waitFor(() => {
    expect(loginButton).not.toBeDisabled();
  });

  fireEvent.click(loginButton);

  await waitFor(() => {
    expect(mockLogin).toHaveBeenCalledWith({
      email: "test@kakao.com",
      password: "12345678",
    });
  });
});
