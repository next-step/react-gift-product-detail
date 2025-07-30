import { screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { LoginForm } from "../LoginForm";
import { renderWithTheme } from "@/test/test-utils";
import * as userStorageModule from "@/utils/userStorage";
import * as useLoginHook from "@/hooks/mutations/useLogin";
import { toast } from "react-toastify";

vi.mock("react-toastify", () => ({
  toast: {
    error: vi.fn(),
    success: vi.fn(),
  },
}));

const fakeUser = {
  email: "test@kakao.com",
  name: "최지원",
  authToken: "token123",
};

const onLoginSuccess = vi.fn();

describe("LoginForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.spyOn(useLoginHook, "useLogin").mockReturnValue({
      mutate: () => {
        userStorageModule.userStorage.set(fakeUser);
        onLoginSuccess(fakeUser.email, fakeUser.authToken);
      },
      isPending: false,
    } as any);
  });

  it("초기 상태에서 로그인 버튼은 비활성화된다", () => {
    renderWithTheme(<LoginForm onLoginSuccess={onLoginSuccess} />);
    expect(screen.getByRole("button", { name: "로그인" })).toBeDisabled();
  });

  it("이메일이 비어있을 경우 에러 메시지를 출력한다", () => {
    renderWithTheme(<LoginForm onLoginSuccess={onLoginSuccess} />);
    fireEvent.blur(screen.getByPlaceholderText("이메일"));
    expect(screen.getByText("ID를 입력해주세요.")).toBeInTheDocument();
  });

  it("비밀번호가 8글자 미만일 경우 에러 메시지를 출력한다", () => {
    renderWithTheme(<LoginForm onLoginSuccess={onLoginSuccess} />);
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
      target: { value: "123" },
    });
    fireEvent.blur(screen.getByPlaceholderText("비밀번호"));
    expect(screen.getByText("PW는 최소 8글자 이상이어야 합니다.")).toBeInTheDocument();
  });

  it("kakao 이메일이 아닌 경우 토스트 에러를 출력한다", () => {
    renderWithTheme(<LoginForm onLoginSuccess={onLoginSuccess} />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), {
      target: { value: "test@naver.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(toast.error).toHaveBeenCalledWith("@kakao.com 이메일 주소만 가능합니다.");
  });

  it("유효한 입력 시 mutate 함수가 호출된다", () => {
    const mutateSpy = vi.fn();
    vi.spyOn(useLoginHook, "useLogin").mockReturnValue({
      mutate: mutateSpy,
      isPending: false,
    } as any);

    renderWithTheme(<LoginForm onLoginSuccess={onLoginSuccess} />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), {
      target: { value: "test@kakao.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(mutateSpy).toHaveBeenCalledWith({
      email: "test@kakao.com",
      password: "12345678",
    });
  });

  it("로그인 성공 시 userStorage.set과 onLoginSuccess가 호출된다", () => {
    const setSpy = vi.spyOn(userStorageModule.userStorage, "set");

    renderWithTheme(<LoginForm onLoginSuccess={onLoginSuccess} />);
    fireEvent.change(screen.getByPlaceholderText("이메일"), {
      target: { value: "test@kakao.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("비밀번호"), {
      target: { value: "12345678" },
    });
    fireEvent.click(screen.getByRole("button", { name: "로그인" }));

    expect(setSpy).toHaveBeenCalledWith(fakeUser);
    expect(onLoginSuccess).toHaveBeenCalledWith("test@kakao.com", "token123");
  });
});
