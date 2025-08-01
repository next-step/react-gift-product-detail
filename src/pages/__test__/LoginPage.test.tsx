import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import LoginPage from "@/pages/LoginPage";
import { MemoryRouter } from "react-router-dom";
import { STORAGE_KEY } from "@/constants/storage";

const mockShowErrorToast = vi.fn();
const mockNavigate = vi.fn();

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
  showErrorToast: mockShowErrorToast,
}));

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom",
    );
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

function renderWithRouter(ui: React.ReactNode) {
  return render(<MemoryRouter>{ui}</MemoryRouter>);
}

describe("LoginPage", () => {
  let mutateFn: any;

  beforeEach(() => {
    vi.clearAllMocks();

    mutateFn = vi.fn((_data, { onSuccess, onError }) => {
      mutateFn.success = onSuccess;
      mutateFn.error = onError;
    });

    vi.doMock("@/hooks/useLoginMutation", () => ({
      useLoginMutation: () => ({
        mutate: mutateFn,
      }),
    }));

    vi.doMock("@/hooks/useLoginForm", () => ({
      useLoginForm: () => ({ ...defaultLoginForm }),
    }));

    vi.stubGlobal("sessionStorage", {
      setItem: vi.fn(),
    });
  });

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
    vi.doMock("@/hooks/useLoginForm", () => ({
      useLoginForm: () => ({
        ...defaultLoginForm,
        email: "invalid-email",
      }),
    }));

    renderWithRouter(<LoginPage />);

    // When
    await userEvent.click(screen.getByRole("button", { name: /로그인/i }));

    // Then
    expect(mockShowErrorToast).toHaveBeenCalledWith(
      expect.stringMatching(/이메일/),
    );
  });

  // 3. 비밀번호가 비어 있을 경우 에러 메세지 표시
  it("비밀번호가 없을 경우 에러 메세지", async () => {
    // Given
    vi.doMock("@/hooks/useLoginForm", () => ({
      useLoginForm: () => ({
        ...defaultLoginForm,
        password: "",
        isFormValid: false,
      }),
    }));

    renderWithRouter(<LoginPage />);

    // When
    await userEvent.click(screen.getByRole("button", { name: /로그인/i }));

    // Then
    expect(mutateFn).not.toHaveBeenCalled();
  });

  // 4. 유효한 폼 입력 후 로그인 버튼 클릭 시 mutate 호출
  it("로그인 버튼 클릭 시 mutate 호출", async () => {
    // Given
    renderWithRouter(<LoginPage />);

    // When
    await userEvent.click(screen.getByRole("button", { name: /로그인/i }));

    // Then
    expect(mutateFn).toHaveBeenCalledWith(
      { email: "test@kakao.com", password: "test123" },
      expect.any(Object),
    );
  });

  // 5. 로그인 성공 시, 토큰 저장 및 페이지 이동
  it("로그인 성공 시 저장, navigate 호출", () => {
    // Given
    renderWithRouter(<LoginPage />);
    const responseData = { authToken: "abc123", name: "test" };

    // When
    mutateFn.success?.(responseData);

    // Then
    expect(sessionStorage.setItem).toHaveBeenCalledWith(
      STORAGE_KEY.USER_INFO,
      JSON.stringify(responseData),
    );
    expect(mockNavigate).toHaveBeenCalled();
  });

  // 6. 로그인 실패 시, 에러 메세지 표시
  it("로그인 실패 시 에러 메세지 표시", () => {
    // Given
    renderWithRouter(<LoginPage />);
    // When
    mutateFn.error?.({ isAxiosError: true });
    // Then
    expect(mockShowErrorToast).toHaveBeenCalled();
  });
});
