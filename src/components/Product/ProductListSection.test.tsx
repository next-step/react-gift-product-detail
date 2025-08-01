import { render, screen, waitFor } from '@testing-library/react'
import { ProductListSection } from './ProductListSection'
import { ThemeProvider } from '@emotion/react'
import { theme } from '@/styles/theme'
import { MemoryRouter } from 'react-router-dom'
import { AuthProvider } from '@/contexts/AuthContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { server } from '@/mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

const queryClient = new QueryClient()

function renderWithProviders(
  ui: React.ReactElement,
  initialEntries = ['/login']
) {
  return render(
    <MemoryRouter initialEntries={initialEntries}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider theme={theme}>{ui}</ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </MemoryRouter>
  )
}

describe('상품 랭킹 섹션', () => {
  it('상품 리스트가 정상적으로 렌더링된다.', async () => {
    renderWithProviders(<ProductListSection />)

    expect(screen.getByText(/선물 랭킹 로딩중.../)).toBeInTheDocument()

    await waitFor(() => {
      expect(screen.getByText('상품 이름')).toBeInTheDocument()
      expect(screen.getByText('브랜드 이름')).toBeInTheDocument()
      expect(screen.getByText('9,000원')).toBeInTheDocument()
    })
  })
})
