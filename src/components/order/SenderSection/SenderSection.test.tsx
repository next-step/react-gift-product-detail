import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect } from "vitest";
import SenderSection from "./index";
import { ThemeProvider } from "@emotion/react";
import { useForm } from "react-hook-form";
import theme from "@/styles/theme";
import type { FormValues } from "../type";
const renderWithTheme = (errors = {}) => {
  const Wrapper = () => {
    const {
      register,
      formState: { errors: formErrors },
    } = useForm<FormValues>();
    return (
      <ThemeProvider theme={theme}>
        <SenderSection register={register} errors={errors || formErrors} />
      </ThemeProvider>
    );
  };

  render(<Wrapper />);
};

describe("SenderSection", () => {
  test("사용자 입력에 따라 값이 변경된다", async () => {
    renderWithTheme();
    const input = screen.getByPlaceholderText("이름을 입력하세요.");
    await userEvent.type(input, "홍길동");
    expect(input).toHaveValue("홍길동");
  });

  test("에러 메시지가 있는 경우 표시된다", () => {
    renderWithTheme({
      sender: {
        message: "이름을 입력해주세요.",
      },
    });
    expect(screen.getByText("이름을 입력해주세요.")).toBeInTheDocument();
  });
});
