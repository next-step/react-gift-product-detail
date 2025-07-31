import "@testing-library/jest-dom";
import React from "react";
import { vi } from "vitest";

vi.mock("@/assets/kakao-logo.svg?react", () => ({
  default: ({ ...props }) => {
    return React.createElement("svg", {
      ...props,
      "data-testid": "kakao-logo",
    });
  },
}));

vi.mock("@/constants", () => ({
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  NON_BREAKING_SPACE: "\u00A0",
  LOGIN_ERROR_MESSAGE: {
    ID: {
      REQUIRED: "이메일을 입력해주세요.",
      INVALID_FORMAT: "올바른 이메일 형식이 아닙니다.",
    },
    PASSWORD: {
      REQUIRED: "비밀번호를 입력해주세요.",
      MIN_LENGTH: "비밀번호는 8자 이상이어야 합니다.",
    },
  },
}));
