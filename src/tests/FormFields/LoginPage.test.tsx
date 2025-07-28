import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import userEvent from "@testing-library/user-event";
import LoginPage from "@src/pages/LoginPage";
import MockApp from "../MockApp";
import { toast } from "react-toastify";
import { LOGIN_INVALID_EMAIL_MESSAGE } from "@src/mock/msw/handler";

vi.mock("react-toastify", () => ({
  toast: vi.fn(),
  ToastContainer: () => <div>Toast</div>
}));

const renderLoginPage = () => {
  render(<MockApp children={<LoginPage />} userContext={false} />);
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

  it("@kakao.com 형식이 아니면 toast error를 띄웁니다.", async () => {
    renderLoginPage();
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    await userEvent.clear(emailInput);
    await userEvent.clear(passwordInput);
    await userEvent.type(emailInput, "test@notkakao.com");
    await userEvent.type(passwordInput, "12345678");

    expect(loginButton).toBeEnabled();
    await userEvent.click(loginButton);
    await waitFor(() => {
      expect(toast).toHaveBeenCalledWith(
        expect.stringContaining(LOGIN_INVALID_EMAIL_MESSAGE),
        expect.anything()
      );
    });
  });
});
