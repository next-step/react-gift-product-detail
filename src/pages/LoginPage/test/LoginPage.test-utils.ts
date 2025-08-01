import { screen } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { LOGIN_LABELS } from "../constants/labels";
import { expect } from "vitest";
import { server } from "@/setupTests";

// UI 검증 헬퍼 함수들
export const expectEmailField = () => {
  expect(
    screen.getByPlaceholderText(LOGIN_LABELS.EMAIL_PLACEHOLDER)
  ).toBeInTheDocument();
};

export const expectPasswordField = () => {
  expect(
    screen.getByPlaceholderText(LOGIN_LABELS.PASSWORD_PLACEHOLDER)
  ).toBeInTheDocument();
};

export const expectLoginButton = () => {
  expect(
    screen.getByRole("button", { name: LOGIN_LABELS.LOGIN_BUTTON })
  ).toBeInTheDocument();
};

export const expectEmailFieldError = (label: string) => {
  expect(screen.getByText(label)).toBeInTheDocument();
};

export const expectEmailFieldNotError = (label: string) => {
  expect(screen.queryByText(label)).not.toBeInTheDocument();
};

export const expectPasswordFieldError = (label: string) => {
  expect(screen.getByText(label)).toBeInTheDocument();
};

export const expectPasswordFieldNotError = (label: string) => {
  expect(screen.queryByText(label)).not.toBeInTheDocument();
};

// 서버 응답 헬퍼 함수들
export const mockLoginSuccess = (userData: {
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

export const mockLoginFailure = (status: number = 400) => {
  server.use(
    http.post("/api/login", () => {
      return HttpResponse.json({}, { status });
    })
  );
};

export { server };
