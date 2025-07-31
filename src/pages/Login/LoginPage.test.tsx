import { render, screen, cleanup, fireEvent, waitFor } from "@testing-library/react";
import { ThemeProvider } from "@emotion/react";
import theme from "@/styles/theme/theme";
import LoginPage from "@/pages/Login/LoginPage";
import {
  AUTH_COOKIE_KEY_EMAIL,
  AUTH_COOKIE_KEY_NAME,
  AUTH_COOKIE_KEY_TOKEN,
  AuthProvider,
} from "@/contexts/authContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import {
  ERROR_MSG_ID_EMPTY,
  ERROR_MSG_ID_FORM,
  ERROR_MSG_PASSWORD_EMPTY,
  ERROR_MSG_PASSWORD_FORM,
} from "@/constants/errorMessage";
import { getCookieValue } from "@/utils/cookie";
import { ToastContainer } from "react-toastify";

const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <BrowserRouter>
    <QueryClientProvider client={new QueryClient()}>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          {children}
          <ToastContainer />
        </ThemeProvider>
      </AuthProvider>
    </QueryClientProvider>
  </BrowserRouter>
);

// 테스트 시나리오 흐름
// Given: 사용자가 로그인 페이지에 접속했을 때 이메일, 비밀번호 입력 창과 로그인 버튼을 본다.
// When: 사용자가 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭한다.
// Then: 로그인 성공 시 메인 페이지로 이동하며 auth 정보가 저장되어야 한다.

describe("LoginPage 통합 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test("이메일과 비밀번호를 입력하고 로그인 버튼을 클릭했을 때 로그인 성공 시 Auth 정보를 쿠키에 저장하고 메인 페이지로 이동", async () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드, 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // When: 사용자가 올바른 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭한다.
    fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
    fireEvent.change(passwordInput, { target: { value: "test1234" } });
    fireEvent.click(loginButton);

    // Then: 로그인 성공 시 auth 정보가 저장되어야 한다.
    await waitFor(() => {
      expect(getCookieValue(AUTH_COOKIE_KEY_EMAIL)).toBe("test@kakao.com");
      expect(getCookieValue(AUTH_COOKIE_KEY_NAME)).toBe("test");
      expect(getCookieValue(AUTH_COOKIE_KEY_TOKEN)).toBe("dummy-token");
      expect(window.location.pathname).toBe("/");
    });
  });

  test("kakao.com이 아닌 이메일로 로그인 시 토스트 에러 메시지 표시", async () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드, 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // When: 사용자가 kakao.com이 아닌 이메일과 비밀번호를 입력하고 로그인 버튼을 클릭한다.
    fireEvent.change(emailInput, { target: { value: "test@naver.com" } });
    fireEvent.change(passwordInput, { target: { value: "test1234" } });
    fireEvent.click(loginButton);

    // Then: 토스트 에러 메시지가 표시되어야 한다.
    await waitFor(() => {
      expect(screen.getByText("@kakao.com 이메일 주소만 가능합니다.")).toBeInTheDocument();
    });
  });
});

