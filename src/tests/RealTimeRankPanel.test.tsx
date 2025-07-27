import { beforeAll, afterEach, afterAll, expect, describe, it } from "vitest";
import { mockBE } from "@src/mock/msw/server";
import { BE } from "@src/apis/BackEnd/apiEndPoints";
import { productMockData } from "@src/mock/productMockData";
import { render, screen } from "@testing-library/react";
import RealTimeRankPanel from "@src/components/RealTimeRankPanel/RealTimeRankPanel";
import MockApp from "./MockApp";

beforeAll(() => mockBE.listen());
afterEach(() => mockBE.resetHandlers());
afterAll(() => mockBE.close());

const renderRealTimeRankPanel = () => {
  render(<MockApp children={<RealTimeRankPanel />} />);
};

describe("MSW 테스트", () => {
  it("MSW가 API를 잘 MOCKING 합니다.", async () => {
    const response = await fetch(BE.API.PRODUCT.RANKING);
    console.log(await response);
    await expect(response.json()).resolves.toEqual({
      data: [productMockData]
    });
  });
});

describe("RealTimeRankPanel 렌더링 테스트", () => {
  it("1개의 상품의 이름, 브랜드, 가격 정보가 렌더링됩니다.", async () => {
    renderRealTimeRankPanel();

    const name = await screen.findByText(productMockData.name);
    const brand = await screen.findByText(productMockData.brandInfo.name);
    const price = await screen.findByText(productMockData.price.basicPrice);

    expect(screen.findByText("1")).resolves.toBeInTheDocument();
    expect(name).toBeInTheDocument();
    expect(brand).toBeInTheDocument();
    expect(price).toBeInTheDocument();
  });
});
