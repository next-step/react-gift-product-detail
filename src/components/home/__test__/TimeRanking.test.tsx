import { render, screen } from "@testing-library/react";
import { http } from "msw";
import { setupServer } from "msw/node";
import TimeRanking from "@/components/home/TimeRanking";
import { handlers } from "../__test__/handlers";
import { MemoryRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

const renderWithClient = (ui: React.ReactNode) => {
  const queryClient = new QueryClient();
  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
};

describe("실시간 급상승 선물랭킹", () => {
  it("API에서 받아온 랭킹 데이터 렌더링", async () => {
    renderWithClient(<TimeRanking />);

    expect(await screen.findByText("노트북")).toBeInTheDocument();
    expect(await screen.findByText("카카오프렌즈")).toBeInTheDocument();
    expect(await screen.findByText(/5,000/)).toBeInTheDocument();
  });

  it("API 에러 시 에러 메세지 표시", async () => {
    server.use(
      http.get("/api/products/ranking", () => {
        return new Response(null, { status: 500 });
      }),
    );
    renderWithClient(<TimeRanking />);
    
    expect(
      await screen.findByText(/에러|문제|불러올 수 없습니다/),
    ).toBeInTheDocument();
  });
});