describe("LoginPage 단위 테스트", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    cleanup();
  });

  test("이메일, 비밀번호 입력 필드와 로그인 버튼 렌더링", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드와 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // Then: 입력 필드와 버튼이 렌더링되어야 한다.
    expect(emailInput).toBeInTheDocument();
    expect(passwordInput).toBeInTheDocument();
    expect(loginButton).toBeInTheDocument();
  });

  test("이메일과 비밀번호를 입력하지 않았을 때 로그인 버튼 비활성화", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드와 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // When: 사용자가 이메일과 비밀번호를 입력하지 않는다.
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    // Then: 로그인 버튼이 비활성화되어야 한다.
    expect(loginButton).toBeDisabled();
  });

  test("이메일을 입력하고 비밀번호를 입력하지 않았을 때 로그인 버튼 비활성화", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드와 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // When: 사용자가 이메일을 입력하고 비밀번호를 입력하지 않는다.
    fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
    fireEvent.change(passwordInput, { target: { value: "" } });

    // Then: 로그인 버튼이 비활성화되어야 한다.
    expect(loginButton).toBeDisabled();
  });

  test("이메일 입력값이 유효성 검사 통과, 비밀번호 입력값 유효성 검사 통과하지 못했을 때 로그인 버튼 비활성화", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드와 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // onBlur 이벤트 발생
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    // When: 사용자가 이메일 입력값이 유효성 검사를 통과하고 비밀번호 입력값이 유효성 검사를 통과하지 못했을 때
    fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    // Then: 로그인 버튼이 비활성화되어야 한다.
    expect(loginButton).toBeDisabled();
  });

  test("이메일을 입력하지 않고 비밀번호를 입력했을 때 로그인 버튼 비활성화", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드와 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // When: 사용자가 이메일을 입력하지 않고 비밀번호를 입력한다.
    fireEvent.change(emailInput, { target: { value: "" } });
    fireEvent.change(passwordInput, { target: { value: "test1234" } });

    // Then: 로그인 버튼이 비활성화되어야 한다.
    expect(loginButton).toBeDisabled();
  });

  test("이메일 입력값이 유효성 검사를 통과하지 못하고 비밀번호 입력값이 유효성 검사를 통과했을 때 로그인 버튼 비활성화", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드와 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // onBlur 이벤트 발생
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    // When: 사용자가 이메일 입력값이 유효성 검사를 통과하지 못하고 비밀번호를 입력한다.
    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test1234" } });

    // Then: 로그인 버튼이 비활성화되어야 한다.
    expect(loginButton).toBeDisabled();
  });

  test("이메일 입력값과 비밀번호 입력값이 유효성 검사를 통과했을 때 로그인 버튼 활성화", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드와 버튼 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");
    const loginButton = screen.getByRole("button", { name: "로그인" });

    // 로그인 버튼이 비활성화 되어있는지 확인
    expect(loginButton).toBeDisabled();

    // When: 사용자가 이메일과 비밀번호를 입력한다.
    fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
    fireEvent.change(passwordInput, { target: { value: "test1234" } });

    // Then: 로그인 버튼이 활성화되어야 한다.
    expect(loginButton).toBeEnabled();
  });

  test("onBlur 이벤트가 발생했을 때 에러 메시지 표시", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");

    // 에러 메시지가 없는지 확인
    expect(screen.queryByText(ERROR_MSG_ID_EMPTY)).not.toBeInTheDocument();
    expect(screen.queryByText(ERROR_MSG_PASSWORD_EMPTY)).not.toBeInTheDocument();

    // When: 이메일과 비밀번호 입력 필드에서 onBlur 이벤트가 발생한다.
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    // Then: 이메일과 비밀번호 입력 필드에 대한 에러 메시지가 표시되어야 한다.
    expect(screen.getByText(ERROR_MSG_ID_EMPTY)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MSG_PASSWORD_EMPTY)).toBeInTheDocument();
  });

  test("onBlur 이벤트가 발생 후 입력 필드 유효성 검사에 따라 에러 메시지 변화", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");

    // onBlur 이벤트 발생
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    // 에러 메시지 확인
    expect(screen.getByText(ERROR_MSG_ID_EMPTY)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MSG_PASSWORD_EMPTY)).toBeInTheDocument();

    // When: 사용자가 이메일과 비밀번호 입력 필드에 유효하지 않은 값을 입력한다.
    fireEvent.change(emailInput, { target: { value: "test" } });
    fireEvent.change(passwordInput, { target: { value: "test" } });

    // Then: 이메일과 비밀번호 입력 필드에 대한 에러 메시지가 변화해야 한다.
    expect(screen.getByText(ERROR_MSG_ID_FORM)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MSG_PASSWORD_FORM)).toBeInTheDocument();
  });

  test("onBlur 이벤트가 발생 후 입력 필드 유효성 검사를 통과하면 에러 메시지 사라짐", () => {
    // Given: 로그인 페이지 렌더링
    render(
      <TestWrapper>
        <LoginPage />
      </TestWrapper>,
    );

    // 입력 필드 가져오기
    const emailInput = screen.getByPlaceholderText("이메일");
    const passwordInput = screen.getByPlaceholderText("비밀번호");

    // onBlur 이벤트 발생
    fireEvent.blur(emailInput);
    fireEvent.blur(passwordInput);

    // 에러 메시지 확인
    expect(screen.getByText(ERROR_MSG_ID_EMPTY)).toBeInTheDocument();
    expect(screen.getByText(ERROR_MSG_PASSWORD_EMPTY)).toBeInTheDocument();

    // When: 사용자가 이메일과 비밀번호 입력 필드에 유효한 값을 입력한다.
    fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
    fireEvent.change(passwordInput, { target: { value: "test1234" } });

    // Then: 이메일과 비밀번호 입력 필드에 대한 에러 메시지가 사라져야 한다.
    expect(screen.queryByText(ERROR_MSG_ID_EMPTY)).not.toBeInTheDocument();
    expect(screen.queryByText(ERROR_MSG_PASSWORD_EMPTY)).not.toBeInTheDocument();
  });
});
