import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

import { signin } from "@/api/login/signin";
import { LoginPage } from "@/pages/LoginPage";
import { theme } from "@/styles/theme";
import { setUserInfo, showToast } from "@/utils";

vi.mock("@/api/login/signin");
vi.mock("@/utils", async () => {
  const actual = await vi.importActual("@/utils");
  return {
    ...actual,
    setUserInfo: vi.fn(),
    showToast: {
      error: vi.fn(),
    },
  };
});
vi.mock("@/hooks/common/useRouter", () => ({
  useRouter: () => ({
    navigate: vi.fn(path => console.log(`경로 이동 ${path}`)),
    location: { state: null },
  }),
}));

const queryClient = new QueryClient();

const renderLoginPage = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <LoginPage />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
};

describe("LoginPage 테스트", () => {
  let user: ReturnType<typeof userEvent.setup>;
  let emailInput: HTMLElement;
  let passwordInput: HTMLElement;
  let loginButton: HTMLElement;

  beforeEach(() => {
    user = userEvent.setup();
    renderLoginPage();

    emailInput = screen.getByPlaceholderText("이메일");
    passwordInput = screen.getByPlaceholderText("비밀번호");
    loginButton = screen.getByRole("button", { name: "로그인" });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  const fillLoginForm = async (email: string, password: string = "") => {
    await user.type(emailInput, email);
    if (password) {
      await user.type(passwordInput, password);
    }
  };

  const submitLogin = async () => {
    await user.click(loginButton);
  };

  test("성공 케이스: 유효한 정보로 로그인 시 메인 페이지로 이동한다.", async () => {
    // given
    vi.mocked(signin).mockResolvedValue({
      authToken: "dummy-token",
      email: "test@kakao.com",
      name: "test",
    });

    // when
    await fillLoginForm("test@kakao.com", "password123");
    await submitLogin();

    // then
    await waitFor(() => {
      expect(signin).toHaveBeenCalledWith({
        email: "test@kakao.com",
        password: "password123",
      });
      expect(setUserInfo).toHaveBeenCalledWith({
        authToken: "dummy-token",
        email: "test@kakao.com",
        name: "test",
      });
    });
  });

  test("실패 케이스: @kakao.com이 아닌 다른 이메일 형식 입력 시 에러 메시지를 보여준다.", async () => {
    // when
    await fillLoginForm("invalid-email");
    await submitLogin();

    // then
    await waitFor(() => {
      expect(
        screen.getByText("올바른 이메일 형식이 아닙니다."),
      ).toBeInTheDocument();
      expect(signin).not.toHaveBeenCalled();
    });
  });

  test("실패 케이스: API 에러 발생 시 토스트 메시지를 보여준다.", async () => {
    // given
    const error = new Error("Login failed");
    vi.mocked(signin).mockRejectedValue(error);

    // when
    await fillLoginForm("test@example.com", "password123");
    await submitLogin();

    // then
    await waitFor(() => {
      expect(showToast.error).toHaveBeenCalledWith(error.message);
    });
  });
});
