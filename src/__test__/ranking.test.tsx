import { server } from "@/__mock__/server";
import { HotGiftRanking } from "@/components/main";
import { theme } from "@/styles";
import { ThemeProvider } from "@emotion/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, waitFor } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { mockRankingProduct } from "@/__mock__/mock-ranking-product";

vi.mock("@/constants", async () => {
  const actual = await vi.importActual("@/constants");
  return {
    ...actual,
  };
});

vi.mock("@/hooks/common/useRouter", () => ({
  useRouter: () => ({
    navigate: vi.fn(path => window.history.pushState({}, "", path)),
    location: { state: null },
  }),
}));

vi.mock("@/utils", async () => {
  const actual = await vi.importActual("@/utils");
  return {
    ...actual,
    setUserInfo: vi.fn(),
    getUserInfo: vi.fn(),
    showToast: {
      error: vi.fn(),
    },
  };
});

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  queryClient.clear();
});
afterAll(() => server.close());

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true,
      retry: false,
    },
  },
});

const renderRankingSection = () => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <HotGiftRanking />
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>,
  );
};
const testCase = [
  ["FEMALE", "MANY_WISH", [0, 5]],
  ["MALE", "MANY_RECEIVE", [6, 11]],
  ["TEEN", "MANY_WISH", [10, 15]],
  ["ALL", "MANY_WISH", [15, 20]],
] as const;

describe("실시간 급상승 선물랭킹 컴포넌트 테스트", () => {
  test("태그와 탭이 화면에 보여진다.", async () => {
    renderRankingSection();
    expect(screen.getByText("전체")).toBeInTheDocument();
    expect(screen.getByText("여성이")).toBeInTheDocument();
    expect(screen.getByText("남성이")).toBeInTheDocument();
    expect(screen.getByText("청소년이")).toBeInTheDocument();

    expect(screen.getByText("받고 싶어한")).toBeInTheDocument();
    expect(screen.getByText("많이 선물한")).toBeInTheDocument();
    expect(screen.getByText("위시로 받은")).toBeInTheDocument();
  });

  test.each(testCase)(
    "%s + %s 조합에서 데이터를 올바르게 보여준다",
    async (targetType, rankType, [start, end]) => {
      const searchParams = new URLSearchParams();
      searchParams.set("targetType", targetType);
      searchParams.set("rankType", rankType);
      window.history.pushState({}, "", `?${searchParams.toString()}`);

      // when
      renderRankingSection();

      // then
      const expectedProducts = mockRankingProduct.slice(start, end);

      const firstProduct = await screen.findByText(expectedProducts[0].name);
      expect(firstProduct).toBeInTheDocument();

      for (const product of expectedProducts) {
        const productElement = await screen.findByText(product.name);
        expect(productElement).toBeInTheDocument();
      }
    },
  );

  test("TEEN + MANY_WISH_RECEIVE 조합에서 빈 데이터를 보여준다", async () => {
    // given
    const searchParams = new URLSearchParams();
    searchParams.set("targetType", "TEEN");
    searchParams.set("rankType", "MANY_WISH_RECEIVE");
    window.history.pushState({}, "", `?${searchParams.toString()}`);

    // when
    renderRankingSection();

    // then
    await waitFor(() => {
      expect(screen.getByText("상품이 없습니다.")).toBeInTheDocument();
    });
  });
});
