import { render, screen } from "@testing-library/react";
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
      <MemoryRouter initialEntries={["/?gender=ALL&rankType=받고 싶어한"]}>
        {ui}
      </MemoryRouter>
    </QueryClientProvider>
  );
};

describe("실시간 급상승 선물랭킹", () => {
  it("API에서 받아온 랭킹 데이터 렌더링", async () => {
    renderWithClient(<TimeRanking />);

    expect(await screen.findByText("노트북")).toBeInTheDocument();
    expect(await screen.findByText("카카오프렌즈")).toBeInTheDocument();
    expect(await screen.findByText(/5,000/)).toBeInTheDocument();
  });
});
