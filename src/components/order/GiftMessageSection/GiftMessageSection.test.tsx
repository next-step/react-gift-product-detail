import { render, screen, fireEvent } from "@testing-library/react";
import GiftMessageSection from "./index";
import { ThemeProvider } from "@emotion/react";
import { useForm } from "react-hook-form";
import { cardData } from "@/mocks/orderCardData";
import { describe, it, expect } from "vitest";
import React from "react";
import theme from "@/styles/theme";
import type { FormValues } from "../type";

const renderWithForm = () => {
  const Wrapper = () => {
    const {
      register,
      setValue,
      formState: { errors },
    } = useForm<FormValues>({
      defaultValues: {
        message: "",
      },
      mode: "onBlur",
    });

    const [selectedCardId, setSelectedCardId] = React.useState("1");

    return (
      <ThemeProvider theme={theme}>
        <GiftMessageSection
          register={register}
          errors={errors}
          setValue={setValue}
          selectedCardId={selectedCardId}
          setSelectedCardId={setSelectedCardId}
        />
      </ThemeProvider>
    );
  };

  render(<Wrapper />);
};

describe("GiftMessageSection", () => {
  it("카드 썸네일이 모두 렌더링된다", () => {
    renderWithForm();
    const thumbnails = screen.getAllByAltText("card thumbnail");
    expect(thumbnails).toHaveLength(cardData.length);
    thumbnails.forEach((thumb, idx) => {
      expect(thumb).toBeInTheDocument();
      expect(thumb).toHaveAttribute("src", cardData[idx].thumbUrl);
    });
  });

  it("카드를 클릭하면 메시지와 이미지가 변경된다", () => {
    renderWithForm();
    const thumbnails = screen.getAllByAltText("card thumbnail");
    const secondCard = thumbnails[1];
    fireEvent.click(secondCard);

    const selectedCardImage = screen.getByAltText("selected card");
    expect(selectedCardImage).toHaveAttribute("src", cardData[1].imageUrl);

    const textarea = screen.getByPlaceholderText("메시지를 입력해주세요");
    expect(textarea).toHaveValue(cardData[1].defaultTextMessage);
  });

  it("메시지를 직접 입력할 수 있다", () => {
    renderWithForm();
    const textarea = screen.getByPlaceholderText("메시지를 입력해주세요");
    fireEvent.change(textarea, { target: { value: "축하해!" } });
    expect(textarea).toHaveValue("축하해!");
  });

  it("메시지 유효성 검사가 동작한다", async () => {
    renderWithForm();
    const textarea = screen.getByPlaceholderText("메시지를 입력해주세요");

    fireEvent.change(textarea, { target: { value: "" } });
    fireEvent.blur(textarea);

    const errorMessage = await screen.findByText("메시지를 입력해주세요.");
    expect(errorMessage).toBeInTheDocument();
  });
});
