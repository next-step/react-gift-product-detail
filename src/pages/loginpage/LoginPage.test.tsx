import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import { AuthProvider } from "@/contexts/AuthContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "./LoginPage";
import MyPage from "@/pages/mypage/MyPage";
import { ToastContainer } from "react-toastify";
import { HTTP_STATUS } from "@/utils/HTTP_STATUS";

const mockNavigate = vi.fn();
const mockMutateAsync = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/hooks/useApiMutation", () => ({
  useApiMutation: () => ({
    mutateAsync: mockMutateAsync,
  }),
}));

const renderWithProviders = (initialEntries = ["/login"]) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <ToastContainer />
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/my" element={<MyPage />} />
            </Routes>
          </ThemeProvider>
        </AuthProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("LoginPage", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("유효하지 않은 이메일 형식을 입력하면 에러 메시지를 표시한다", async () => {
    // Given
    renderWithProviders();
    const emailInput = screen.getByPlaceholderText("이메일");

    // When
    await user.type(emailInput, "invalid-email");
    await user.tab();

    // Then
    const errorMessage = await screen.findByText(
      "이메일은 이메일 형식으로 입력해주세요."
    );
    expect(errorMessage).toBeInTheDocument();
  });

  it("성공적으로 로그인하면 마이페이지로 이동한다", async () => {
    // Given
    mockMutateAsync.mockResolvedValue({
      email: "test@kakao.com",
      name: "테스트유저",
      authToken: "fake-auth-token",
    });
    renderWithProviders();
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");

    // When
    await user.type(emailInput, "test@kakao.com");
    await user.type(passwordInput, "password123");
    const loginButton = screen.getByRole("button", { name: "로그인" });
    await user.click(loginButton);

    // Then
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/my");
    });
  });

  it("잘못된 자격 증명으로 로그인하면 에러 토스트를 표시한다", async () => {
    // Given
    mockMutateAsync.mockRejectedValue({
      response: { status: HTTP_STATUS.BAD_REQUEST },
    });
    renderWithProviders();
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");

    // When
    await user.type(emailInput, "wrong@email.com");
    await user.type(passwordInput, "wrongpassword");
    const loginButton = screen.getByRole("button", { name: "로그인" });
    await user.click(loginButton);

    // Then
    await waitFor(() => {
      const errorMessage = screen.getByText(
        "로그인에 실패했습니다. 다시 시도해주세요."
      );
      expect(errorMessage).toBeInTheDocument();
    });
  });
});
