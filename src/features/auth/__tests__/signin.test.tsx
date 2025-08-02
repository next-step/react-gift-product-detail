import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { describe, it, expect, vi } from "vitest";

import { theme } from "@/app/theme";

import { AuthProvider } from "@/features/auth/context/AuthContext";

import SignInPage from "@/pages/auth/SignInPage";

import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

vi.mock("@/shared/hooks/useRedirect", () => ({
    useRedirect: () => ({
        returnToRedirect: vi.fn(),
    }),
}));

const TestWrapper = ({ children }: { children: React.ReactNode }) => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return (
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <AuthProvider>
                    <ThemeProvider theme={theme}>
                        {children}
                        <ToastContainer />
                    </ThemeProvider>
                </AuthProvider>
            </BrowserRouter>
        </QueryClientProvider>
    );
};

describe("SignInPage", () => {
    it("로그인 페이지가 올바르게 렌더링된다", () => {
        render(
            <TestWrapper>
                <SignInPage />
            </TestWrapper>,
        );

        expect(screen.getByPlaceholderText("이메일")).toBeInTheDocument();
        expect(screen.getByPlaceholderText("비밀번호")).toBeInTheDocument();
        expect(screen.getByRole("button", { name: "로그인" })).toBeInTheDocument();
    });

    it("이메일과 비밀번호를 입력하지 않으면 로그인 버튼이 비활성화된다", () => {
        render(
            <TestWrapper>
                <SignInPage />
            </TestWrapper>,
        );

        const loginButton = screen.getByRole("button", { name: "로그인" });
        expect(loginButton).toBeDisabled();
    });

    it("올바른 이메일과 비밀번호를 입력하면 로그인 버튼이 활성화된다", async () => {
        render(
            <TestWrapper>
                <SignInPage />
            </TestWrapper>,
        );

        const emailInput = screen.getByPlaceholderText("이메일");
        const passwordInput = screen.getByPlaceholderText("비밀번호");
        const loginButton = screen.getByRole("button", { name: "로그인" });

        fireEvent.change(emailInput, { target: { value: "test@example.com" } });
        fireEvent.change(passwordInput, { target: { value: "password123" } });

        await waitFor(() => {
            expect(loginButton).not.toBeDisabled();
        });
    });

    it("잘못된 이메일 형식을 입력하면 에러 메시지가 표시된다", async () => {
        render(
            <TestWrapper>
                <SignInPage />
            </TestWrapper>,
        );

        const emailInput = screen.getByPlaceholderText("이메일");

        fireEvent.change(emailInput, { target: { value: "invalid-email" } });
        fireEvent.blur(emailInput);

        await waitFor(() => {
            expect(screen.getByText("ID는 이메일 형식으로 입력해주세요.")).toBeInTheDocument();
        });
    });

    it("8자 미만의 비밀번호를 입력하면 에러 메시지가 표시된다", async () => {
        render(
            <TestWrapper>
                <SignInPage />
            </TestWrapper>,
        );

        const passwordInput = screen.getByPlaceholderText("비밀번호");

        fireEvent.change(passwordInput, { target: { value: "1234567" } });

        await waitFor(() => {
            expect(screen.getByText("PW는 최소 8글자 이상이어야 합니다.")).toBeInTheDocument();
        });
    });
});
