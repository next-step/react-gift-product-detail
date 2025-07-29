import { expect, describe, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import MockApp from "../MockApp";
import NavBar from "@src/components/NavBar";
import * as routerDom from "react-router-dom";
import { PATH } from "@src/router/Router";

const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof routerDom>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate
  };
});

describe("NavBar 렌더링 및 동작 테스트", () => {
  it("선물하기 글자가 보이는 NavBar이 렌더링 됩니다.", async () => {
    //When
    render(<MockApp children={<NavBar />} />);

    //Then
    const homeButton = await screen.findByText("선물하기");
    expect(homeButton).toBeInTheDocument();
  });

  it("뒤로가기 버튼이 올바르게 동작합니다.", async () => {
    //Given
    render(<MockApp children={<NavBar />} />);
    const backButton = screen.getByLabelText("뒤로가기");

    //When
    fireEvent.click(backButton);

    //Then
    expect(mockedNavigate).toHaveBeenCalledWith(-1);
  });

  it("홈 버튼이 올바르게 동작합니다.", async () => {
    //Given
    render(<MockApp children={<NavBar />} />);
    const homeButton = screen.getByLabelText("홈으로 이동");

    //When
    fireEvent.click(homeButton);

    //Then
    expect(mockedNavigate).toHaveBeenCalledWith("/");
  });

  it("마이페이지 버튼이 올바르게 동작합니다.", async () => {
    //Given
    render(<MockApp children={<NavBar />} />);
    const profileButton = screen.getByLabelText("마이페이지로 이동");

    //When
    fireEvent.click(profileButton);

    //Then
    expect(mockedNavigate).toHaveBeenCalledWith(PATH.MY);
  });
});
