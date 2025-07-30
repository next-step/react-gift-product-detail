import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { renderWithTheme } from "@/setupTests";
import {
  describe,
  expect,
  it,
  afterEach,
  afterAll,
  beforeAll,
  beforeEach,
  vi,
} from "vitest";
import LoginPage from "../LoginPage";
import { fireEvent, screen, waitFor } from "@testing-library/react";
import { LOGIN_ERROR_MESSAGES, LOGIN_LABELS } from "../constants/labels";
import { API_LOGIN_ERROR_MESSAGES } from "../constants/apiMessage";
import { toast } from "react-toastify";
import { ROUTES } from "@/constants/routes";

vi.mock("react-toastify");

const mockNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

const server = setupServer();

const expectEmailField = () => {
  expect(
    screen.getByPlaceholderText(LOGIN_LABELS.EMAIL_PLACEHOLDER)
  ).toBeInTheDocument();
};

const expectPasswordField = () => {
  expect(
    screen.getByPlaceholderText(LOGIN_LABELS.PASSWORD_PLACEHOLDER)
  ).toBeInTheDocument();
};

const expectLoginButton = () => {
  expect(
    screen.getByRole("button", { name: LOGIN_LABELS.LOGIN_BUTTON })
  ).toBeInTheDocument();
};

const expectEmailFieldError = (label: string) => {
  expect(screen.getByText(label)).toBeInTheDocument();
};

const expectEmailFieldNotError = (label: string) => {
  expect(screen.queryByText(label)).not.toBeInTheDocument();
};

const expectPasswordFieldError = (label: string) => {
  expect(screen.getByText(label)).toBeInTheDocument();
};

const expectPasswordFieldNotError = (label: string) => {
  expect(screen.queryByText(label)).not.toBeInTheDocument();
};

const mockLoginSuccess = (userData: {
  email: string;
  name: string;
  authToken: string;
}) => {
  server.use(
    http.post("/api/login", () => {
      return HttpResponse.json(
        {
          data: userData,
        },
        { status: 200 }
      );
    })
  );
};

const mockLoginFailure = (status: number = 400) => {
  server.use(
    http.post("/api/login", () => {
      return HttpResponse.json({}, { status });
    })
  );
};

