import { describe, it, expect, vi } from "vitest";

import { useLogIn } from "../services/logIn";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { renderHook } from "@testing-library/react";

vi.mock("react-toastify", () => ({
    toast: {
        error: vi.fn(),
    },
}));

const createWrapper = () => {
    const queryClient = new QueryClient({
        defaultOptions: {
            queries: { retry: false },
            mutations: { retry: false },
        },
    });

    return ({ children }: { children: React.ReactNode }) => (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    );
};

describe("useLogIn", () => {
    it("성공적인 로그인 요청을 처리한다", async () => {
        const wrapper = createWrapper();
        const { result } = renderHook(() => useLogIn(), { wrapper });

        const loginData = {
            email: "test@example.com",
            password: "password123",
        };

        const response = await result.current.request(loginData);

        expect(response).toEqual({
            email: "test@example.com",
            name: "테스트 사용자",
            authToken: "mock-auth-token-123",
        });
    });

    it("초기 상태가 올바르게 설정되어야 한다", () => {
        const wrapper = createWrapper();
        const { result } = renderHook(() => useLogIn(), { wrapper });

        expect(result.current.isPending).toBe(false);
        expect(result.current.data).toBe(null);
        expect(result.current.error).toBe(null);
    });
});
