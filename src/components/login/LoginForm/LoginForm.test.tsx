import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent } from "@testing-library/react";
import LoginForm from "./index";
import { describe, it, expect } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";

const renderWithRouter = () => {
  const queryClient = new QueryClient();
  return render(
    <MemoryRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <LoginForm />
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  );
};

describe("LoginForm", () => {
  it("이메일과 비밀번호 입력창이 렌더링된다", () => {
    renderWithRouter();
    expect(screen.getByPlaceholderText(/이메일/)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/비밀번호/)).toBeInTheDocument();
  });

  it("로그인 버튼이 처음에는 비활성화되어 있다", () => {
    renderWithRouter();
    const button = screen.getByRole("button", { name: /로그인/ });
    expect(button).toBeDisabled();
  });

  it("유효한 이메일과 비밀번호를 입력하면 버튼이 활성화된다", () => {
    renderWithRouter();
    const emailInput = screen.getByPlaceholderText(/이메일/);
    const passwordInput = screen.getByPlaceholderText(/비밀번호/);

    fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    const button = screen.getByRole("button", { name: /로그인/ });
    expect(button).not.toBeDisabled();
  });
});
