import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import UserContext from "@src/contexts/UserContext";
import LoginPage from "@src/pages/LoginPage";
import queryClient from "@src/apis/BackEnd/query/client";

// mock toast
vi.mock("react-toastify", () => ({
  toast: vi.fn(),
  ToastContainer: () => <div>Toast</div>
}));

const renderLoginPage = () => {
  const fakeUserContext = {
    authToken: { value: "", setValue: vi.fn() },
    email: { value: "", setValue: vi.fn() },
    user: { value: "", setValue: vi.fn() }
  };

  render(
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <UserContext.Provider value={fakeUserContext}>
          <LoginPage />
        </UserContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

describe("LoginPage.tsx 페이지 테스트", () => {
  it("로그인 버튼과 이메일, 비밀번호 입력 필드가 렌더링됩니다.", () => {
    renderLoginPage();
    expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "로그인" })).toBeDisabled();
  });

  it("이메일 형식 유효성에 따라 버튼이 활성화 / 비활성화됩니다.", async () => {
    renderLoginPage();
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });
    await userEvent.type(emailInput, "not an email address");
    await userEvent.type(passwordInput, "password123");
    expect(loginButton).toBeDisabled();

    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.type(emailInput, "test@kakao.com");
    await userEvent.type(passwordInput, "password123");
    expect(loginButton).toBeEnabled();
  });

  it("비밀번호 형식 유효성에 따라 버튼이 활성화 / 비활성화됩니다.", async () => {
    renderLoginPage();
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });
    await userEvent.type(emailInput, "test@kakao.com");
    await userEvent.type(passwordInput, "1234");
    expect(loginButton).toBeDisabled();

    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.type(emailInput, "test@kakao.com");
    await userEvent.type(passwordInput, "12345678");
    expect(loginButton).toBeEnabled();
  });
});
