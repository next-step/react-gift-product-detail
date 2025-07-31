import "@testing-library/jest-dom/matchers";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, expect, it, vi, beforeAll, beforeEach } from "vitest";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import { ERROR_MESSAGES } from "@/constants/messages";

const handleLoginMock = vi.fn();

const renderComponent = async () => {
  const mod = await import("../LoginFormSection");
  const LoginFormSection = mod.default;
  return render(
    <ThemeProvider theme={theme}>
      <LoginFormSection />
    </ThemeProvider>,
  );
};

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
  it("로그인 버튼 클릭 → handleLogin 호출", async () => {
    await renderComponent();

    const button = screen.getByRole("button", { name: /로그인/i });
    fireEvent.click(button);

    expect(handleLoginMock).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "12345678",
    });
  });

  it("로그인 중일 때 버튼 비활성화 및 로딩 텍스트 노출", async () => {
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

  it("버튼이 비활성화 상태 → handleLogin 호출 안됨", async () => {
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

  it("에러 메시지 렌더링 테스트 - 아이디", async () => {
    vi.resetModules();
    vi.doMock("@/hooks/useLoginForm", () => ({
      useLoginForm: () => ({
        email: "",
        password: "12345678",
        emailError: ERROR_MESSAGES.LOGIN.ID_EMPTY,
        passwordError: "",
        isButtonEnabled: false,
        handleEmailChange: vi.fn(),
        handlePasswordChange: vi.fn(),
      }),
    }));

    const mod = await import("../LoginFormSection");
    const LoginFormSection = mod.default;
    render(
      <ThemeProvider theme={theme}>
        <LoginFormSection />
      </ThemeProvider>,
    );

    const errorText = screen.getByTestId("email-error");
    expect(errorText).toHaveTextContent(ERROR_MESSAGES.LOGIN.ID_EMPTY);
  });

  it("에러 메시지 렌더링 테스트 - 비밀번호", async () => {
    vi.resetModules();
    vi.doMock("@/hooks/useLoginForm", () => ({
      useLoginForm: () => ({
        email: "test@example.com",
        password: "",
        emailError: "",
        passwordError: ERROR_MESSAGES.LOGIN.PW_EMPTY,
        isButtonEnabled: false,
        handleEmailChange: vi.fn(),
        handlePasswordChange: vi.fn(),
      }),
    }));

    const mod = await import("../LoginFormSection");
    const LoginFormSection = mod.default;
    render(
      <ThemeProvider theme={theme}>
        <LoginFormSection />
      </ThemeProvider>,
    );

    const errorText = screen.getByTestId("password-error");
    expect(errorText).toHaveTextContent(ERROR_MESSAGES.LOGIN.PW_EMPTY);
  });
});
