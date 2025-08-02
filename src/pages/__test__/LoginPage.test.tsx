import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { STORAGE_KEY } from "@/constants/storage";
import * as loginFormModule from "@/hooks/useLoginForm";

let LoginPage: React.ComponentType;

const mockNavigate = vi.fn();
const mockSetItem = vi.fn();
const mockShowErrorToast = vi.fn();

const mockMutate = vi.fn((variables, options) => {
  if (variables.email === "test@kakao.com") {
    options?.onSuccess?.(
      { authToken: "abc123", name: "test" },
      variables,
      undefined
    );
  } else {
    options?.onError?.({ isAxiosError: true }, variables, undefined);
  }
});

const defaultLoginForm = {
  email: "test@kakao.com",
  emailError: "",
  password: "test1234",
  passwordError: "",
  changeEmail: vi.fn(),
  notFocusEmail: vi.fn(),
  changePassword: vi.fn(),
  notFocusPassword: vi.fn(),
  isFormValid: true,
};

vi.mock("@/styles/toast", () => ({
  showErrorToast: (...args: unknown[]) => mockShowErrorToast(...args),
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@/hooks/useLoginMutation", () => ({
  useLoginMutation: () => ({
    mutate: mockMutate,
  }),
}));

vi.mock("@/hooks/useLoginForm", () => ({
  useLoginForm: () => ({ ...defaultLoginForm }),
}));

vi.mock("axios", () => ({
  isAxiosError: () => true,
}));

beforeEach(async () => {
  vi.clearAllMocks();

  Object.defineProperty(window, "sessionStorage", {
    value: {
      setItem: mockSetItem,
      getItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    },
    writable: true,
    configurable: true,
  });

  LoginPage = (await import("@/pages/LoginPage")).default;
});

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("LoginPage", () => {
  // 1. 이메일, 비밀번호 input이 보여야 함.
  it("이메일, 비밀번호, 로그인 버튼 렌더링", () => {
    // Given
    renderWithRouter(<LoginPage />);

    // Then
    expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /로그인/i })).toBeInTheDocument();
  });

  // 2. 유효하지 않은 이메일 형식을 입력하면 에러 메세지 표시
  it("유효하지 않은 이메일 입력 시 에러 메세지", async () => {
    // Given
    vi.spyOn(loginFormModule, "useLoginForm").mockReturnValue({
      ...defaultLoginForm,
      email: "invalid-email",
    });

    renderWithRouter(<LoginPage />);

    // When
    await userEvent.click(screen.getByRole("button", { name: /로그인/i }));

    // Then
    expect(mockShowErrorToast).toHaveBeenCalledWith(
      expect.stringMatching(/이메일/)
    );
  });

  // 3. 비밀번호가 비어 있을 경우 에러 메세지 표시
  it("비밀번호가 없을 경우 에러 메세지", async () => {
    // Given
    vi.spyOn(loginFormModule, "useLoginForm").mockReturnValue({
      ...defaultLoginForm,
      password: "",
      isFormValid: false,
    });
    renderWithRouter(<LoginPage />);

    // When
    await userEvent.click(screen.getByRole("button", { name: /로그인/i }));

    // Then
    expect(mockMutate).not.toHaveBeenCalled();
  });

  // 4. 유효한 폼 입력 후 로그인 버튼 클릭 시 mutate 호출
  it("로그인 버튼 클릭 시 mutate 호출", async () => {
    // Given
    vi.spyOn(loginFormModule, "useLoginForm").mockReturnValue({
      ...defaultLoginForm,
    });
    renderWithRouter(<LoginPage />);

    // When
    await userEvent.click(screen.getByRole("button", { name: /로그인/i }));

    // Then
    await waitFor(() => {
      expect(mockMutate).toHaveBeenCalledWith(
        { email: "test@kakao.com", password: "test1234" },
        expect.any(Object)
      );
    });
  });

  // 5. 로그인 성공 시, 토큰 저장 후 홈으로 이동
  it("로그인 성공 시 저장 후 홈으로 이동", async () => {
    renderWithRouter(<LoginPage />);
    await userEvent.click(screen.getByRole("button", { name: /로그인/i }));

    expect(mockSetItem).toHaveBeenCalledWith(
      STORAGE_KEY.USER_INFO,
      JSON.stringify({ authToken: "abc123", name: "test" })
    );
    expect(mockNavigate).toHaveBeenCalledWith("/", { replace: true });
  });

  // 6. 로그인 실패 시, 에러 메세지 표시
  it("로그인 실패 시 에러 메세지 표시", async () => {
    vi.spyOn(
      await import("@/hooks/useLoginForm"),
      "useLoginForm"
    ).mockReturnValue({
      ...defaultLoginForm,
      email: "invalid-email",
    });

    renderWithRouter(<LoginPage />);
    await userEvent.click(screen.getByRole("button", { name: /로그인/i }));

    expect(mockShowErrorToast).toHaveBeenCalledWith(
      "올바른 이메일 형식이 아닙니다."
    );
  });
});
