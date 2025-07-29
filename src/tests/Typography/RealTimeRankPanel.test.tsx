import { expect, describe, it } from "vitest";
import { BE } from "@src/apis/BackEnd/apiEndPoints";
import { productMockData } from "@src/mock/productMockData";
import { render, screen } from "@testing-library/react";
import RealTimeRankPanel from "@src/components/RealTimeRankPanel/RealTimeRankPanel";
import MockApp from "../MockApp";

describe("MSW 테스트", () => {
  it("MSW가 API를 잘 MOCKING 합니다.", async () => {
    //When
    const response = await fetch(BE.API.PRODUCT.RANKING);

    //Then
    await expect(response.json()).resolves.toEqual({
      data: [productMockData]
    });
  });
});

describe("RealTimeRankPanel 렌더링 테스트", () => {
  it("1개의 상품의 이름, 브랜드, 가격 정보가 렌더링됩니다.", async () => {
    //When
    render(<MockApp children={<RealTimeRankPanel />} />);
    const name = await screen.findByText(productMockData.name);
    const brand = await screen.findByText(productMockData.brandInfo.name);
    const price = await screen.findByText(productMockData.price.basicPrice);

    // Then
    expect(screen.findByText("1")).resolves.toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
