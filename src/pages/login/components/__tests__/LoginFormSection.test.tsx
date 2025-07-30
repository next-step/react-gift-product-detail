import "@testing-library/jest-dom/matchers";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach, beforeAll } from "vitest";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";

const renderComponent = async () => {
  const mod = await import("../LoginFormSection");
  const LoginFormSection = mod.default;
  return render(
    <ThemeProvider theme={theme}>
      <LoginFormSection />
    </ThemeProvider>,
  );
};

const handleLoginMock = vi.fn();

beforeAll(() => {
  vi.mock("@/hooks/useLoginForm", () => ({
    useLoginForm: () => ({
      email: "test@example.com",
      password: "12345678",
      emailError: "",
      passwordError: "",
      isButtonEnabled: true,
      handleEmailChange: vi.fn(),
      handlePasswordChange: vi.fn(),
    }),
  }));

  vi.mock("@/hooks/useLogin", () => ({
    useLogin: () => ({
      handleLogin: handleLoginMock,
      isPending: false,
    }),
  }));
});

beforeEach(() => {
  vi.clearAllMocks();
});

describe("LoginFormSection", () => {
  it("로그인 버튼 클릭 -> handleLogin 호출", async () => {
    await renderComponent();

    const button = screen.getByRole("button", { name: /로그인/i });
    fireEvent.click(button);

    expect(handleLoginMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "12345678",
    });
  });

  it("로그인 중일 때 버튼 비활성화 및 Suspense 노출", async () => {
    vi.resetModules();
    vi.doMock("@/hooks/useLogin", () => ({
      useLogin: () => ({
        handleLogin: vi.fn(),
        isPending: true,
      }),
    }));

    const mod = await import("../LoginFormSection");
    const LoginFormSection = mod.default;
    render(
      <ThemeProvider theme={theme}>
        <LoginFormSection />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
    expect(button).toHaveTextContent("로그인 중...");
  });

  it("버튼이 비활성화 상태이면 -> handleLogin 호출 불가능", async () => {
    vi.resetModules();
    vi.doMock("@/hooks/useLoginForm", () => ({
      useLoginForm: () => ({
        email: "",
        password: "",
        emailError: "",
        passwordError: "",
        isButtonEnabled: false,
        handleEmailChange: vi.fn(),
        handlePasswordChange: vi.fn(),
      }),
    }));

    vi.doMock("@/hooks/useLogin", () => ({
      useLogin: () => ({
        handleLogin: handleLoginMock,
        isPending: false,
      }),
    }));

    const mod = await import("../LoginFormSection");
    const LoginFormSection = mod.default;
    render(
      <ThemeProvider theme={theme}>
        <LoginFormSection />
      </ThemeProvider>,
    );

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleLoginMock).not.toHaveBeenCalled();
  });
});
