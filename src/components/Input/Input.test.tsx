import { describe, expect, it } from "vitest";
import type { InputProps } from "./Input";
import { screen } from "@testing-library/react";
import Input from "./Input";
import { renderWithTheme } from "@/setupTests";
import { LOGIN_ERROR_MESSAGES } from "@/pages/LoginPage/constants/labels";

describe("Input 컴포넌트", () => {
  it("errorMessage가 없으면 에러 메시지가 표시되지 않는다", () => {
    // given
    const props: InputProps = {
      errorMessage: undefined,
    };

    // when
    renderWithTheme(<Input {...props} />);

    // then
    expect(
      screen.queryByText(LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID)
    ).not.toBeInTheDocument();
  });

  it("errorMessage가 있으면 에러 메시지가 표시된다", () => {
    // given
    const props: InputProps = {
      errorMessage: LOGIN_ERROR_MESSAGES.EMAIL_FORMAT_INVALID,
    };

    // when
    renderWithTheme(<Input {...props} />);

    // then
    expect(screen.getByText(props.errorMessage!)).toBeInTheDocument();
  });
});
