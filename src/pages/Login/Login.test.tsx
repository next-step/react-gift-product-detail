import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/index";
import { AuthContext } from "@/context/AuthContext";
import LoginPage from "@/pages/Login/Login";

vi.mock("@/hooks/useLogin", () => ({
  useLoginMutation: () => ({
    mutate: vi.fn(),
  }),
}));

vi.mock("@/components/ErrorBoundary/ErrorBoundary", () => {
  return {
    default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

const mockLogin = vi.fn();
const mockLogout = vi.fn();

const MockAuthProvider = ({ children }: { children: React.ReactNode }) => {
  const authValue = {
    user: null,
    login: mockLogin,
    logout: mockLogout,
    isLoggingIn: false,
  };
  return (
    <AuthContext.Provider value={authValue}>{children}</AuthContext.Provider>
  );
};

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <MockAuthProvider>{children}</MockAuthProvider>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe("로그인 페이지", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("렌더링 테스트", () => {
    it("로그인 페이지가 올바르게 렌더링되어야 한다", () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
      expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();

      expect(
        screen.getByRole("button", { name: "로그인" })
      ).toBeInTheDocument();
    });
  });

  describe("입력 필드 테스트", () => {
    it("이메일 입력 필드가 올바르게 동작해야 한다", async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByPlaceholderText("이메일");
      await user.type(emailInput, "test@kakao.com");

      expect(emailInput).toHaveValue("test@kakao.com");
    });

    it("비밀번호 입력 필드가 올바르게 동작해야 한다", async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const passwordInput = screen.getByPlaceholderText("비밀번호");
      await user.type(passwordInput, "password123");

      expect(passwordInput).toHaveValue("password123");
    });

    it("이메일 입력 필드가 email 타입이어야 한다", () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByPlaceholderText("이메일");
      expect(emailInput).toHaveAttribute("type", "email");
    });

    it("비밀번호 입력 필드가 password 타입이어야 한다", () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const passwordInput = screen.getByPlaceholderText("비밀번호");
      expect(passwordInput).toHaveAttribute("type", "password");
    });
  });

  describe("폼 제출 테스트", () => {
    it("로그인 버튼은 초기에 비활성 상태여야한다", () => {
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const loginButton = screen.getByRole("button", { name: "로그인" });
      expect(loginButton).toBeDisabled();
    });
  });

  describe("통합 테스트", () => {
    it("올바른 이메일 형태와 비밀번호 조건이 맞춰진다면 로그인 로직이 올바르게 동작해야 한다", async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const loginButton = screen.getByRole("button", { name: "로그인" });
      expect(loginButton).toBeDisabled();

      const emailInput = screen.getByPlaceholderText("이메일");
      await user.type(emailInput, "test@kakao.com");

      const passwordInput = screen.getByPlaceholderText("비밀번호");
      await user.type(passwordInput, "password123");

      expect(emailInput).toHaveValue("test@kakao.com");
      expect(passwordInput).toHaveValue("password123");

      await user.click(loginButton);
    });

    it("잘못된 이메일로 제출 시 에러가 표시되어야 한다", async () => {
      const user = userEvent.setup();
      render(
        <TestWrapper>
          <LoginPage />
        </TestWrapper>
      );

      const emailInput = screen.getByPlaceholderText("이메일");
      const passwordInput = screen.getByPlaceholderText("비밀번호");
      const loginButton = screen.getByRole("button", { name: "로그인" });

      await user.type(emailInput, "test@naver.com");
      await user.type(passwordInput, "password123");
      await user.click(loginButton);
    });
  });
});
