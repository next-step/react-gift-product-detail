import {
  describe,
  it,
  expect,
  beforeAll,
  afterEach,
  afterAll,
  vi,
} from "vitest"
import { setupServer } from "msw/node"
import { http, HttpResponse } from "msw"
import { renderWithProviders } from "@/test-utils/renderWithProviders"
import Trending from "@/components/Trending"
import { screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

const baseProduct = {
  id: 1,
  name: "테스트상품",
  imageURL: "https://example.com/test.jpg",
  brandInfo: { id: 1, name: "테스트브랜드", imageURL: "" },
  price: { basicPrice: 1000, sellingPrice: 900, discountRate: 0 },
} as const

const makeList = (n: number) =>
  Array.from({ length: n }, (_, i) => ({
    ...baseProduct,
    id: i + 1,
    name: `테스트상품${i + 1}`,
  }))

const defaultHandler = http.get(/\/api\/products\/ranking.*/, () =>
  HttpResponse.json({ data: makeList(8) })
)
const server = setupServer(defaultHandler)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const navigateMock = vi.fn()
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<any>("react-router-dom")
  return {
    ...actual,
    useNavigate: () => navigateMock,
  }
})

const renderTrending = () => renderWithProviders(<Trending />)

describe("Trending 섹션은 아래 5단계의 시나리오를 확인한다.", () => {
  it("제목과 함께 화면의 정상적인 렌더링을 확인한다.", async () => {
    renderTrending()
    expect(
      await screen.findByText("실시간 급상승 선물랭킹")
    ).toBeInTheDocument()
  })

  it("처음엔 상품 6개만 보이고 버튼 텍스트가 '더보기'이다", async () => {
    renderTrending()
    expect(await screen.findAllByAltText(/테스트상품/)).toHaveLength(6)
    expect(screen.getByRole("button", { name: "더보기" })).toBeVisible()
  })

  it("'더보기' 클릭 시 8개가 보이고 버튼이 '접기'로 바뀐다", async () => {
    renderTrending()

    await userEvent.click(await screen.findByRole("button", { name: "더보기" }))
    expect(await screen.findAllByAltText(/테스트상품/)).toHaveLength(8)
    expect(screen.getByRole("button", { name: "접기" })).toBeVisible()
  })

  it("'남성이' 버튼 클릭 시 targetType=MALE 로 재요청되어 6개가 렌더링된다", async () => {
    server.use(
      http.get(/\/api\/products\/ranking.*/, ({ request }) => {
        const target = new URL(request.url).searchParams.get("targetType")
        const data = makeList(target === "MALE" ? 6 : 6)
        return HttpResponse.json({ data })
      })
    )

    renderTrending()

    await userEvent.click(await screen.findByRole("button", { name: "👨🏻" }))

    await waitFor(() =>
      expect(screen.getAllByAltText(/테스트상품/)).toHaveLength(6)
    )
  })

  it("상품 클릭 시 상세 페이지로 이동한다", async () => {
    renderTrending()
    await userEvent.click(await screen.findByAltText("테스트상품1"))
    expect(navigateMock).toHaveBeenCalledWith("/product/1")
  })
})
