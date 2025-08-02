import { vi } from "vitest"
import { beforeAll, afterEach, afterAll } from "vitest"
import { server } from "@/mocks/server"

vi.mock("lottie-react", () => ({
  __esModule: true,
  default: () => null,
}))

HTMLCanvasElement.prototype.getContext = vi.fn().mockImplementation((type) => {
  if (type === "2d") {
    return {
      fillStyle: "",
      fillRect: vi.fn(),
    } as unknown as CanvasRenderingContext2D
  }
  return null
})

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