describe("로그인 페이지", () => {
  let emailField: HTMLInputElement;
  let passwordField: HTMLInputElement;
  let loginButton: HTMLButtonElement;

  beforeEach(() => {
    renderWithTheme(<LoginPage />);
    emailField = screen.getByPlaceholderText(
      LOGIN_LABELS.EMAIL_PLACEHOLDER
    ) as HTMLInputElement;
    passwordField = screen.getByPlaceholderText(
      LOGIN_LABELS.PASSWORD_PLACEHOLDER
    ) as HTMLInputElement;
    loginButton = screen.getByRole("button", {
      name: LOGIN_LABELS.LOGIN_BUTTON,
    }) as HTMLButtonElement;
  });

  describe("로그인 UI 렌더링", () => {
    it("이메일 입력 필드가 화면에 표시된다", () => {
      // given
      // when

      // thene
      expectEmailField();
    });

    it("비밀번호 입력 필드가 화면에 표시된다", () => {
      // given
      // when

      // thene
      expectPasswordField();
    });

    it("로그인 submit 버튼이 화면에 표시된다", () => {
      // given
      // when

      // thene
      expectLoginButton();
    });
  });

  describe("폼 검증 트리거 조건", () => {
    it("필드에 값을 입력한 후 blur 이벤트가 발생하면 공백 검증이 활성화된다", () => {
      // given
      // when
      fireEvent.change(emailField, { target: { value: "" } });
      fireEvent.blur(emailField);

      // then
      expectEmailFieldError(LOGIN_ERROR_MESSAGES.EMAIL_EMPTY);
    });

    it("필드에 값을 입력했지만 blur 이벤트가 발생하지 않으면 공백 검증이 비활성화된다", () => {
      // given
      // when
      fireEvent.change(emailField, { target: { value: "" } });

      // then
      expectEmailFieldNotError(LOGIN_ERROR_MESSAGES.EMAIL_EMPTY);
    });

    it("한 필드에 값을 입력한 후 다른 필드에서 onChange 이벤트가 발생하면 형식 검증이 활성화된다", () => {
      // given
      // when
      fireEvent.change(emailField, { target: { value: "test" } });
      fireEvent.blur(emailField);
      fireEvent.change(passwordField, { target: { value: "123" } });

      // then
      expectEmailFieldError(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID);
    });

    it("한 필드에 값을 입력했지만 다른 필드에서 onChange 이벤트가 발생하지 않으면 형식 검증이 비활성화된다", () => {
      // given
      // when
      fireEvent.change(emailField, { target: { value: "test" } });
      fireEvent.blur(emailField);

      // then
      expectEmailFieldNotError(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID);
    });
  });

  describe("이메일 필드 유효성 검증", () => {
    it("유효한 이메일 형식이 입력되면 에러 메시지가 표시되지 않는다", () => {
      // given
      // when
      fireEvent.change(emailField, { target: { value: "test@example.com" } });
      fireEvent.blur(emailField);
      fireEvent.change(passwordField, { target: { value: "12345678" } });

      // then
      expectEmailFieldNotError(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID);
      expectEmailFieldNotError(LOGIN_ERROR_MESSAGES.EMAIL_EMPTY);
    });

    it("이메일 필드가 비어있으면 에러 메시지가 표시된다", () => {
      // given
      // when
      fireEvent.change(emailField, { target: { value: "" } });
      fireEvent.blur(emailField);

      // then
      expectEmailFieldError(LOGIN_ERROR_MESSAGES.EMAIL_EMPTY);
    });

    it("잘못된 이메일 형식이 입력되면 에러 메시지가 표시된다", () => {
      // given
      // when
      fireEvent.change(emailField, { target: { value: "test@test" } });
      fireEvent.blur(emailField);
      fireEvent.change(passwordField, { target: { value: "12345678" } });

      // then
      expectEmailFieldError(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID);
    });
  });

  describe("비밀번호 필드 유효성 검증", () => {
    it("유효한 비밀번호 형식이 입력되면 에러 메시지가 표시되지 않는다", () => {
      // given
      // when
      fireEvent.change(emailField, { target: { value: "test@example.com" } });
      fireEvent.blur(emailField);
      fireEvent.change(passwordField, { target: { value: "12345678" } });

      // then
      expectPasswordFieldNotError(LOGIN_ERROR_MESSAGES.PASSWORD_EMPTY);
      expectPasswordFieldNotError(LOGIN_ERROR_MESSAGES.PASSWORD_FORMAT_INVALID);
    });

    it("비밀번호 필드가 비어있으면 에러 메시지가 표시된다", () => {
      // given
      // when
      fireEvent.change(passwordField, { target: { value: "" } });
      fireEvent.blur(passwordField);

      // then
      expectPasswordFieldError(LOGIN_ERROR_MESSAGES.PASSWORD_EMPTY);
    });

    it("비밀번호가 8자 미만이면 에러 메시지가 표시된다", () => {
      // given
      // when
      fireEvent.change(passwordField, { target: { value: "1234567" } });
      fireEvent.blur(passwordField);
      fireEvent.change(emailField, { target: { value: "test@example.com" } });

      // then
      expectPasswordFieldError(LOGIN_ERROR_MESSAGES.PASSWORD_FORMAT_INVALID);
    });
  });

  describe("로그인 폼 제출 처리", () => {
    beforeAll(() => server.listen());
    afterAll(() => server.close());
    afterEach(() => {
      server.resetHandlers();
      vi.clearAllMocks();
    });

    it("로그인이 성공하면 홈 페이지로 이동한다", async () => {
      // given
      mockLoginSuccess({
        email: "test@kakao.com",
        name: "Test User",
        authToken: "mock-token",
      });

      // when
      fireEvent.change(emailField, { target: { value: "test@kakao.com" } });
      fireEvent.change(passwordField, { target: { value: "12345678" } });
      fireEvent.submit(loginButton);

      // then
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME, {
          replace: true,
        });
      });
    });

    it("로그인이 성공하면 사용자 정보가 세션 스토리지에 저장된다", async () => {
      // given
      const user = {
        email: "test@kakao.com",
        name: "test",
        authToken: "dummy-token",
      };

      mockLoginSuccess(user);

      // when
      fireEvent.change(emailField, { target: { value: user.email } });
      fireEvent.change(passwordField, { target: { value: "12345678" } });
      fireEvent.submit(loginButton);

      // then
      await waitFor(() => {
        const savedUser = sessionStorage.getItem("kakao_gift_user");
        expect(savedUser).not.toBeNull();

        const parsedUser = JSON.parse(savedUser!);
        expect(parsedUser.authToken).toBe(user.authToken);
        expect(parsedUser.email).toBe(user.email);
        expect(parsedUser.name).toBe(user.name);
      });
    });

    it("카카오 이메일(@kakao.com)이 아닌 경우 토스트 에러 메시지가 표시된다", async () => {
      // given
      mockLoginFailure(400);

      // when
      fireEvent.change(emailField, { target: { value: "test@example.com" } });
      fireEvent.change(passwordField, { target: { value: "12345678" } });
      fireEvent.submit(loginButton);

      // then
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          API_LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID
        );
      });
    });
  });
});
