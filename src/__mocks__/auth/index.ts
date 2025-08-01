import { http, HttpResponse } from "msw";

export const authHandlers = [
    http.post(`*/login`, async ({ request }) => {
        const body = (await request.json()) as { email: string; password: string };

        if (body.email === "test@example.com" && body.password === "password123") {
            return HttpResponse.json({
                success: true,
                data: {
                    email: "test@example.com",
                    name: "테스트 사용자",
                    authToken: "mock-auth-token-123",
                },
            });
        }

        return HttpResponse.json(
            { success: false, message: "잘못된 자격증명입니다." },
            { status: 400 },
        );
    }),
];
