import { vi } from "vitest"
import { beforeAll, afterEach, afterAll } from "vitest"
import { server } from "@/mocks/server"

vi.mock("lottie-react", () => ({
  __esModule: true,

  default: () => null,
}))

HTMLCanvasElement.prototype.getContext = vi
  .fn()
  .mockImplementation((type: string) => {
    if (type === "2d") {
      const ctx = { fillStyle: "", fillRect: vi.fn() }
      return ctx as unknown as CanvasRenderingContext2D
    }
    return null
  })

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
