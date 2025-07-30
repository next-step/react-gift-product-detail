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

describe("로그인 페이지", () => {
  describe("로그인 UI 렌더링", () => {
    it("이메일 입력 필드가 화면에 표시된다", () => {
      // given
      // when
      renderWithTheme(<LoginPage />);

      // thene
      expect(
        screen.getByPlaceholderText(LOGIN_LABELS.EMAIL_PLACEHOLDER)
      ).toBeInTheDocument();
    });

    it("비밀번호 입력 필드가 화면에 표시된다", () => {
      // given
      // when
      renderWithTheme(<LoginPage />);

      // thene
      expect(
        screen.getByPlaceholderText(LOGIN_LABELS.PASSWORD_PLACEHOLDER)
      ).toBeInTheDocument();
    });

    it("로그인 submit 버튼이 화면에 표시된다", () => {
      // given
      // when
      renderWithTheme(<LoginPage />);

      // thene
      expect(
        screen.getByRole("button", { name: LOGIN_LABELS.LOGIN_BUTTON })
      ).toBeInTheDocument();
    });
  });

  describe("폼 검증 트리거 조건", () => {
    it("필드에 값을 입력한 후 blur 이벤트가 발생하면 공백 검증이 활성화된다", () => {
      // given
      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.blur(emailInput);

      // then
      expect(
        screen.getByText(LOGIN_ERROR_MESSAGES.EMAIL_EMPTY)
      ).toBeInTheDocument();
    });

    it("필드에 값을 입력했지만 blur 이벤트가 발생하지 않으면 공백 검증이 비활성화된다", () => {
      // given
      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "" } });

      // then
      expect(
        screen.queryByText(LOGIN_ERROR_MESSAGES.EMAIL_EMPTY)
      ).not.toBeInTheDocument();
    });

    it("한 필드에 값을 입력한 후 다른 필드에서 onChange 이벤트가 발생하면 형식 검증이 활성화된다", () => {
      // given
      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "test" } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: "123" } });

      // then
      expect(
        screen.getByText(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID)
      ).toBeInTheDocument();
    });

    it("한 필드에 값을 입력했지만 다른 필드에서 onChange 이벤트가 발생하지 않으면 형식 검증이 비활성화된다", () => {
      // given
      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "test" } });
      fireEvent.blur(emailInput);

      // then
      expect(
        screen.queryByText(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID)
      ).not.toBeInTheDocument();
    });
  });

  describe("이메일 필드 유효성 검증", () => {
    it("유효한 이메일 형식이 입력되면 에러 메시지가 표시되지 않는다", () => {
      // given
      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: "12345678" } });

      // then
      expect(
        screen.queryByText(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(LOGIN_ERROR_MESSAGES.EMAIL_EMPTY)
      ).not.toBeInTheDocument();
    });

    it("이메일 필드가 비어있으면 에러 메시지가 표시된다", () => {
      // given
      renderWithTheme(<LoginPage />);
      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "" } });
      fireEvent.blur(emailInput);

      // then
      expect(
        screen.getByText(LOGIN_ERROR_MESSAGES.EMAIL_EMPTY)
      ).toBeInTheDocument();
    });

    it("잘못된 이메일 형식이 입력되면 에러 메시지가 표시된다", () => {
      // given
      renderWithTheme(<LoginPage />);
      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "test@test" } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: "12345678" } });

      // then
      expect(
        screen.getByText(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID)
      ).toBeInTheDocument();
    });
  });

  describe("비밀번호 필드 유효성 검증", () => {
    it("유효한 비밀번호 형식이 입력되면 에러 메시지가 표시되지 않는다", () => {
      // given
      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.blur(emailInput);
      fireEvent.change(passwordInput, { target: { value: "12345678" } });

      // then
      expect(
        screen.queryByText(LOGIN_ERROR_MESSAGES.PASSWORD_EMPTY)
      ).not.toBeInTheDocument();
      expect(
        screen.queryByText(LOGIN_ERROR_MESSAGES.PASSWORD_FORMAT_INVALID)
      ).not.toBeInTheDocument();
    });

    it("비밀번호 필드가 비어있으면 에러 메시지가 표시된다", () => {
      // given
      renderWithTheme(<LoginPage />);
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(passwordInput, { target: { value: "" } });
      fireEvent.blur(passwordInput);

      // then
      expect(
        screen.getByText(LOGIN_ERROR_MESSAGES.PASSWORD_EMPTY)
      ).toBeInTheDocument();
    });

    it("비밀번호가 8자 미만이면 에러 메시지가 표시된다", () => {
      // given
      renderWithTheme(<LoginPage />);
      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(passwordInput, { target: { value: "1234567" } });
      fireEvent.blur(passwordInput);
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });

      // then
      expect(
        screen.getByText(LOGIN_ERROR_MESSAGES.PASSWORD_FORMAT_INVALID)
      ).toBeInTheDocument();
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
      server.use(
        http.post("/api/login", () => {
          return HttpResponse.json(
            {
              data: {
                email: "test@kakao.com",
                name: "Test User",
                authToken: "mock-token",
              },
            },
            { status: 200 }
          );
        })
      );

      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "test@kakao.com" } });
      fireEvent.change(passwordInput, { target: { value: "12345678" } });
      fireEvent.submit(
        screen.getByRole("button", { name: LOGIN_LABELS.LOGIN_BUTTON })
      );

      // then
      await waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(ROUTES.HOME, {
          replace: true,
        });
      });
    });

    it("로그인이 성공하면 사용자 정보가 세션 스토리지에 저장된다", async () => {
      // given
      const login = {
        email: "test@kakao.com",
        password: "12345678",
      };
      const user = {
        email: login.email,
        name: "test",
        authToken: "dummy-token",
      };

      server.use(
        http.post("/api/login", () => {
          return HttpResponse.json(
            {
              data: {
                email: login.email,
                name: user.name,
                authToken: user.authToken,
              },
            },
            { status: 200 }
          );
        })
      );

      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: login.email } });
      fireEvent.change(passwordInput, { target: { value: login.password } });
      fireEvent.submit(
        screen.getByRole("button", { name: LOGIN_LABELS.LOGIN_BUTTON })
      );

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
      server.use(
        http.post("/api/login", () => {
          return HttpResponse.json({}, { status: 400 });
        })
      );

      renderWithTheme(<LoginPage />);

      const emailInput = screen.getByPlaceholderText(
        LOGIN_LABELS.EMAIL_PLACEHOLDER
      );
      const passwordInput = screen.getByPlaceholderText(
        LOGIN_LABELS.PASSWORD_PLACEHOLDER
      );

      // when
      fireEvent.change(emailInput, { target: { value: "test@example.com" } });
      fireEvent.change(passwordInput, { target: { value: "12345678" } });
      fireEvent.submit(
        screen.getByRole("button", { name: LOGIN_LABELS.LOGIN_BUTTON })
      );

      // then
      await waitFor(() => {
        expect(toast.error).toHaveBeenCalledWith(
          API_LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID
        );
      });
    });
  });
});
