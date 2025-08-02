import { render } from "@testing-library/react"
import { MemoryRouter, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "@emotion/react"
import theme from "@/styles/theme"
import { AuthContextProvider } from "@/context/AuthContextProvider"
import CardProvider from "@/context/CardProvider"
const queryClient = new QueryClient()

interface AuthMock {
  name?: string
  email?: string
  authToken?: string | null
}

interface RenderOpts {
  route?: string
  path?: string
  authValue?: AuthMock
}

export function renderWithProviders(
  ui: React.ReactElement,
  { route = "/", path = route }: RenderOpts = {}
) {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={queryClient}>
        <AuthContextProvider
          initialValue={{
            name: "테스트",
            authToken: "MOCK",
            email: "kakao@kakao.com",
          }}
        >
          {" "}
          <CardProvider>
            <ThemeProvider theme={theme}>
              <Routes>
                <Route path={path} element={ui} />
              </Routes>
            </ThemeProvider>
          </CardProvider>
        </AuthContextProvider>
      </QueryClientProvider>
    </MemoryRouter>
  )
}
