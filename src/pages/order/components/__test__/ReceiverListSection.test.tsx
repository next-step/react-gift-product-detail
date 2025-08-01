import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ReceiverListSection from "../ReceiverListSection";
import { ThemeProvider } from "@emotion/react";
import { theme } from "@/styles/theme";
import userEvent from "@testing-library/user-event";

function renderWithTheme(ui: React.ReactElement) {
  return render(<ThemeProvider theme={theme}>{ui}</ThemeProvider>);
}

describe("ReceiverListSection", () => {
  it("렌더링 -> 받는 사람 없음 문구", () => {
    renderWithTheme(<ReceiverListSection />);
    expect(screen.getByText(/받는 사람이 없습니다/i)).toBeInTheDocument();
  });

  it("추가 버튼 -> 다이아로그", () => {
    renderWithTheme(<ReceiverListSection />);

    const openButton = screen.getByRole("button", { name: /추가/i });
    fireEvent.click(openButton);

    expect(screen.getAllByText("받는 사람").length).toBeGreaterThanOrEqual(1);
    expect(
      screen.getByText(/최대 10명까지 추가할 수 있어요/i),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /추가하기/i }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /0명 완료/i }),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /취소/i })).toBeInTheDocument();
  });

  it("입력 완료 -> 테이블 추가", async () => {
    renderWithTheme(<ReceiverListSection />);

    await userEvent.click(screen.getByRole("button", { name: /추가/i }));

    await userEvent.click(
      await screen.findByRole("button", { name: /추가하기/i }),
    );

    const nameInput = await screen.findByTestId("receiver-name-0");
    await userEvent.clear(nameInput);
    await userEvent.type(nameInput, "홍길동");

    const phoneInput = screen.getByPlaceholderText("01012341234");
    await userEvent.clear(phoneInput);
    await userEvent.type(phoneInput, "01012341234");

    const quantityInput = screen.getByPlaceholderText("1");
    await userEvent.clear(quantityInput);
    await userEvent.type(quantityInput, "2");

    await userEvent.click(screen.getByRole("button", { name: /1명 완료/i }));

    expect(await screen.findByText("홍길동")).toBeInTheDocument();
    expect(screen.getByText("01012341234")).toBeInTheDocument();
    expect(screen.getByText("2")).toBeInTheDocument();
  });
});
